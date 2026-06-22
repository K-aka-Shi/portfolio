/**
 * main.js — point d'entrée.
 * Ordre : plateforme (desktop/mobile) → i18n → boot → thème → barre → bureau →
 * dock → routing (traite un éventuel deep link au chargement).
 */
import { initPlatform } from "./platform.js";
import { initI18n } from "./i18n.js";
import { initBoot } from "./boot.js";
import { initTheme } from "./theme.js";
import { initTopbar } from "./topbar.js";
import { initDesktop } from "./desktop.js";
import { initDock } from "./dock.js";
import { initRouter } from "./router.js";
import { initEasterEggs } from "./easterEggs.js";

function init() {
  initPlatform();
  initI18n();
  initBoot();
  initTheme();
  initTopbar();
  initDesktop();
  initDock();
  initRouter();
  initEasterEggs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
