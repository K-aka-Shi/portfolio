/**
 * i18n.js — bascule FR/EN.
 * - Langue persistée en localStorage (clé "nidalos-lang"), défaut: fr.
 * - t(key) pour les chaînes d'interface ; appTitle(appId) pour les titres d'apps.
 * - Le contenu long (about, projects, terminal) est chargé par les apps depuis
 *   des fichiers JSON localisés (content/*.<lang>.json).
 * - setLang() émet "i18n:change" : le windowManager re-render les fenêtres,
 *   le bureau et le dock se reconstruisent.
 */
import { APPS } from "./apps/registry.js";

const STORAGE_KEY = "nidalos-lang";

const STRINGS = {
  fr: {
    "app.finder": "Projets",
    "app.about": "À propos",
    "app.cv": "CV.pdf",
    "app.contact": "Contact",
    "app.terminal": "Terminal",
    "app.monitor": "Système",
    "app.settings": "Paramètres",

    "common.loading": "Chargement…",

    "finder.hint": "Sélectionnez un projet pour voir le détail.",
    "finder.group.autres": "Autres",
    "finder.back": "Projets",

    "project.problem": "Problème",
    "project.architecture": "Architecture",
    "project.stack": "Stack",
    "project.result": "Résultat",

    "about.cv": "Voir le CV",
    "about.contact": "Me contacter",

    "contact.intro": "Le plus simple pour me joindre :",

    "monitor.serverLabel": "Serveur (homelab / VPS)",
    "monitor.serverFallback": "API privée — non exposée publiquement.",
    "monitor.githubLabel": "Dernier dépôt actif (GitHub)",
    "monitor.pushedOn": "poussé le",
    "monitor.updated": "Mis à jour",
    "monitor.live": "live",
    "monitor.ghError": "GitHub indisponible (limite d'API ou hors-ligne).",
    "monitor.note": "Seules des données réelles sont affichées ; rien n'est simulé.",

    "settings.theme": "Thème sombre",
    "settings.lang": "Anglais (EN)",
    "settings.motion": "Réduire les animations",
    "settings.about.title": "À propos de ce site",
    "settings.about.text": "Portfolio façon bureau d'OS, en HTML/CSS/JavaScript vanilla — sans framework. Window manager, dock, terminal et routing faits maison.",
    "settings.repo": "Voir le code (GitHub)",

    "terminal.shortcuts": "Raccourcis :",

    "egg.ember": "Quelque chose scintille…",
    "egg.quote": "« On n'explore pas pour fuir, mais pour comprendre. » — quelque part entre Outer Wilds et Firewatch.",
    "egg.konami": "Mode explorateur activé. La curiosité, toujours.",
  },
  en: {
    "app.finder": "Projects",
    "app.about": "About",
    "app.cv": "CV.pdf",
    "app.contact": "Contact",
    "app.terminal": "Terminal",
    "app.monitor": "System",
    "app.settings": "Settings",

    "common.loading": "Loading…",

    "finder.hint": "Select a project to see the details.",
    "finder.group.autres": "Other",
    "finder.back": "Projects",

    "project.problem": "Problem",
    "project.architecture": "Architecture",
    "project.stack": "Stack",
    "project.result": "Result",

    "about.cv": "View the CV",
    "about.contact": "Get in touch",

    "contact.intro": "The easiest way to reach me:",

    "monitor.serverLabel": "Server (homelab / VPS)",
    "monitor.serverFallback": "Private API — not publicly exposed.",
    "monitor.githubLabel": "Most recently active repo (GitHub)",
    "monitor.pushedOn": "pushed on",
    "monitor.updated": "Updated",
    "monitor.live": "live",
    "monitor.ghError": "GitHub unavailable (API limit or offline).",
    "monitor.note": "Only real data is shown here; nothing is simulated.",

    "settings.theme": "Dark theme",
    "settings.lang": "English (EN)",
    "settings.motion": "Reduce animations",
    "settings.about.title": "About this site",
    "settings.about.text": "An OS-desktop style portfolio, in vanilla HTML/CSS/JavaScript — no framework. Hand-made window manager, dock, terminal and routing.",
    "settings.repo": "View the code (GitHub)",

    "terminal.shortcuts": "Shortcuts:",

    "egg.ember": "Something flickers…",
    "egg.quote": "“We don't explore to escape, but to understand.” — somewhere between Outer Wilds and Firewatch.",
    "egg.konami": "Explorer mode unlocked. Stay curious.",
  },
};

let lang = readLang();

function readLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch (_) {
    return "fr";
  }
}

export function getLang() {
  return lang;
}

export function t(key) {
  return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.fr[key] || key;
}

export function appTitle(appId) {
  const key = `app.${appId}`;
  if (STRINGS[lang] && STRINGS[lang][key]) return STRINGS[lang][key];
  return (APPS[appId] && APPS[appId].title) || appId;
}

function updateToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  btn.textContent = lang.toUpperCase();
  btn.setAttribute(
    "aria-label",
    lang === "fr" ? "Switch to English" : "Passer en français"
  );
}

export function setLang(next) {
  lang = next === "en" ? "en" : "fr";
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (_) {
    /* ignore */
  }
  document.documentElement.lang = lang;
  updateToggle();
  document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
}

export function initI18n() {
  document.documentElement.lang = lang;
  updateToggle();
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.addEventListener("click", () => setLang(lang === "fr" ? "en" : "fr"));
  }
}
