# Contenu des apps

Ce fichier liste les apps du bureau, leur rôle, et un premier jet de contenu (à ajuster/enrichir par Nidal). Le contenu détaillé des projets est pensé pour aller dans `content/projects.json`.

## 1. Finder / Projets

Icône "dossier". Affiche une liste de projets (style fichiers/dossiers), chaque clic ouvre une fiche projet en sous-fenêtre ou panneau de détail.

Pour chaque projet, structure **Problème → Architecture → Stack → Résultat** :

### Kloud
- **Problème** : centraliser et contrôler l'accès à l'IA (Claude) pour la famille, avec quotas par utilisateur, sans dépendre de comptes individuels payants pour chacun.
- **Architecture** : plateforme web avec frontend Next.js, backend FastAPI, authentification JWT, intégration API Claude.
- **Stack** : Next.js / React, FastAPI (Python), JWT, API Anthropic, déploiement Docker sur VPS.
- **Résultat** : plateforme fonctionnelle auto-hébergée, gestion fine des quotas par utilisateur, architecture réutilisable pour d'autres cas d'usage IA.

### WDS Track
- **Problème** : suivre les visites terrain des commerciaux Würth (WDS) de façon simple et traçable, sans outil lourd imposé par la DSI.
- **Architecture** : application web avec génération/scan de QR codes pour pointer les visites, base de données légère.
- **Stack** : Flask, SQLite, déploiement Render (migration vers VPS évaluée pour plus de contrôle/coût).
- **Résultat** : outil déployé et utilisé en interne, conçu et maintenu en autonomie en dehors du pipeline DSI standard — preuve de capacité à livrer vite dans un contexte grand groupe contraint.

### WDS Copilote
- **Problème** : offrir un point de contact conversationnel (WhatsApp) pour les besoins courants de l'équipe WDS, sans développement front dédié.
- **Architecture** : chatbot WhatsApp Business connecté à une API backend.
- **Stack** : FastAPI (Python), WhatsApp Cloud API via 360dialog.
- **Résultat** : preuve de concept fonctionnelle d'un canal conversationnel professionnel, base pour un futur chatbot client IA (en cours de validation RSSI/DSI avec l'API Claude).

### Blind Map
- **Problème** : aider les personnes malvoyantes à se déplacer en intérieur (bâtiments publics, etc.) où le GPS classique ne fonctionne pas.
- **Architecture** : application mobile de navigation vocale indoor.
- **Stack** : développement mobile (Flutter), à compléter selon l'avancement technique du projet.
- **Résultat** : projet porté dans le cadre du Statut National Étudiant-Entrepreneur (SNEE), candidature 2026-2027 via Pépite Etena — projet à fort impact social, en phase de structuration entrepreneuriale.

### (optionnel) Eteint Play
- **Problème / contexte** : créer un évènement fédérateur et bien organisé pour la communauté étudiante.
- **Architecture** : association étudiante avec organisation de tournois de foot au format ELT, plusieurs éditions réalisées.
- **Résultat** : preuve de compétences en gestion de projet, organisation et leadership, hors contexte purement technique — bon contrepoint humain dans le portfolio.

> Note : à inclure ou non selon si Nidal veut garder le Finder 100% "tech" ou montrer aussi cette dimension. Si inclus, peut-être dans un sous-dossier "Autres" plutôt que mélangé aux projets tech.

## 2. Terminal

App terminal interactive, commandes prédéfinies dans `terminal-commands.json`. Liste de commandes suggérées :

- `whoami` → affiche une courte présentation (nom, rôle, alternance).
- `about` → ouvre/affiche le contenu de l'app "À propos".
- `projects` ou `ls projects/` → liste les projets (avec liens pour les ouvrir dans le Finder).
- `skills` → liste des compétences techniques par catégorie (langages, frameworks, infra).
- `contact` → affiche les moyens de contact (email, LinkedIn, GitHub).
- `cv` → ouvre/télécharge le CV.
- `neofetch` → affiche un résumé "système" façon neofetch (ASCII art + infos perso présentées comme des specs machine — clin d'œil homelab/Fedora direct).
- `sudo make-coffee` → easter egg, réponse humoristique ("Permission denied: pas encore de café configuré sur ce système ☕").
- `cat outer_wilds.txt` ou commande cachée similaire → easter egg référence Outer Wilds/Firewatch.
- `help` → liste toutes les commandes disponibles.
- Commande inconnue → message façon shell ("command not found: xxx — tape `help` pour la liste des commandes").

Comportement : input avec historique (flèches haut/bas pour rappeler les commandes précédentes), affichage façon shell (prompt `nidal@portfolio:~$`).

## 3. À propos

Contenu court et percutant, pas un CV en prose. Structure suggérée :

- Qui : alternant MAALSI (CESI Strasbourg), spécialisation architecture logicielle & IA/automatisation, en alternance chez Würth France (unité WDS).
- Ce qu'il fait : conçoit et déploie des outils IA/automatisation en autonomie (WDS Track, WDS Copilote), porte un projet entrepreneurial à impact social (Blind Map, SNEE), et maintient sa propre infra (Kloud, homelab Proxmox/VPS).
- En dehors du code : foot (5v5 le dimanche), jeux narratifs (Outer Wilds, Firewatch), fondateur d'Eteint Play.
- Call-to-action : lien CV + contact.

## 4. Contact

Formulaire minimal ou simples liens directs (email, LinkedIn, GitHub) — éviter un vrai formulaire avec backend si pas nécessaire (mailto: suffit largement pour un portfolio perso, pas de gestion de spam à prévoir).

## 5. System Monitor

Voir détails techniques dans `02-ARCHITECTURE.md`. Contenu affiché :
- Statut "serveur" (uptime VPS/Proxmox si exposable publiquement, sinon donnée simulée clairement présentée comme telle).
- Dernier commit GitHub (via API publique GitHub, repo à choisir — ex: Kloud ou autre projet actif).
- Petit graphique ou jauge (CPU/RAM) si donnée dispo, sinon retirer cet élément plutôt que d'inventer une fausse donnée.

> Important : ne jamais afficher de fausses métriques présentées comme réelles — soit la donnée est vraie (même approximative), soit on ne l'affiche pas. La crédibilité de ce widget est justement ce qui en fait une "prouesse technique".

## 6. Paramètres

App simple avec :
- Toggle thème clair/sombre.
- Toggle langue FR/EN.
- Toggle animations réduites (lié à `prefers-reduced-motion`, mais offrir aussi un contrôle manuel).
- Lien "à propos de ce site" : courte note technique (stack utilisée, lien vers le repo GitHub si public) — sympa pour les profils tech qui regardent "comment c'est fait".
