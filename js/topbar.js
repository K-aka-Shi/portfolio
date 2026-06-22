/**
 * topbar.js — barre système (haut) : horloge temps réel (Strasbourg)
 * + menu « Nidal OS » (liens rapides LinkedIn / GitHub / Email)
 * + indicateur système (ouvre le moniteur).
 * Les toggles thème / langue sont gérés par theme.js / i18n.js.
 */
import { windowManager } from "./windowManager.js";
import { icon } from "./icons.js";
function updateClock(el) {
  // Heure de Strasbourg = Europe/Paris
  const now = new Date().toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  });
  el.textContent = now;
}

function initClock() {
  const clock = document.getElementById("topbar-clock");
  if (!clock) return;
  updateClock(clock);
  setInterval(() => updateClock(clock), 1000 * 15);
}

function initBrandMenu() {
  const btn = document.getElementById("brand-menu-btn");
  const menu = document.getElementById("brand-menu");
  if (!btn || !menu) return;

  const setOpen = (open) => {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      const first = menu.querySelector("a");
      if (first) first.focus(); // accès clavier : on entre dans le menu
    }
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });

  // Clic en dehors / Échap = fermeture
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) {
      setOpen(false);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      setOpen(false);
      btn.focus();
    }
  });
}

function initSystemIndicator() {
  const btn = document.getElementById("system-indicator");
  if (!btn) return;
  btn.innerHTML = icon("activity", 18);
  btn.addEventListener("click", () => windowManager.open("monitor"));
}

export function initTopbar() {
  initClock();
  initBrandMenu();
  initSystemIndicator();
}
