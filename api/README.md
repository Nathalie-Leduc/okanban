# O'Kanban — API

API REST du projet O'Kanban, développée avec Node.js, Express 5 et Sequelize
sur une base PostgreSQL.

## Architecture en couches

L'API suit une organisation MVC stricte. Chaque dossier a une responsabilité unique :

```
api/
├── index.js            Point d'entrée (création de l'app Express, middlewares globaux)
├── routers/            Définition des routes REST par ressource
├── controllers/        Logique métier (un controller = une ressource)
├── middlewares/        is-authed, is-admin, check-id, error handling
├── schemas/            Schémas de validation Joi
├── models/             Modèles Sequelize + associations
├── migrations/         Scripts d'initialisation de la base (Node)
├── data/               Scripts SQL bruts : create + seed
├── errors/             Classes d'erreur HTTP personnalisées
├── unit-tests/         Tests unitaires (node:test)
├── Dockerfile.api      Image du serveur d'API
└── Dockerfile.database Image PostgreSQL avec scripts d'init
```

## Sécurité

- **Authentification JWT** (durée de vie 1 h) — middleware `is-authed`
- **Contrôle d'accès par rôles** (`member` / `admin`) — middleware `is-admin`
- **Hachage Argon2** des mots de passe
- **Validation Joi** systématique des entrées
- **Body sanitizer anti-XSS** (`express-xss-sanitizer`)
- **CORS** configuré

## Base de données

Tables : `list`, `card`, `tag`, `card_has_tag` (jointure N,N), `user`.

Relations :

- `list` 1,N `card` (suppression en cascade)
- `card` N,N `tag` (via `card_has_tag`)
- `user` porte un rôle (`member` ou `admin`)

Voir [`data/01.createTables.sql`](./data/01.createTables.sql) pour la définition
complète et [`models/index.js`](./models/index.js) pour les associations Sequelize.

## Variables d'environnement

```bash
cp .env.example .env
```

Variables attendues :

```
PORT=3000
DB_URL=postgres://user:password@localhost:5432/okanban
JWT_SECRET=votre-secret-fort
```

## Installation et lancement

```bash
npm install         # dépendances
npm run db:create   # crée les tables (PostgreSQL doit être démarré)
npm run db:seed     # insère les données de test
npm run dev         # lance l'API en mode développement (node --watch)
npm start           # lance l'API en mode production
```

## Scripts npm

| Script | Description |
|--------|-------------|
| `npm start` | Démarre l'API (`node index.js`) |
| `npm run dev` | Mode développement (`node --watch`) |
| `npm run db:create` | Crée les tables |
| `npm run db:seed` | Insère le jeu de données |
| `npm run db:reset` | Recrée + ré-injecte |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement ce qui peut l'être |
| `npm test` | Exécute la suite de tests unitaires |

## Routes principales

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/` | Message d'accueil |
| `POST` | `/signup` | Inscription d'un nouvel utilisateur |
| `POST` | `/login` | Connexion (retourne un JWT) |
| `GET` | `/lists` | Récupère toutes les listes (avec leurs cartes) |
| `POST` | `/lists` | Crée une liste |
| `PATCH` | `/lists/:id` | Modifie une liste |
| `DELETE` | `/lists/:id` | Supprime une liste (cascade sur les cartes) |
| `POST` | `/cards` | Crée une carte (vérifie l'existence de la liste) |
| `PATCH` | `/cards/:id` | Modifie une carte |
| `DELETE` | `/cards/:id` | Supprime une carte |
| `POST` | `/cards/:cardId/tags/:tagId` | Associe un tag à une carte |
| `DELETE` | `/cards/:cardId/tags/:tagId` | Dissocie un tag d'une carte |
| `POST` | `/tags`, `PATCH /tags/:id`, `DELETE /tags/:id` | Gestion des tags (admin) |

Le détail complet est dans [`routers/`](./routers/).

## Tests

Tests unitaires écrits avec le test runner natif Node.js (`node:test`), pattern AAA
(Arrange / Act / Assert), principes FIRST.

```bash
npm test
```

Voir [`unit-tests/TABLEAU-DE-BORD.md`](./unit-tests/TABLEAU-DE-BORD.md) pour la
liste des tests et leur couverture.

## Conteneurisation

Deux Dockerfiles dans ce dossier :

- [`Dockerfile.api`](./Dockerfile.api) — image Node.js Alpine du serveur d'API
- [`Dockerfile.database`](./Dockerfile.database) — image PostgreSQL avec
  exécution automatique des scripts SQL d'initialisation au premier lancement
  (montés via `/docker-entrypoint-initdb.d/`)

L'orchestration des conteneurs est définie dans le
[`docker-compose.yml`](../docker-compose.yml) à la racine.

## Auteur

Nathalie Leduc — formation CDA, O'clock.
