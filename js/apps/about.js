/**
 * about.js — app « À propos », en récit scrollé (la zone la plus expérientielle).
 * Les chapitres se révèlent au scroll et la lueur chaude de l'atelier monte au fur
 * et à mesure qu'on descend vers le feu de camp. Contenu dans content/about.json.
 */
import { windowManager } from "../windowManager.js";
import { APPS } from "./registry.js";
import { t } from "../i18n.js";
import { prefersReduced } from "../motion.js";

const LINKEDIN = "https://linkedin.com/in/nidal-lyassami";

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

async function loadAbout() {
  const res = await fetch("content/about.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function render(container) {
  container.style.padding = "0";
  container.innerHTML = `<p class="app-loading" style="padding:16px">${t("common.loading")}</p>`;

  let data;
  try {
    data = await loadAbout();
  } catch (err) {
    console.error("[about] échec chargement about.json", err);
    container.style.padding = "";
    container.innerHTML = `<p>Impossible de charger « À propos » pour le moment.</p>`;
    return;
  }

  const chapters = (data.story || [])
    .map(
      (c) => `
      <section class="chapter">
        <span class="chapter__num">${escapeHtml(c.num)}</span>
        <h2 class="chapter__title">${escapeHtml(c.title)}</h2>
        <p class="chapter__text">${escapeHtml(c.text)}</p>
      </section>`
    )
    .join("");

  const cvHref = APPS.cv && APPS.cv.href ? APPS.cv.href : "#";

  container.innerHTML = `
    <div class="story">
      <div class="story__inner">
        <header class="story__hero chapter is-visible">
          <p class="story__hook">${escapeHtml(data.hook || "")}</p>
          <h1 class="story__name">${escapeHtml(data.name || "")}</h1>
          <p class="story__tagline">${escapeHtml(data.tagline || "")}</p>
          <p class="story__hint">${escapeHtml(data.hint || "")} <span class="story__chevron">⌄</span></p>
        </header>
        ${chapters}
        <footer class="chapter story__end">
          <p class="story__closing">${escapeHtml(data.closing || "")}</p>
          <div class="story__cta">
            <a class="btn btn--primary" href="${LINKEDIN}" target="_blank" rel="noopener">Me suivre</a>
            <button class="btn" type="button" data-action="contact">Me contacter</button>
            <a class="btn" href="${cvHref}" target="_blank" rel="noopener">Voir le CV</a>
          </div>
        </footer>
      </div>
      <div class="story__ambient" aria-hidden="true"></div>
    </div>`;

  const story = container.querySelector(".story");
  const chaptersEls = [...container.querySelectorAll(".chapter")];
  const hint = container.querySelector(".story__hint");

  container
    .querySelector('[data-action="contact"]')
    .addEventListener("click", () => windowManager.open("contact"));

  // Animations réduites : tout est visible, chaleur figée à un niveau agréable.
  if (prefersReduced()) {
    chaptersEls.forEach((el) => el.classList.add("is-visible"));
    story.style.setProperty("--warmth", "0.4");
    return;
  }

  // Révélation des chapitres à l'entrée dans le champ de vision.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { root: container, threshold: 0.25 }
  );
  chaptersEls.forEach((el) => io.observe(el));

  // La lueur monte avec la progression du scroll (l'atelier s'allume).
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = container.scrollHeight - container.clientHeight;
      const p = max > 0 ? container.scrollTop / max : 0;
      story.style.setProperty("--warmth", (0.12 + p * 0.6).toFixed(3));
      if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 4));
      ticking = false;
    });
  };
  container.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
