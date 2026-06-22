/**
 * finder.js — app « Projets ». Liste façon fichiers/dossiers ; un clic ouvre
 * la fiche détail (Problème → Architecture → Stack → Résultat).
 * Données localisées dans content/projects.<lang>.json (éditable sans toucher au JS).
 */
import { icon } from "../icons.js";
import { getLang, t } from "../i18n.js";

const cache = {};

export async function loadProjects(lang = getLang()) {
  if (cache[lang]) return cache[lang];
  let res = await fetch(`content/projects.${lang}.json`);
  if (!res.ok && lang !== "fr") res = await fetch("content/projects.fr.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  cache[lang] = (await res.json()).projects || [];
  return cache[lang];
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function listItem(p) {
  return `
    <button class="finder__item" type="button" data-project="${p.id}">
      <span class="finder__item-icon">${icon("folder", 28)}</span>
      <span class="finder__item-text">
        <span class="finder__item-title">${escapeHtml(p.title)}</span>
        <span class="finder__item-pitch">${escapeHtml(p.pitch || "")}</span>
      </span>
    </button>`;
}

function renderList(container, projects) {
  const tech = projects.filter((p) => p.category !== "autres");
  const autres = projects.filter((p) => p.category === "autres");
  container.innerHTML = `
    <div class="finder">
      <p class="finder__hint">${t("finder.hint")}</p>
      <div class="finder__list">${tech.map(listItem).join("")}</div>
      ${
        autres.length
          ? `<h2 class="finder__group">${t("finder.group.autres")}</h2>
             <div class="finder__list">${autres.map(listItem).join("")}</div>`
          : ""
      }
    </div>`;

  container.querySelectorAll(".finder__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = projects.find((x) => x.id === btn.dataset.project);
      if (p) renderDetail(container, projects, p);
    });
  });
}

function section(title, body) {
  if (!body) return "";
  return `
    <section class="project__section">
      <h3 class="project__section-title">${title}</h3>
      <p>${escapeHtml(body)}</p>
    </section>`;
}

function renderDetail(container, projects, p) {
  const stack = Array.isArray(p.stack)
    ? `<section class="project__section">
         <h3 class="project__section-title">${t("project.stack")}</h3>
         <ul class="project__stack">${p.stack
           .map((s) => `<li>${escapeHtml(s)}</li>`)
           .join("")}</ul>
       </section>`
    : "";
  container.innerHTML = `
    <div class="project">
      <button class="project__back" type="button">${icon("arrowLeft", 16)} ${t("finder.back")}</button>
      <h1 class="project__title">${escapeHtml(p.title)}</h1>
      <p class="project__pitch">${escapeHtml(p.pitch || "")}</p>
      ${section(t("project.problem"), p.problem)}
      ${section(t("project.architecture"), p.architecture)}
      ${stack}
      ${section(t("project.result"), p.result)}
    </div>`;
  container
    .querySelector(".project__back")
    .addEventListener("click", () => renderList(container, projects));
}

/**
 * @param {HTMLElement} container
 * @param {object} params - { projectId } pour ouvrir directement une fiche (deep link)
 */
export async function render(container, params = {}) {
  container.innerHTML = `<p class="app-loading">${t("common.loading")}</p>`;
  try {
    const projects = await loadProjects(getLang());
    const target = params.projectId
      ? projects.find((p) => p.id === params.projectId)
      : null;
    if (target) renderDetail(container, projects, target);
    else renderList(container, projects);
  } catch (err) {
    console.error("[finder] échec chargement projects.json", err);
    container.innerHTML = `<p>Impossible de charger les projets pour le moment.</p>`;
  }
}
