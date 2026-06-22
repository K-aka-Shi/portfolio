/**
 * router.js — routing par hash, pour partager un lien direct vers une app/un projet.
 *   #/                       → bureau seul
 *   #/app/finder             → ouvre le Finder
 *   #/app/finder/kloud       → ouvre le Finder sur le projet Kloud
 *
 * Sens entrant : hashchange → ouverture de l'app correspondante.
 * Sens sortant : focus/fermeture d'une fenêtre → mise à jour du hash
 *   (écoute les events wm:focus / wm:close émis par le windowManager).
 * Le check "même appId" préserve un projectId présent dans l'URL et évite les boucles.
 */
import { windowManager } from "./windowManager.js";
import { APPS } from "./apps/registry.js";

function parseHash(hash = location.hash) {
  const m = hash.replace(/^#/, "").match(/^\/app\/([^/]+)(?:\/([^/]+))?/);
  if (!m) return null;
  return { appId: m[1], projectId: m[2] || null };
}

function currentAppId() {
  const r = parseHash();
  return r ? r.appId : null;
}

function handleRoute() {
  const route = parseHash();
  if (!route) return;
  const def = APPS[route.appId];
  if (!def) return;
  if (def.href) {
    window.open(def.href, "_blank", "noopener");
    return;
  }
  windowManager.open(
    route.appId,
    route.projectId ? { projectId: route.projectId } : {}
  );
}

function syncHash(appId) {
  if (currentAppId() === appId) return; // préserve un éventuel projectId, casse la boucle
  location.hash = `#/app/${appId}`;
}

function syncClose(appId) {
  if (currentAppId() === appId) location.hash = "#/";
}

export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  document.addEventListener("wm:focus", (e) => syncHash(e.detail.appId));
  document.addEventListener("wm:close", (e) => syncClose(e.detail.appId));
  handleRoute(); // traite le hash initial (deep link au chargement)
}
