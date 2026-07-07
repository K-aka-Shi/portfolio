# 07 — Direction & base de vérité (V2)

Ce fichier consolide toutes les décisions prises après le questionnaire (voir
`061-QUESTIONNAIRE-REPONSES.md`) et les vraies données récupérées sur Notion / GitHub.
En cas de conflit, **ce fichier fait foi** et met à jour les fichiers `00` à `05`.

Règles d'écriture du site : pas de tiret cadratin, pas de franglais inutile.

---

## 1. Positionnement

- **Accroche** : « Dev IA & Automatisation » (une phrase, sans jargon).
- **Rôle actuel** : Développeur IA & Automatisation, BU10 / WDS, Würth France (alternance).
- **Public prioritaire** : réseau tech > recruteurs > clients potentiels > communauté > amis-famille.
- **Action n°1 visée** : lancer une démo + me suivre (LinkedIn en tête, pas GitHub qui est encore vide).
- **Émotion cible** : « ce mec est carré ». **Succès** = mon réseau s'élargit.
- **3 mots** : ingénieux, personnel, drôle.
- **Profondeur** portée par le « À propos » : archi logicielle + ambition entrepreneuriale.

## 2. Ton & langue

- **FR uniquement** (on retire l'i18n anglais des phases précédentes).
- **Tutoiement** pour la voix ludique (terminal, easter eggs, accueil). « je » + infinitif pour le reste.
- **85 % pro / 15 % déconne**, auto-dérision, bon public.
- **Interdits** : le tiret cadratin, le franglais inutile.
- **Tics assumés** (easter eggs) : « WUHAAAN », « hechek », « t'es chaud t'es bon dinguerie ».

## 3. Direction visuelle : atelier « sleek chaleureux »

- **Métaphore** : un atelier de nuit, en **ambiance** (pas en navigation). On garde la coquille façon bureau/OS.
- **Curseur jeu / vitrine** : ~20 partout (vitrine nette), ~80 sur le « À propos » (récit).
- **Palette** : fond anthracite tiède (sous-teinte verte), émeraude (identité), ambre / terracotta (chaleur, feu de camp, clin d'œil marocain), blanc cassé tiède pour le texte.
- **Texture & lumière** : source de lumière chaude type lampe d'atelier, grain très léger, motif zellige discret (remplace le circuit spatial froid).
- **Mouvement** : fluide, cinématique, intentionnel (pas de gadget).
- **Références** : mehdiseddik.dev (vitrine épurée sombre), sebastien-lempens.com (récit scrollé cinématique, modèle du « À propos », faisable en 2D), 1600.agency (punch motion, copie orientée bénéfice).

## 4. Structure du site

- **Coquille bureau/OS** conservée (repeinte en atelier), navigation claire.
- **Vitrine sleek** pour projets / CV / contact + **« À propos » narratif scrollé** (cinématique).
- **Finder à 3 espaces** : Pro / Perso / Scolaire.
- **Carte projet** : problème → solution → impact (observable ou chiffré). La techno vient après, dans un volet « sous le capot » repliable.
- **4 domaines de compétences** (formulés en résultats) : IA générative & LLM · Automatisation & intégrations · Site vitrine & App web · Déploiement & infra légère.
- **CTA** : « lancer une démo » + « me suivre » (LinkedIn), formulation « Ouvert aux collaborations » (dispo suggérée, sans date).
- **Contact** : LinkedIn + mail. Domaine `nidal.dev` (mail `nidal@nidal.dev` à terme).

## 5. Stack réelle (ne rien survendre)

- **Bon niveau** : Python (Flask, PySide), HTML/CSS/JS vanilla, VueJS, Notion.
- **Aussi** : FastAPI, TinyDB / SQLite, PHP (ponctuel), Ren'Py.
- **Infra** : VPS OVH, Render, Docker, homelab Proxmox, déploiement.
- **En cours** : Rust.
- **À retirer du contenu** : Next.js / React / Flutter (venaient de suppositions et de Kloud).

## 6. Inventaire projets réel (source Notion + dépôts)

> Décisions actées :
> - Kloud retiré (abandonné).
> - Outils Würth décrits en **générique**, jamais de clients nommés (on ajustera si besoin).
> - **Démo** : placeholder pour l'instant (aucune démo prête à montrer).
> - Dimension culturelle / religieuse **gardée discrète et neutralisée**, sauf :
>   « UEPM » renommé **Vision**, et **MyTalib** conservé tel quel.

### Espace Pro (Würth, BU10 / WDS)

- **WDS LAB** : hub interne pour l'équipe (outils sur-mesure + tips hebdo + ressources Würth GPT / Microsoft).
- **Mond'Ai** : série de tips IA hebdomadaires (Teams). Angle souveraineté / vie privée (ex. « LuxPDF » sur les outils gratuits qui entraînent des IA sur tes documents).
- **WDS QR Track** (dépôt `flask-tracking-app`) : générer et suivre des QR codes commerciaux personnalisés par vendeur. Flask / SQLite.
- **WDS Copilote** (dépôts `sandbox-chatbot-whatsapp`, `wurth_chatbot`) : chatbot WhatsApp pour les besoins courants de l'équipe. FastAPI, WhatsApp Cloud API (360dialog).
- **WDS PrépaSMS** : charger un reporting, filtrer les mobiles (06/07), rédiger et envoyer un SMS personnalisé.
- **WDS CalculCoeff**, **wurth-mailer**, **wurth-vcard** : petits outils internes.
- **Fait marquant (autonomie)** : process DSI lents (3 mois d'attente pour un ticket) → prise d'un serveur OVH perso pour héberger ses outils et livrer vite.
- ⚠️ **Confidentialité** : rester générique, valider avec Nidal ce qui est publiable.

### Espace Perso / entrepreneuriat

- **Blind Map / SenseTech** (Innov'Hand 2026, Équipe 9) : app de navigation indoor pour aider les personnes aveugles à faire leurs courses en autonomie (grandes surfaces). Nidal a porté ~80 % (interviews, vidéo, montage, motion design, pitch), équipe finaliste. Premier pas entrepreneurial. Statut : idéation. Dépôts `innovhand-aveugle`, `innovhand-pitch-support`, `innovhand-motiondesign`.
- **Eteint Play** : asso de tournois de sport (foot), 3 ans, réseau large (enfance, travail, études). Ex. un championnat devant le Parlement européen à Strasbourg. En structuration en asso. POC. Dépôts `ChallengeFC`, `EteintCoins`.
- **Homelab** : infra perso auto-hébergée (Proxmox / VPS), signal de culture technique et de souveraineté.
- **BretzelEternel** : visual novel Ren'Py (jeu narratif, clin d'œil Strasbourg). Pépite perso, ludique, colle à son goût des jeux narratifs (Ghost Trick, Undertale) et à l'envie de faire des jeux.
- **Prompt4Planning** : générateur de prompts ChatGPT pour emplois du temps profs (Flask / TinyDB). Côté transmission / aide aux enseignants.
- **MyTalib** : app VueJS orientée étudiants / apprentissage (nom conservé tel quel). Description exacte à confirmer.
- **musafir** : bot Discord compagnon (gardé discret, formulé en neutre).
- **Futurs** : jeu vidéo pour sa petite sœur, outils self-hosted pour la famille (cloud, IA).

### Espace Scolaire (parcours depuis le bac)

- **Vision** (anciennement « UEPM ») : ERP de gestion d'établissements scolaires, conçu en alternance bachelor pour l'école Vision (Grand Est). Première vraie expérience pro. Archivé. On retient le nom « Vision », pas l'acronyme d'origine.
- **CESIZen** : plateforme de gestion du stress / bien-être (modules), projet CESI. VueJS.
- **OpenEduc** : projet BTS SIO (épreuve E5, conception et développement d'applications).
- **Time'Eats** : projet PMO / DSI (CESI MAALSI), Nidal chef de projet.
- **SimpleCalc** (PySide), **tp2nosql**, **devops** : travaux d'apprentissage.

### Projet qui le résume le mieux

Efficacité : projets Würth. Hors zone de confort en équipe : Blind Map. Première expérience : myUEPM. **Le plus personnel et complet : Eteint Play.**

## 7. Easter eggs (personnalisés)

- **Bretzel** de Strasbourg planqué + lien caché vers **BretzelEternel**.
- Motif **zellige** marocain discret (El Jadida, ses origines).
- **Konami** → ASCII art dans la console.
- Secret : « je fais du foot mais je ne suis pas le foot ».
- Blague de l'**informaticien réparateur universel** (« tu peux regarder mon imprimante ? ») en réponse du terminal.
- Tics : « WUHAAAN », « hechek », « t'es chaud t'es bon dinguerie ».
- Clins d'œil culture : feu de camp (Outer Wilds / Firewatch), détermination (Undertale), Spider-Man, progression (Vinland Saga, Naruto), comprendre un système pour s'en libérer (The Promised Neverland).
- Sélection de **memes FR** à finaliser (recherche à faire).

## 8. Technique & contraintes

- **Vanilla JS / HTML / CSS**, sans framework, sans build obligatoire (comme l'actuel).
- **Hébergement** portfolio : Vercel. Le VPS OVH garde les backends (pour les démos live).
- **Analytics** : Umami self-hosted (aucun cookie, pas de bannière légale requise).
- **No-go** : pas de téléchargement CV forcé avant les projets ; pas de design « template » qui efface l'identité ; pas de son automatique ; jamais nommer de clients Würth.
- **Échéances** : rentrée CESI septembre 2026 (et dossier Pépite Eténa étudiant-entrepreneur) ; fin d'alternance septembre 2027 (CDI ou freelance).

## 9. Ce que ça change vs le code actuel (phases 1 à 6)

- **On garde** : window manager, dock, terminal, routing, structure data-driven, accessibilité, perf, lazy-loading.
- **On repeint** : ambiance spatiale froide → atelier sleek chaleureux (palette, lumière chaude, zellige).
- **On refond le contenu** : `projects` en 3 espaces + vrais projets (retirer Kloud, corriger la stack).
- **On ajoute** : le « À propos » narratif scrollé ; des démos vivantes (homelab, éventuelle démo IA) ; la mise en avant de Mond'Ai / suivre.
- **On retire** : l'i18n anglais (FR seul).

## 10. Questions encore ouvertes

Résolues : confidentialité Würth (générique), démo (placeholder), dimension identitaire (discrète, sauf Vision et MyTalib).

Restent :
- **MyTalib** : que fait exactement l'app, et dans quel espace la ranger (perso ou scolaire) ?
- On garde le vocabulaire **bureau / OS**, ou on renomme certains éléments en registre **atelier** (établi, outils) ?
- Emplacement de **BretzelEternel** : projet perso affiché, ou seulement en easter egg ?
