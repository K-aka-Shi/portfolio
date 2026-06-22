# TODO — Portfolio « Nidal OS »

Todolist complète pour respecter à la lettre les consignes du dossier [contexte/](contexte/).
On avance **une phase à la fois**, en validant le « critère de fin » avant de passer à la suivante.

---

## ⚙️ Contraintes transverses (toutes phases)

- [ ] Vanilla JS / HTML / CSS uniquement — aucun framework, modules ES (`type="module"`)
- [ ] Pas de build step obligatoire en prod (statique ; Vite autorisé en dev uniquement)
- [ ] Performance : pas de deps lourdes, icônes SVG inline, `font-display: swap`
- [ ] Accessibilité : clavier (Tab / Enter / Échap), `prefers-reduced-motion`, `<noscript>` (CV + contacts)
- [ ] Pas de son par défaut (micro-interactions sonores optionnelles)
- [ ] Jamais de fausse métrique présentée comme réelle (System Monitor)
- [ ] Garder le code modulaire (découper `windowManager.js` s'il grossit trop)

## 📦 Prérequis / Assets

- [ ] CV PDF FR + EN → `assets/cv/CV_Nidal_Lyassami_FR.pdf` & `_EN.pdf`
- [ ] Icônes SVG bureau/dock (style flat/outline type Lucide/Phosphor) → `assets/icons/`
- [ ] Wallpaper(s) sobre(s) emerald/nuit + variantes `srcset` mobile → `assets/wallpapers/`
- [ ] Polices : Inter (400/500/700) + monospace JetBrains Mono / Fira Code (ligatures off)

---

## 🟢 Phase 1 — Socle : window manager + bureau (desktop only)

- [ ] Structure de fichiers de base (`/css`, `/js`, `/js/apps`, `/content`, `/assets`)
- [ ] `index.html` = shell de l'OS (barre système + dock + bureau)
- [ ] `windowManager.js` : API `open / close / minimize / maximize / focus`
- [ ] Gestion du z-index (compteur global au focus → bring-to-front)
- [ ] Drag (barre de titre) + resize (coin bas-droit) avec contraintes écran
- [ ] État mémoire des fenêtres (`Map` : position, taille, minimisé/maximisé)
- [ ] Bureau 2-3 icônes factices + barre système basique (horloge) + dock minimal
- [ ] 1 app de test (« À propos » statique)
- [ ] **Critère de fin** : ouvrir/fermer/déplacer/redimensionner, multi-fenêtres + focus correct

## 🎨 Phase 2 — Design system + thèmes

- [ ] `theme.css` : variables CSS (emerald-950, surfaces, accent emerald-600/700, textes)
- [ ] Glassmorphism (`backdrop-filter: blur()` + opacité 0.7–0.85) barres/fenêtres/dock
- [ ] Typo : Inter + monospace ; échelle 12/14/16/20/24/32px
- [ ] Dark/Light mode + toggle persistant (`localStorage`), défaut dark
- [ ] Barre système complète : menu « Nidal OS » (LinkedIn/GitHub/Email), horloge Strasbourg, toggles thème/langue + indicateur système
- [ ] Dock complet : flottant, hover scale ~1.15, point sous l'app ouverte
- [ ] Fenêtres stylées : boutons de contrôle (un seul système macOS *ou* GNOME), ombre portée, scroll interne
- [ ] Boot sequence 1.5–2.5s (logo + lignes log typewriter → transition)
- [ ] Animations : ouverture/fermeture (scale 0.95→1 + fade ~200ms), dock hover (~150ms), snap fin de drag
- [ ] Wallpaper sobre (motif discret optionnel)
- [ ] **Critère de fin** : rendu « GNOME/macOS épuré », thème clair/sombre fonctionnel

## 📁 Phase 3 — Apps de contenu

- [ ] `content/projects.json` : Kloud, WDS Track, WDS Copilote, Blind Map (Problème → Archi → Stack → Résultat) + Eteint Play optionnel (« Autres »)
- [ ] `finder.js` : liste projets + fiche détail
- [ ] `about.js` + `content/about.fr.json` (Qui / Ce qu'il fait / Hors code / CTA)
- [ ] `contact.js` : liens directs (mailto, LinkedIn, GitHub) — pas de backend
- [ ] Garde-fou recruteur : icône CV.pdf + app À propos ouvrables en 1 clic
- [ ] Bureau 5–7 icônes max (ni vide, ni mur d'icônes)
- [ ] Icônes bureau/dock définitives (SVG inline)
- [ ] **Critère de fin** : infos « essentielles recruteur » accessibles et à jour

## 💻 Phase 4 — Terminal + routing

- [ ] `content/terminal-commands.json` + `terminal.js` : `whoami`, `about`, `projects`/`ls projects/`, `skills`, `contact`, `cv`, `neofetch`, `help`, commande inconnue
- [ ] Easter eggs : `sudo make-coffee`, `cat outer_wilds.txt` (réf Outer Wilds/Firewatch)
- [ ] Shell : prompt `nidal@portfolio:~$`, historique (flèches ↑/↓)
- [ ] `router.js` : hash routing (`#/`, `#/app/finder`, `#/app/finder/kloud`) + maj hash à l'ouverture
- [ ] **Critère de fin** : terminal répond, deep link projet fonctionne

## 📱 Phase 5 — Mobile + i18n + System Monitor

- [ ] Détection contexte : largeur + `matchMedia('(pointer: coarse)')`, réévaluée au resize/orientation
- [ ] Mobile : grille 2-3 colonnes, barre système simplifiée, dock → nav bas (4-5 icônes)
- [ ] Mobile : fenêtres plein écran (pas de drag/resize), bouton retour, 1 app à la fois
- [ ] Mobile : boot raccourci, terminal input non caché par clavier + boutons raccourci
- [ ] Mobile perf : blur réduit (fallback couleur pleine), wallpaper `srcset`
- [ ] `i18n.js` + `content/about.en.json` (+ contenus EN), re-render apps ouvertes
- [ ] `systemMonitor.js` : donnée live (uptime, statut Kloud, dernier commit GitHub API publique), refresh ~60s + indicateur live, fallback statique
- [ ] `settings.js` : toggles thème/langue/animations + lien « à propos de ce site »
- [ ] **Critère de fin** : complet, responsive, bilingue, widget live (ou fallback explicite)

## ✨ Phase 6 — Polish & easter eggs

- [ ] Accessibilité finale (clavier complet, `prefers-reduced-motion`, `<noscript>`)
- [ ] Easter eggs finaux (terminal + réf narrative cachée + clin d'œil homelab)
- [ ] Optimisation perf : poids assets, lazy loading des apps non ouvertes
- [ ] Vérification parcours « recruteur 10 secondes » + expérience d'exploration
