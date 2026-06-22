/**
 * platform.js — détection du contexte desktop vs mobile.
 * Combinaison largeur d'écran + pointer grossier (tactile), réévaluée au
 * resize / changement d'orientation. Publie l'état sur body[data-mobile]
 * et émet "platform:change" pour que le reste du système s'adapte.
 */
const widthMq = window.matchMedia("(max-width: 768px)");
const coarseMq = window.matchMedia("(pointer: coarse)");

let mobile = compute();

function compute() {
  // Mobile si écran étroit, ou tactile sur un écran pas trop large (tablette).
  return widthMq.matches || (coarseMq.matches && window.innerWidth <= 1024);
}

function reevaluate() {
  const next = compute();
  document.body.dataset.mobile = String(next);
  if (next !== mobile) {
    mobile = next;
    document.dispatchEvent(
      new CustomEvent("platform:change", { detail: { mobile } })
    );
  }
}

export function isMobile() {
  return mobile;
}

export function initPlatform() {
  document.body.dataset.mobile = String(mobile);
  widthMq.addEventListener("change", reevaluate);
  coarseMq.addEventListener("change", reevaluate);
  window.addEventListener("resize", reevaluate);
  window.addEventListener("orientationchange", reevaluate);
}
