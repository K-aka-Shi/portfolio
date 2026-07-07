/**
 * finder.js — app « Projets », rangée en 3 espaces (Pro / Perso / Scolaire).
 * Fiche projet au format problème → solution → impact ; la stack est reléguée
 * dans un volet « sous le capot ». Données dans content/projects.json.
 */
import { icon } from "../icons.js";
import { t } from "../i18n.js";

let cache = null;

/** Données brutes : { spaces: [{ id, label, projects: [...] }] }. */
export async function loadProjectData() {
  if (cache) return cache;
  const res = await fetch("content/projects.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  cache = await res.json();
  return cache;
}

/** Liste à plat de tous les projets (utile au terminal). */
export async function loadProjects() {
  const data = await loadProjectData();
  return (data.spaces || []).flatMap((s) =>
    s.projects.map((p) => ({ ...p, space: s.id, spaceLabel: s.label }))
  );
}

const STATUS = {
  operationnel: { label: "Opérationnel", cls: "is-op" },
  dev: { label: "En développement", cls: "is-dev" },
  maintenance: { label: "Maintenance", cls: "is-maint" },
  pause: { label: "En pause", cls: "is-pause" },
  ideation: { label: "Idéation", cls: "is-idea" },
  archive: { label: "Archivé", cls: "is-archive" },
};

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function statusBadge(status) {
  const s = STATUS[status];
  if (!s) return "";
  return `<span class="status ${s.cls}">${s.label}</span>`;
}

function listItem(p) {
  return `
    <button class="finder__item" type="button" data-project="${p.id}">
      <span class="finder__item-icon">${icon("folder", 28)}</span>
      <span class="finder__item-text">
        <span class="finder__item-head">
          <span class="finder__item-title">${escapeHtml(p.title)}</span>
          ${statusBadge(p.status)}
        </span>
        <span class="finder__item-pitch">${escapeHtml(p.pitch || "")}</span>
      </span>
    </button>`;
}

function findProject(data, id) {
  for (const space of data.spaces || []) {
    const p = space.projects.find((x) => x.id === id);
    if (p) return p;
  }
  return null;
}

function renderList(container, data) {
  const spaces = (data.spaces || [])
    .map(
      (space) => `
      <section class="finder__space">
        <h2 class="finder__group">${escapeHtml(space.label)}</h2>
        <div class="finder__list">${space.projects.map(listItem).join("")}</div>
      </section>`
    )
    .join("");

  container.innerHTML = `
    <div class="finder">
      <p class="finder__hint">${t("finder.hint")}</p>
      ${spaces}
    </div>`;

  container.querySelectorAll(".finder__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = findProject(data, btn.dataset.project);
      if (p) renderDetail(container, data, p);
    });
  });
}

function block(title, body) {
  if (!body) return "";
  return `
    <section class="project__section">
      <h3 class="project__section-title">${title}</h3>
      <p>${escapeHtml(body)}</p>
    </section>`;
}

function renderDetail(container, data, p) {
  const stack = Array.isArray(p.stack) && p.stack.length
    ? `<div class="project__stack">${p.stack
        .map((s) => `<span>${escapeHtml(s)}</span>`)
        .join("")}</div>`
    : "";
  const links = Array.isArray(p.links) && p.links.length
    ? `<div class="project__links">${p.links
        .map(
          (l) =>
            `<a href="${l.url}" target="_blank" rel="noopener">${escapeHtml(
              l.label
            )}</a>`
        )
        .join("")}</div>`
    : "";
  const underHood = stack || links
    ? `<details class="project__hood">
         <summary>${t("project.underhood")}</summary>
         ${stack}
         ${links}
       </details>`
    : "";

  container.innerHTML = `
    <div class="project">
      <button class="project__back" type="button">${icon("arrowLeft", 16)} ${t("finder.back")}</button>
      <div class="project__head">
        <h1 class="project__title">${escapeHtml(p.title)}</h1>
        ${statusBadge(p.status)}
      </div>
      <p class="project__pitch">${escapeHtml(p.pitch || "")}</p>
      ${block(t("project.problem"), p.problem)}
      ${block(t("project.solution"), p.solution)}
      ${block(t("project.impact"), p.impact)}
      ${underHood}
    </div>`;

  container
    .querySelector(".project__back")
    .addEventListener("click", () => renderList(container, data));
}

/**
 * @param {HTMLElement} container
 * @param {object} params - { projectId } pour ouvrir directement une fiche (deep link)
 */
export async function render(container, params = {}) {
  container.innerHTML = `<p class="app-loading">${t("common.loading")}</p>`;
  try {
    const data = await loadProjectData();
    const target = params.projectId ? findProject(data, params.projectId) : null;
    if (target) renderDetail(container, data, target);
    else renderList(container, data);
  } catch (err) {
    console.error("[finder] échec chargement projects.json", err);
    container.innerHTML = `<p>Impossible de charger les projets pour le moment.</p>`;
  }
}
