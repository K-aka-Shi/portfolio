/**
 * easterEggs.js — clins d'œil discrets (cf. 00-CONCEPT.md).
 *  - une "étoile" planquée sur le wallpaper → citation Outer Wilds / Firewatch ;
 *  - le code Konami → petit message "explorateur".
 * Le terminal porte d'autres easter eggs (sudo make-coffee, cat outer_wilds.txt).
 */
import { t } from "./i18n.js";

let toastTimer = null;

function showToast(msg) {
  let toast = document.getElementById("egg-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "egg-toast";
    toast.className = "egg-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 5000);
}

function initEmber() {
  const desktop = document.getElementById("desktop");
  if (!desktop) return;
  const ember = document.createElement("button");
  ember.type = "button";
  ember.className = "egg-ember";
  ember.setAttribute("aria-label", t("egg.ember"));
  ember.addEventListener("click", () => showToast(t("egg.quote")));
  desktop.appendChild(ember);
  document.addEventListener("i18n:change", () =>
    ember.setAttribute("aria-label", t("egg.ember"))
  );
}

function initKonami() {
  const seq = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
  ];
  let i = 0;
  document.addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === seq[i]) {
      i += 1;
      if (i === seq.length) {
        i = 0;
        showToast(t("egg.konami"));
      }
    } else {
      i = k === seq[0] ? 1 : 0;
    }
  });
}

export function initEasterEggs() {
  initEmber();
  initKonami();
}
