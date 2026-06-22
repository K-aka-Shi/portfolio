/**
 * about.js — app « À propos ». Contenu data-driven (content/about.<lang>.json).
 * CTA : voir le CV (ouvre le PDF) + me contacter (ouvre l'app Contact).
 */
import { windowManager } from "../windowManager.js";
import { APPS } from "./registry.js";
import { getLang, t } from "../i18n.js";

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

async function loadAbout(lang) {
  let res = await fetch(`content/about.${lang}.json`);
  if (!res.ok && lang !== "fr") res = await fetch("content/about.fr.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function render(container) {
  container.innerHTML = `<p class="app-loading">${t("common.loading")}</p>`;
  let data;
  try {
    data = await loadAbout(getLang());
  } catch (err) {
    console.error("[about] échec chargement about.json", err);
    container.innerHTML = `<p>Impossible de charger « À propos » pour le moment.</p>`;
    return;
  }

  const blocks = (data.blocks || [])
    .map(
      (b) => `
      <section class="about__block">
        <h2 class="about__block-title">${escapeHtml(b.title)}</h2>
        <p>${escapeHtml(b.text)}</p>
      </section>`
    )
    .join("");

  const cvHref = APPS.cv && APPS.cv.href ? APPS.cv.href : "#";

  container.innerHTML = `
    <article class="about">
      <h1 class="about__name">${escapeHtml(data.name || "")}</h1>
      <p class="about__role">${escapeHtml(data.role || "")}</p>
      ${data.intro ? `<p class="about__intro">${escapeHtml(data.intro)}</p>` : ""}
      ${blocks}
      <div class="about__cta">
        <a class="btn btn--primary" href="${cvHref}" target="_blank" rel="noopener">${t("about.cv")}</a>
        <button class="btn" type="button" data-action="contact">${t("about.contact")}</button>
      </div>
    </article>`;

  container
    .querySelector('[data-action="contact"]')
    .addEventListener("click", () => windowManager.open("contact"));
}
