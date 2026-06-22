# Design System

## Direction visuelle

GNOME / macOS moderne : surfaces propres, coins arrondis, ombres douces, effet de flou (glassmorphism léger) sur les barres et fenêtres. On garde la base déjà posée dans le site actuel (`emerald-950` en fond profond) et on construit une palette complète autour.

## Palette de couleurs

- **Fond bureau** : `emerald-950` (#042f2e) ou un dégradé très subtil emerald-950 → noir, façon wallpaper "espace/nuit".
- **Surfaces (fenêtres, dock, barre du haut)** : blanc/gris très clair en light mode, gris anthracite (`#1c1f1f` à `#23272a`) en dark mode — glassmorphism via `backdrop-filter: blur()` + opacité ~0.7-0.85.
- **Accent principal** : emerald-600/700 (déjà utilisé) — boutons actifs, indicateurs, highlights de focus.
- **Texte** : gris 900 sur surfaces claires, gris 100 sur surfaces sombres.
- **Mode clair/sombre** : toggle dans la barre système (icône soleil/lune), persistant via `localStorage`. Par défaut : dark (cohérent avec le thème actuel).

## Typographie

- **UI générale** : `Inter` (déjà chargée) — poids 400/500/700.
- **Terminal et éléments "code/système"** : police monospace type `JetBrains Mono` ou `Fira Code` (via Google Fonts), avec ligatures désactivées pour la lisibilité.
- Tailles : respecter une échelle simple (12/14/16/20/24/32px) pour rester cohérent dans toute l'UI façon "OS".

## Composants

### Barre système (haut)
- Bande fine (~32-40px), fixe, glassmorphism.
- Gauche : logo/menu "Nidal OS" (clic = menu avec liens rapides : LinkedIn, GitHub, Email).
- Centre ou droite : horloge en temps réel (heure de Strasbourg).
- Droite : icônes d'état (toggle thème clair/sombre, toggle langue FR/EN, indicateur "système" — cf. app System Monitor).

### Dock (bas)
- Centré, flottant, glassmorphism, coins très arrondis.
- Icônes des apps principales : Finder/Projets, Terminal, À propos, CV, Contact, System Monitor, Paramètres.
- Effet hover : léger scale-up (genre 1.15) façon dock macOS — pas besoin de l'effet magnify complet sur les voisins, trop coûteux pour peu de valeur.
- Petit point sous l'icône d'une app actuellement ouverte.

### Fenêtres
- Barre de titre avec :
  - 3 points de contrôle façon macOS (rouge/jaune/vert = fermer/réduire/agrandir), ou variante GNOME (boutons rectangulaires à droite) — choisir un seul système et rester cohérent partout.
  - Titre de l'app centré ou aligné à gauche.
- Corps : fond surface, padding cohérent, scroll interne si contenu long.
- Comportements : draggable (par la barre de titre), resizable (coin bas-droit), bring-to-front au clic, minimisable (réduit dans le dock), maximisable (plein écran avec animation).
- Ombre portée marquée pour détacher la fenêtre du fond.

### Icônes de bureau
- Grille simple, icônes + label en dessous, double-clic (ou simple clic, plus accessible) pour ouvrir.
- Style d'icônes : flat/outline cohérent — possibilité d'utiliser une lib comme Lucide ou Phosphor en SVG inline.

## Animations

- **Boot sequence** : 1.5-2.5s max, logo qui apparaît + 2-3 lignes de texte façon log système qui s'affichent en fondu/typewriter, puis transition vers le bureau (fade ou wipe).
- **Ouverture/fermeture de fenêtre** : scale (0.95 → 1) + fade, ~200ms, easing `ease-out`.
- **Dock hover** : scale fluide, transition ~150ms.
- **Drag de fenêtre** : pas d'animation sur le drag lui-même (suivre le curseur en direct), mais un léger "snap" / inertie à la fin si simple à implémenter.
- Respecter `prefers-reduced-motion` : désactiver/réduire les animations si l'utilisateur l'a demandé au niveau OS.

## Wallpaper

- Une seule image/dégradé en fond, sobre, dans les tons emerald/nuit — éventuellement avec un motif très discret (étoiles façon Outer Wilds, ou texture "circuit"/réseau évoquant homelab). Pas d'image trop chargée : le bureau doit rester lisible.
