/**
 * i18n.js — chaînes d'interface (FR uniquement).
 * Le site est en français seul (décision 07-DIRECTION). Ce module reste le point
 * unique des libellés d'UI : t(key) pour les chaînes, appTitle(appId) pour les
 * titres d'apps. getLang() est conservé (renvoie toujours "fr") pour le
 * formatage de dates.
 */
import { APPS } from "./apps/registry.js";

const STRINGS = {
  "app.finder": "Projets",
  "app.about": "À propos",
  "app.cv": "CV.pdf",
  "app.contact": "Contact",
  "app.terminal": "Terminal",
  "app.monitor": "Système",
  "app.settings": "Paramètres",

  "common.loading": "Chargement…",

  "finder.hint": "Choisis un projet pour voir le détail.",
  "finder.back": "Projets",

  "project.problem": "Problème",
  "project.solution": "Solution",
  "project.impact": "Impact",
  "project.underhood": "Sous le capot",

  "about.cv": "Voir le CV",
  "about.contact": "Me contacter",

  "contact.intro": "Le plus simple pour me joindre :",

  "monitor.serverLabel": "Serveur (homelab / VPS)",
  "monitor.serverFallback": "API privée, non exposée publiquement.",
  "monitor.githubLabel": "Dernier dépôt actif (GitHub)",
  "monitor.pushedOn": "poussé le",
  "monitor.updated": "Mis à jour",
  "monitor.live": "live",
  "monitor.ghError": "GitHub indisponible (limite d'API ou hors-ligne).",
  "monitor.note": "Seules des données réelles sont affichées ; rien n'est simulé.",

  "settings.theme": "Thème sombre",
  "settings.motion": "Réduire les animations",
  "settings.about.title": "À propos de ce site",
  "settings.about.text": "Portfolio façon atelier, en HTML/CSS/JavaScript vanilla, sans framework. Window manager, dock, terminal et routing faits maison.",
  "settings.repo": "Voir le code (GitHub)",

  "terminal.shortcuts": "Raccourcis :",

  "egg.ember": "Quelque chose scintille…",
  "egg.quote": "« On n'explore pas pour fuir, mais pour comprendre. » Quelque part entre Outer Wilds et Firewatch.",
  "egg.konami": "Mode explorateur activé. La curiosité, toujours.",
};

export function getLang() {
  return "fr";
}

export function t(key) {
  return STRINGS[key] || key;
}

export function appTitle(appId) {
  return STRINGS[`app.${appId}`] || (APPS[appId] && APPS[appId].title) || appId;
}

export function initI18n() {
  document.documentElement.lang = "fr";
}
