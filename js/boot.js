/**
 * boot.js — séquence de démarrage.
 * Desktop : logo + lignes de log façon démarrage système, puis transition.
 * Mobile  : version raccourcie (moins de texte, plus rapide) pour ne pas faire
 *           attendre sur connexion mobile.
 * Respecte les animations réduites (OS ou réglage manuel).
 */
import { prefersReduced } from "./motion.js";
import { isMobile } from "./platform.js";

const LINES_DESKTOP = [
  "● Allumage de l'atelier…",
  "● Mise en route des outils (fenêtres · dock · établi)…",
  "● Bienvenue. Fais comme chez toi.",
];
const LINES_MOBILE = ["● Allumage de l'atelier…", "● Bienvenue."];

function removeOverlay(overlay) {
  overlay.classList.add("boot--done");
  overlay.addEventListener("transitionend", () => overlay.remove(), {
    once: true,
  });
  setTimeout(() => overlay.remove(), 600); // filet de sécurité
}

export function initBoot() {
  const overlay = document.getElementById("boot");
  if (!overlay) return;
  const log = overlay.querySelector("#boot-log");
  const lines = isMobile() ? LINES_MOBILE : LINES_DESKTOP;
  const stepDelay = isMobile() ? 280 : 480;

  if (prefersReduced()) {
    if (log) log.textContent = lines.join("\n");
    setTimeout(() => removeOverlay(overlay), 200);
    return;
  }

  let i = 0;
  const writeNext = () => {
    if (!log) return;
    log.textContent += (i === 0 ? "" : "\n") + lines[i];
    i += 1;
    if (i < lines.length) setTimeout(writeNext, stepDelay);
    else setTimeout(() => removeOverlay(overlay), isMobile() ? 400 : 650);
  };
  setTimeout(writeNext, isMobile() ? 200 : 350);
}
