/**
 * registry.js — registre central des apps.
 * `module` est résolu en import dynamique DEPUIS windowManager.js (dossier /js),
 * d'où les chemins "./apps/...". Ajouter une app = ajouter une entrée ici.
 *
 * Champs :
 *  - title   : titre par défaut (FR) ; les libellés affichés passent par i18n.appTitle()
 *  - icon    : clé dans js/icons.js
 *  - module  : chemin du module exportant render(container, params)
 *  - href    : (raccourci) ouvre une URL directement au lieu d'une fenêtre (ex: CV)
 *  - width/height : taille initiale de la fenêtre (desktop)
 *  - desktop : présence sur le bureau (desktop). Sur mobile, toutes les apps sont
 *              accessibles depuis le bureau.
 *  - dock    : présence dans le dock flottant (desktop)
 *  - mobileNav : présence dans la barre de navigation du bas (mobile, max 4-5)
 */
export const APPS = {
  finder: {
    title: "Projets",
    icon: "folder",
    module: "./apps/finder.js",
    width: 600,
    height: 460,
    desktop: true,
    dock: true,
    mobileNav: true,
  },
  about: {
    title: "À propos",
    icon: "user",
    module: "./apps/about.js",
    width: 520,
    height: 500,
    desktop: true,
    dock: true,
    mobileNav: true,
  },
  cv: {
    title: "CV.pdf",
    icon: "file",
    href: "assets/cv/CV_Nidal_Lyassami_FR.pdf",
    desktop: true,
    dock: true,
    mobileNav: true,
  },
  contact: {
    title: "Contact",
    icon: "mail",
    module: "./apps/contact.js",
    width: 420,
    height: 360,
    desktop: true,
    dock: true,
    mobileNav: true,
  },
  terminal: {
    title: "Terminal",
    icon: "terminal",
    module: "./apps/terminal.js",
    width: 600,
    height: 400,
    desktop: false,
    dock: true,
    mobileNav: true,
  },
  monitor: {
    title: "Système",
    icon: "activity",
    module: "./apps/systemMonitor.js",
    width: 460,
    height: 380,
    desktop: false,
    dock: true,
  },
  settings: {
    title: "Paramètres",
    icon: "settings",
    module: "./apps/settings.js",
    width: 440,
    height: 460,
    desktop: false,
    dock: true,
  },
};
