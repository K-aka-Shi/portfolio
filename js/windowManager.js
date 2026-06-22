/**
 * windowManager.js — cœur du système : création et gestion des fenêtres.
 * API : open / close / minimize / maximize / focus.
 *
 * Desktop : fenêtres flottantes draggable (barre de titre) / resizable (coin bas-droit),
 *           z-index géré au focus (bring-to-front).
 * Mobile  : une seule app à la fois, plein écran, pas de drag/resize, bouton retour
 *           à la place des pastilles (cf. 04-MOBILE.md). Le contexte est détecté
 *           dynamiquement (platform.js) et réévalué au resize/orientation.
 *
 * Émet wm:change (dock), wm:focus / wm:close (routing).
 * Re-render des fenêtres ouvertes sur i18n:change (bascule de langue).
 */
import { APPS } from "./apps/registry.js";
import { appTitle } from "./i18n.js";
import { icon } from "./icons.js";
import { isMobile } from "./platform.js";
import { prefersReduced } from "./motion.js";

const MIN_W = 280;
const MIN_H = 160;
const TITLEBAR_H = 36;

/** @type {Map<string, {el:HTMLElement, appId:string, def:object, params:object, minimized:boolean, maximized:boolean, prevRect:?object}>} */
const windows = new Map();
let zCounter = 10;
let idCounter = 0;
let layerEl = null;

function layer() {
  if (!layerEl) layerEl = document.getElementById("windows-layer");
  return layerEl;
}

function bounds() {
  const l = layer();
  return { w: l.clientWidth, h: l.clientHeight };
}

function emitChange() {
  document.dispatchEvent(new CustomEvent("wm:change"));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function findByApp(appId) {
  for (const [id, w] of windows) {
    if (w.appId === appId) return id;
  }
  return null;
}

/* ---------------------------------------------------------------- */
/* DOM d'une fenêtre                                                */
/* ---------------------------------------------------------------- */
function buildWindowEl(id, def, title) {
  const el = document.createElement("section");
  el.className = "window";
  el.dataset.windowId = id;
  el.dataset.appId = def.appId;
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-label", title);
  el.tabIndex = -1;

  el.innerHTML = `
    <header class="window__titlebar">
      <button class="window__back" type="button" aria-label="Retour">${icon("arrowLeft", 18)}</button>
      <div class="window__controls">
        <button class="window__btn window__btn--close" type="button" aria-label="Fermer" title="Fermer"></button>
        <button class="window__btn window__btn--min" type="button" aria-label="Réduire" title="Réduire"></button>
        <button class="window__btn window__btn--max" type="button" aria-label="Agrandir" title="Agrandir"></button>
      </div>
      <span class="window__title">${title}</span>
    </header>
    <div class="window__body"></div>
    <div class="window__resize" aria-hidden="true"></div>
  `;
  return el;
}

/* ---------------------------------------------------------------- */
/* Drag / Resize (désactivés sur mobile)                            */
/* ---------------------------------------------------------------- */
function enableDrag(id, el) {
  const titlebar = el.querySelector(".window__titlebar");
  titlebar.addEventListener("mousedown", (e) => {
    if (e.target.closest(".window__btn, .window__back")) return;
    if (isMobile()) return;
    const w = windows.get(id);
    if (w.maximized) return;
    focus(id);

    const rect = el.getBoundingClientRect();
    const layerRect = layer().getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const { w: bw, h: bh } = bounds();

    const onMove = (ev) => {
      let left = clamp(ev.clientX - layerRect.left - offsetX, 0, bw - 40);
      let top = clamp(ev.clientY - layerRect.top - offsetY, 0, bh - TITLEBAR_H);
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    e.preventDefault();
  });
}

function enableResize(id, el) {
  const handle = el.querySelector(".window__resize");
  handle.addEventListener("mousedown", (e) => {
    if (isMobile()) return;
    const w = windows.get(id);
    if (w.maximized) return;
    focus(id);

    const rect = el.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = rect.width;
    const startH = rect.height;
    const { w: bw, h: bh } = bounds();
    const left = parseFloat(el.style.left) || 0;
    const top = parseFloat(el.style.top) || 0;

    const onMove = (ev) => {
      el.style.width = `${clamp(startW + (ev.clientX - startX), MIN_W, bw - left)}px`;
      el.style.height = `${clamp(startH + (ev.clientY - startY), MIN_H, bh - top)}px`;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    e.preventDefault();
  });
}

/* ---------------------------------------------------------------- */
/* Rendu du contenu d'une app dans une fenêtre                      */
/* ---------------------------------------------------------------- */
async function renderApp(w, params) {
  const body = w.el.querySelector(".window__body");
  try {
    const mod = await import(w.def.module);
    mod.render(body, { appId: w.appId, def: w.def, ...params });
  } catch (err) {
    body.innerHTML = `<p>Impossible de charger l'app « ${appTitle(w.appId)} ».</p>`;
    console.error(`[windowManager] échec import ${w.def.module}`, err);
  }
}

/* ---------------------------------------------------------------- */
/* API publique                                                     */
/* ---------------------------------------------------------------- */
async function open(appId, params = {}) {
  const base = APPS[appId];
  if (!base) {
    console.warn(`[windowManager] app inconnue : ${appId}`);
    return null;
  }

  // Mobile : une seule app à la fois — chaque ouverture remplace la précédente.
  if (isMobile()) {
    for (const otherId of [...windows.keys()]) {
      if (windows.get(otherId).appId !== appId) closeNow(otherId);
    }
  }

  // Instance unique : si déjà ouverte, re-render avec params puis focus.
  const existing = findByApp(appId);
  if (existing) {
    const w = windows.get(existing);
    if (Object.keys(params).length) {
      w.params = params;
      await renderApp(w, params);
    }
    focus(existing);
    return existing;
  }

  const def = { ...base, appId };
  const id = `win-${++idCounter}`;
  const el = buildWindowEl(id, def, appTitle(appId));

  const { w: bw, h: bh } = bounds();
  const width = Math.min(def.width || 480, bw - 40);
  const height = Math.min(def.height || 360, bh - 40);
  const step = (windows.size % 6) * 28;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.left = `${clamp(80 + step, 0, Math.max(0, bw - width))}px`;
  el.style.top = `${clamp(48 + step, 0, Math.max(0, bh - height))}px`;

  layer().appendChild(el);
  const w = {
    el,
    appId,
    def,
    params,
    minimized: false,
    maximized: false,
    prevRect: null,
  };
  windows.set(id, w);

  el.querySelector(".window__btn--close").addEventListener("click", () => close(id));
  el.querySelector(".window__back").addEventListener("click", () => close(id));
  el.querySelector(".window__btn--min").addEventListener("click", () => minimize(id));
  el.querySelector(".window__btn--max").addEventListener("click", () => maximize(id));

  el.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close(id);
  });
  el.addEventListener("mousedown", () => focus(id));

  enableDrag(id, el);
  enableResize(id, el);

  await renderApp(w, params);
  focus(id);
  return id;
}

function focus(id) {
  const w = windows.get(id);
  if (!w) return;
  if (w.minimized) {
    w.minimized = false;
    w.el.classList.remove("is-minimized");
  }
  zCounter += 1;
  w.el.style.zIndex = String(zCounter);
  for (const [otherId, other] of windows) {
    other.el.classList.toggle("is-active", otherId === id);
  }
  w.el.focus({ preventScroll: true });
  document.dispatchEvent(
    new CustomEvent("wm:focus", { detail: { appId: w.appId } })
  );
  emitChange();
}

/** Suppression immédiate sans animation (usage interne). */
function closeNow(id) {
  const w = windows.get(id);
  if (!w) return;
  windows.delete(id);
  w.el.remove();
}

function close(id) {
  const w = windows.get(id);
  if (!w) return;
  windows.delete(id);
  const finalize = () => w.el.remove();
  if (prefersReduced()) {
    finalize();
  } else {
    w.el.classList.add("is-closing");
    w.el.addEventListener("animationend", finalize, { once: true });
    setTimeout(finalize, 250);
  }
  document.dispatchEvent(
    new CustomEvent("wm:close", { detail: { appId: w.appId } })
  );
  emitChange();
}

function minimize(id) {
  const w = windows.get(id);
  if (!w) return;
  w.minimized = true;
  w.el.classList.add("is-minimized");
  w.el.classList.remove("is-active");
  emitChange();
}

function maximize(id) {
  const w = windows.get(id);
  if (!w) return;
  if (w.maximized) {
    w.maximized = false;
    w.el.classList.remove("is-maximized");
    if (w.prevRect) Object.assign(w.el.style, w.prevRect);
  } else {
    w.prevRect = {
      left: w.el.style.left,
      top: w.el.style.top,
      width: w.el.style.width,
      height: w.el.style.height,
    };
    w.maximized = true;
    w.el.classList.add("is-maximized");
  }
  focus(id);
}

function getOpenAppIds() {
  return new Set([...windows.values()].map((w) => w.appId));
}

/* Re-render + re-titrage à la bascule de langue. */
function relocalize() {
  for (const w of windows.values()) {
    const title = appTitle(w.appId);
    w.el.querySelector(".window__title").textContent = title;
    w.el.setAttribute("aria-label", title);
    renderApp(w, w.params);
  }
}

/* Bascule desktop ↔ mobile : sur mobile, ne garder que la fenêtre active. */
function onPlatformChange(e) {
  if (!e.detail.mobile || windows.size <= 1) return;
  let topId = null;
  let topZ = -Infinity;
  for (const [id, w] of windows) {
    const z = Number(w.el.style.zIndex) || 0;
    if (z >= topZ) {
      topZ = z;
      topId = id;
    }
  }
  for (const id of [...windows.keys()]) {
    if (id !== topId) closeNow(id);
  }
  emitChange();
}

document.addEventListener("i18n:change", relocalize);
document.addEventListener("platform:change", onPlatformChange);

export const windowManager = {
  open,
  close,
  minimize,
  maximize,
  focus,
  getOpenAppIds,
};
