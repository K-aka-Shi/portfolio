/**
 * dock.js — dock du bas (devient barre de navigation fixe sur mobile, via CSS).
 * Clic = ouvre/refocus l'app. Écoute wm:change pour le point "app ouverte"
 * et i18n:change pour relocaliser les libellés.
 */
import { APPS } from "./apps/registry.js";
import { windowManager } from "./windowManager.js";
import { icon } from "./icons.js";
import { appTitle } from "./i18n.js";
import { isMobile } from "./platform.js";

function refreshIndicators(dock) {
  const open = windowManager.getOpenAppIds();
  dock.querySelectorAll(".dock-item").forEach((item) => {
    item.dataset.open = open.has(item.dataset.appId) ? "true" : "false";
  });
}

export function initDock() {
  const dock = document.getElementById("dock");
  if (!dock) return;

  const build = () => {
    dock.innerHTML = "";
    // Mobile : barre de nav du bas = apps principales. Desktop : dock complet.
    Object.entries(APPS)
      .filter(([, def]) => (isMobile() ? def.mobileNav : def.dock))
      .forEach(([appId, def]) => {
        const title = appTitle(appId);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dock-item";
        btn.dataset.appId = appId;
        btn.dataset.open = "false";
        btn.title = title;
        btn.setAttribute("aria-label", title);
        btn.innerHTML = icon(def.icon, 26);
        btn.addEventListener("click", () =>
          def.href
            ? window.open(def.href, "_blank", "noopener")
            : windowManager.open(appId)
        );
        dock.appendChild(btn);
      });
    refreshIndicators(dock);
  };

  build();
  document.addEventListener("wm:change", () => refreshIndicators(dock));
  document.addEventListener("i18n:change", build);
  document.addEventListener("platform:change", build);
}
