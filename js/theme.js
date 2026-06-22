/**
 * theme.js — gestion du thème clair/sombre.
 * - Persistance via localStorage (clé "nidalos-theme"), défaut: dark.
 * - L'attribut [data-theme] est posé très tôt par un script inline dans <head>
 *   (anti-FOUC). Ce module câble le bouton de bascule et expose getTheme/setTheme
 *   (utilisés aussi par l'app Paramètres).
 */
import { icon } from "./icons.js";

const STORAGE_KEY = "nidalos-theme";

export function getTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function refreshButton(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  // En sombre on propose de passer en clair (icône soleil), et inversement.
  btn.innerHTML = icon(theme === "dark" ? "sun" : "moon", 18);
  btn.setAttribute(
    "aria-label",
    theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"
  );
}

export function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (_) {
    /* localStorage indisponible */
  }
  refreshButton(next);
  document.dispatchEvent(
    new CustomEvent("theme:change", { detail: { theme: next } })
  );
}

export function initTheme() {
  refreshButton(getTheme());
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });
}
