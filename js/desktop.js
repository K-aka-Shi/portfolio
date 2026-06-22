/**
 * desktop.js — icônes du bureau. Ouvre une app au clic / double-clic / Enter.
 * (Simple clic accepté pour l'accessibilité, cf. design system.)
 * Se reconstruit à la bascule de langue (i18n:change).
 */
import { APPS } from "./apps/registry.js";
import { windowManager } from "./windowManager.js";
import { icon } from "./icons.js";
import { appTitle } from "./i18n.js";
import { isMobile } from "./platform.js";

function launch(appId, def) {
  return def.href
    ? window.open(def.href, "_blank", "noopener")
    : windowManager.open(appId);
}

export function initDesktop() {
  const grid = document.getElementById("desktop-icons");
  if (!grid) return;

  const build = () => {
    grid.innerHTML = "";
    // Sur mobile, tout est accessible depuis le bureau ; sur desktop, sélection.
    Object.entries(APPS)
      .filter(([, def]) => (isMobile() ? true : def.desktop))
      .forEach(([appId, def]) => {
        const title = appTitle(appId);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "desk-icon";
        btn.dataset.appId = appId;
        btn.setAttribute("aria-label", title);
        btn.innerHTML = `
          <span class="desk-icon__glyph">${icon(def.icon, 40)}</span>
          <span class="desk-icon__label">${title}</span>
        `;
        btn.addEventListener("dblclick", () => launch(appId, def));
        btn.addEventListener("click", () => launch(appId, def));
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            launch(appId, def);
          }
        });
        grid.appendChild(btn);
      });
  };

  build();
  document.addEventListener("i18n:change", build);
  document.addEventListener("platform:change", build);
}
