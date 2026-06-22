# Architecture technique

## Contraintes

- **Vanilla JS / HTML / CSS**, sans framework (pas de React/Vue). Modules ES natifs (`type="module"`).
- Pas d'obligation de build step pour la prod — le site doit pouvoir être servi en statique tel quel (cohérent avec un déploiement simple sur Vercel/Netlify/VPS). Un outil de dev léger (ex: simple serveur statique, ou Vite **uniquement** en mode dev si besoin de live-reload) est acceptable, mais la sortie reste du HTML/CSS/JS pur.
- Doit rester performant : pas de dépendances lourdes, attention au poids des assets (icônes en SVG inline, polices en `font-display: swap`).

## Structure de fichiers proposée

```
/
├── index.html              # Shell de l'OS (barre système, dock, bureau)
├── /css
│   ├── reset.css
│   ├── theme.css           # variables CSS (couleurs, light/dark)
│   ├── desktop.css         # bureau, icônes, barre, dock
│   ├── windows.css          # composant fenêtre + animations
│   └── apps/                # styles spécifiques par app si besoin
├── /js
│   ├── main.js              # point d'entrée, init du système
│   ├── windowManager.js      # cœur : création/gestion des fenêtres
│   ├── desktop.js            # icônes, double-clic, ouverture d'apps
│   ├── dock.js               # gestion du dock
│   ├── topbar.js             # horloge, toggle thème/langue
│   ├── router.js             # routing par hash (#app=projects&id=kloud)
│   ├── boot.js                # séquence de démarrage
│   ├── i18n.js                # gestion FR/EN
│   └── /apps
│       ├── finder.js          # app Projets
│       ├── terminal.js
│       ├── about.js
│       ├── contact.js
│       ├── systemMonitor.js
│       └── settings.js
├── /content
│   ├── projects.json         # données des projets (titre, pitch, archi, stack, résultats, liens)
│   ├── about.fr.json / about.en.json
│   └── terminal-commands.json
└── /assets
    ├── icons/                 # SVG des icônes bureau/dock
    ├── wallpapers/
    └── cv/
        ├── CV_Nidal_Lyassami_FR.pdf
        └── CV_Nidal_Lyassami_EN.pdf
```

## Window Manager (cœur du système)

Module central `windowManager.js`, exposant une API simple :

```js
windowManager.open(appId, options)   // crée/affiche une fenêtre pour une app
windowManager.close(windowId)
windowManager.minimize(windowId)
windowManager.maximize(windowId)
windowManager.focus(windowId)        // bring-to-front, gère le z-index
```

Responsabilités :
- Génère le DOM de la fenêtre (barre de titre + corps) et y injecte le contenu rendu par l'app correspondante.
- Gère le **z-index** : un compteur global incrémenté à chaque focus, appliqué à la fenêtre active.
- Gère le **drag** (mousedown sur la barre de titre + mousemove/mouseup) et le **resize** (handle en coin bas-droit), avec contraintes pour ne pas sortir de l'écran.
- Garde un état en mémoire (`Map` des fenêtres ouvertes : position, taille, état minimisé/maximisé) — éventuellement persisté en `localStorage` pour retrouver sa disposition entre deux visites (nice-to-have, pas bloquant).

## Système d'apps

Chaque app est un module JS qui exporte une fonction `render(container, params)` appelée par le window manager au moment de l'ouverture. Permet d'ajouter facilement de nouvelles apps sans toucher au cœur.

Registre central (`apps/registry.js` ou objet dans `main.js`) :

```js
const APPS = {
  finder:   { title: "Projets",     icon: "folder.svg",    module: "./apps/finder.js" },
  terminal: { title: "Terminal",    icon: "terminal.svg",  module: "./apps/terminal.js" },
  about:    { title: "À propos",    icon: "user.svg",      module: "./apps/about.js" },
  contact:  { title: "Contact",     icon: "mail.svg",      module: "./apps/contact.js" },
  monitor:  { title: "Système",     icon: "activity.svg",  module: "./apps/systemMonitor.js" },
  settings: { title: "Paramètres",  icon: "settings.svg",  module: "./apps/settings.js" },
};
```

## Routing

Routing simple par **hash** pour permettre de partager un lien direct vers une app/un projet précis :

- `#/` → bureau seul
- `#/app/finder` → ouvre le Finder
- `#/app/finder/kloud` → ouvre le Finder directement sur le projet Kloud

`router.js` écoute `hashchange` et appelle `windowManager.open(...)` en conséquence. À l'inverse, ouvrir une fenêtre met à jour le hash (sans recharger la page).

## Contenu data-driven

Les projets (`projects.json`), le texte "À propos" et les commandes du terminal sont en JSON séparé du code. Avantage : pour mettre à jour un projet ou ajouter une ligne au terminal, Nidal édite un JSON, pas le JS. Ça reste très simple (pas de CMS), mais ça sépare proprement contenu et logique — et ça facilite une éventuelle évolution future vers un vrai backoffice si besoin (le JSON pourrait être généré par une petite API plus tard sans changer le front).

## System Monitor (widget "live")

App qui affiche des stats récupérées via `fetch()` depuis une petite API exposée par l'infra de Nidal (VPS/Proxmox/Kloud) — ex: uptime, charge CPU, statut de Kloud, dernier commit GitHub (via l'API GitHub publique, pas besoin d'auth pour les repos publics).

- Si l'API perso n'est pas dispo (CORS, downtime…), prévoir un **fallback statique** (dernières valeurs connues ou message "stats en cache") pour ne jamais casser l'UI.
- Rafraîchissement périodique (`setInterval`, ex: toutes les 60s), avec indicateur visuel de "live" (petit point vert qui pulse).

## i18n (FR/EN)

`i18n.js` charge le bon fichier JSON de contenu (`about.fr.json` / `about.en.json`, etc.) selon une langue stockée en `localStorage`. Le toggle dans la barre système change la langue et re-render les apps ouvertes.

## Accessibilité / robustesse

- Toutes les fenêtres et icônes doivent être utilisables au clavier (Tab, Enter, Échap pour fermer) — pas seulement à la souris.
- `prefers-reduced-motion` respecté (cf. design system).
- Le site doit rester fonctionnel sans JS pour le strict minimum : une version `<noscript>` avec lien direct vers le CV et les contacts.
