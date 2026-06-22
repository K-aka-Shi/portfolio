/**
 * settings.js — app « Paramètres ». Regroupe les bascules déjà existantes
 * (thème, langue, animations réduites) + une note technique sur le site.
 */
import { t } from "../i18n.js";
import { getTheme, setTheme } from "../theme.js";
import { getLang, setLang } from "../i18n.js";
import { manualReduce, setReducedMotion } from "../motion.js";

const REPO_URL = "https://github.com/k-aka-shi";

function toggleRow(id, label, checked) {
  return `
    <label class="settings__row">
      <span class="settings__label">${label}</span>
      <span class="switch">
        <input type="checkbox" id="${id}" ${checked ? "checked" : ""} />
        <span class="switch__track"></span>
      </span>
    </label>`;
}

export function render(container) {
  container.innerHTML = `
    <div class="settings">
      ${toggleRow("set-theme", t("settings.theme"), getTheme() === "dark")}
      ${toggleRow("set-lang", t("settings.lang"), getLang() === "en")}
      ${toggleRow("set-motion", t("settings.motion"), manualReduce())}

      <section class="settings__about">
        <h3 class="settings__about-title">${t("settings.about.title")}</h3>
        <p>${t("settings.about.text")}</p>
        <a class="btn" href="${REPO_URL}" target="_blank" rel="noopener">${t("settings.repo")}</a>
      </section>
    </div>`;

  container.querySelector("#set-theme").addEventListener("change", (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  });
  container.querySelector("#set-lang").addEventListener("change", (e) => {
    setLang(e.target.checked ? "en" : "fr");
  });
  container.querySelector("#set-motion").addEventListener("change", (e) => {
    setReducedMotion(e.target.checked);
  });
}
