# Portfolio Nidal LYASSAMI — Concept

## Vision

Le portfolio n'est pas une page qu'on scrolle, c'est un **bureau d'OS** (façon GNOME/macOS) sur lequel le visiteur arrive et qu'il explore librement : il ouvre des fenêtres, lance un terminal, lit des fichiers, regarde tourner des stats en live. L'objectif est de transformer la visite en **expérience**, pas en lecture passive de CV.

Référence d'inspiration générale : des portfolios "jeu/expérience" comme bruno-simon.com, mais en restant réaliste (pas de moteur 3D/physique) — l'expérience vient de l'interaction avec une interface OS crédible, pas de la 3D.

## Cible

Tout le monde : recruteurs, réseau professionnel, contacts personnels, communauté tech. Pas un site "candidature" classique — une vitrine personnelle qui doit donner envie d'explorer, et qui reste lisible/pro pour un recruteur qui n'a que 2 minutes (cf. section "Garde-fous UX").

## Identité / fil rouge

Nidal n'est pas "juste un dev qui a fait des projets" — c'est quelqu'un qui **construit et fait vivre ses propres systèmes** :

- **Alternant chez Würth (WDS)** : autonomie totale sur la conception/déploiement d'outils IA/automatisation, en dehors du pipeline DSI classique.
- **Entrepreneur (SNEE / Blind Map)** : porte un projet d'app de navigation vocale indoor pour personnes malvoyantes.
- **Homelabber** : héberge et maintient sa propre infra (Proxmox, Nextcloud, VPS, Kloud).
- **Gamer narratif / créateur** : a construit son propre moteur narratif Canvas, fan d'Outer Wilds / Firewatch — le côté "exploration pour comprendre un système" est dans son ADN.
- **Fondateur associatif (Eteint Play)** : organise des tournois de foot (format ELT), preuve de leadership/organisation hors tech.

Le concept "bureau d'OS" est la traduction visuelle directe de ça : un OS, c'est un système qu'on construit, configure, maintient — exactement ce que Nidal fait dans tous les pans de sa vie.

## Boucle d'expérience

1. **Boot sequence** courte et stylée (logo, quelques lignes façon démarrage système) → arrivée sur le bureau.
2. **Bureau** : fond d'écran sobre, quelques icônes (dossiers/apps), une barre supérieure type GNOME (menu + horloge + indicateurs système) et un dock en bas.
3. **Exploration libre** : le visiteur ouvre les apps dans l'ordre qu'il veut, déplace/redimensionne les fenêtres, ferme/réduit.
4. **Easter eggs** discrets : terminal avec commandes cachées, référence Outer Wilds/Firewatch planquée quelque part, petit clin d'œil homelab.

## Garde-fous UX (important pour la cible "recruteurs")

- Une **icône "CV.pdf"** et une **app "À propos"** doivent être visibles et ouvrables en 1 clic dès l'arrivée — quelqu'un de pressé doit pouvoir avoir l'essentiel en 10 secondes sans "apprendre" l'OS.
- Le bureau ne doit jamais sembler vide ou être un mur d'icônes : 5-7 icônes max, le reste accessible via le Finder/Projets.
- Pas de son par défaut (autoplay audio = mauvaise pratique), micro-interactions sonores optionnelles et activables.

## Ton / langue

- Français par défaut (cohérent avec le contenu Würth/SNEE), mais prévoir une bascule FR/EN simple (toggle dans la barre système) — beaucoup de profils tech/recruteurs internationaux.
- Voix : direct, un peu d'auto-dérision/humour discret dans les easter eggs et le terminal, mais le contenu "projets" reste factuel et orienté résultats (problème → archi → stack → résultat).
