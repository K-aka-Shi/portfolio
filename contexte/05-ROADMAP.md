# Roadmap de développement

Découpage en phases pensé pour être donné à claude-code de façon incrémentale — chaque phase produit quelque chose de testable, plutôt qu'un "big bang" final.

## Phase 1 — Socle : window manager + bureau (desktop only)

Objectif : avoir un bureau fonctionnel avec fenêtres draggable/resizable/focus, même avec un contenu minimal (placeholder).

- Structure de fichiers de base (`02-ARCHITECTURE.md`).
- `windowManager.js` : open/close/minimize/maximize/focus, drag, resize, z-index.
- Bureau avec 2-3 icônes factices, barre système basique (horloge), dock minimal.
- 1 app de test (ex: "À propos" avec texte statique) pour valider le cycle complet.

**Critère de fin** : on peut ouvrir/fermer/déplacer/redimensionner une fenêtre, plusieurs fenêtres peuvent être ouvertes en même temps avec gestion correcte du focus.

## Phase 2 — Design system + thèmes

- Intégration complète de `01-DESIGN-SYSTEM.md` : variables CSS, glassmorphism, typographie, dark/light mode avec toggle persistant.
- Boot sequence.
- Animations d'ouverture/fermeture de fenêtre, hover dock.
- Wallpaper.

**Critère de fin** : l'expérience visuelle correspond à la direction "GNOME/macOS épuré", thème clair/sombre fonctionnel.

## Phase 3 — Apps de contenu

- `finder.js` + `projects.json` : fiches projets (Kloud, WDS Track, WDS Copilote, Blind Map).
- `about.js` avec contenu FR (EN en phase 5).
- `contact.js`.
- Icônes desktop/dock définitives (SVG).

**Critère de fin** : toutes les infos "essentielles recruteur" sont accessibles et à jour.

## Phase 4 — Terminal + routing

- `terminal.js` avec les commandes définies dans `03-CONTENT-APPS.md` (y compris easter eggs).
- `router.js` : routing par hash, deep links vers projets.

**Critère de fin** : le terminal répond aux commandes prévues, un lien direct vers un projet précis fonctionne.

## Phase 5 — Mobile + i18n + System Monitor

- Adaptation mobile complète (`04-MOBILE.md`).
- `i18n.js` + contenu EN.
- `systemMonitor.js` avec vraie donnée live (uptime/commit GitHub) + fallback propre.
- `settings.js` (regroupe les toggles déjà créés + lien technique).

**Critère de fin** : portfolio complet, responsive, bilingue, avec le widget live fonctionnel (ou fallback explicite si l'API perso n'est pas dispo).

## Phase 6 — Polish & easter eggs

- Accessibilité (clavier, `prefers-reduced-motion`, `<noscript>`).
- Easter eggs finaux (terminal, référence narrative cachée sur le bureau).
- Optimisation perf (poids des assets, lazy loading des apps non ouvertes).

---

## Notes pour claude-code

- Donner les fichiers `00` à `04` en contexte dès le départ (vision globale), puis avancer phase par phase en demandant explicitement "Phase X uniquement" pour éviter qu'il parte trop large d'un coup.
- Le contenu (`projects.json`, `about.*.json`, etc.) peut être rempli au fur et à mesure — possibilité de commencer avec des placeholders en Phase 1-2 et finaliser le texte en Phase 3.
- Garder un œil sur la taille des fichiers JS : si `windowManager.js` devient trop gros, le découper (ex: `windowManager.drag.js`, `windowManager.resize.js`) plutôt que de laisser grossir un seul fichier.
