# Adaptation mobile

## Principe

Même concept "bureau d'OS", adapté au tactile plutôt que remplacé par une UI complètement différente — cohérence de l'expérience entre desktop et mobile.

## Bureau mobile

- Grille d'icônes adaptée (2-3 colonnes selon largeur d'écran), même logique que desktop.
- Barre système en haut : version simplifiée (horloge + toggles thème/langue dans un menu condensé si besoin de place).
- Le **dock** peut devenir une barre de navigation fixe en bas, avec les mêmes apps principales (max 4-5 icônes, le reste accessible depuis le bureau).

## Fenêtres → plein écran

- Au tap sur une icône, l'app s'ouvre en **plein écran** (pas de fenêtre flottante draggable — inutile et frustrant au doigt).
- Barre de titre adaptée : bouton "retour" (flèche) à gauche au lieu des 3 points de contrôle macOS, pour revenir au bureau.
- Pas de resize/drag sur mobile — ces interactions sont désactivées, le window manager doit détecter le contexte (largeur d'écran / `pointer: coarse`) et adapter son comportement.

## Multitâche simplifié

- Une seule app visible à la fois (pas de superposition de fenêtres comme sur desktop).
- Navigation : bouton retour ramène au bureau ; pas de gestion de pile de fenêtres complexe — chaque ouverture remplace la précédente.
- Le routing par hash reste valable et permet toujours les liens directs (`#/app/finder/kloud` ouvre directement le projet Kloud en plein écran sur mobile aussi).

## Boot sequence

- Version raccourcie sur mobile (moins de texte, transition plus rapide) pour ne pas faire attendre inutilement sur connexion mobile.

## Terminal sur mobile

- Clavier virtuel à anticiper : champ input toujours visible et accessible, pas caché par le clavier système (gestion du viewport / `env(keyboard-inset-height)` si besoin).
- Prévoir éventuellement quelques boutons de raccourci pour les commandes les plus utiles (`help`, `projects`, `cv`) pour éviter la saisie complète au tactile.

## Performance

- Sur mobile, désactiver/réduire les effets de blur (`backdrop-filter`) si trop coûteux selon les devices — fallback en couleur pleine semi-transparente.
- Images/wallpaper en résolution adaptée (`srcset` ou variantes selon la taille d'écran) pour ne pas charger une image desktop lourde inutilement.

## Détection du contexte

Le window manager doit détecter le mode (desktop vs mobile) via une combinaison de largeur d'écran et `matchMedia('(pointer: coarse)')`, et adapter dynamiquement son comportement (drag/resize activés ou non, fenêtres flottantes ou plein écran) — idéalement réévalué au resize/changement d'orientation, pas seulement au chargement.
