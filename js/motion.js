/**
 * motion.js — état "animations réduites".
 * Vrai si l'OS le demande (prefers-reduced-motion) OU si l'utilisateur l'a
 * activé manuellement dans les Paramètres (html[data-reduce-motion]).
 * La valeur manuelle est posée tôt par le script inline de index.html (anti-FOUC)
 * et persistée en localStorage.
 */
const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
const STORAGE_KEY = "nidalos-reduce-motion";

export function prefersReduced() {
  return mq.matches || document.documentElement.dataset.reduceMotion === "true";
}

/** Préférence manuelle uniquement (indépendante de l'OS). */
export function manualReduce() {
  return document.documentElement.dataset.reduceMotion === "true";
}

export function setReducedMotion(on) {
  document.documentElement.dataset.reduceMotion = String(!!on);
  try {
    localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
  } catch (_) {
    /* ignore */
  }
  document.dispatchEvent(
    new CustomEvent("motion:change", { detail: { reduced: !!on } })
  );
}
