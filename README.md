# O'Kanban

Application web de gestion de tâches inspirée de Trello, structurée en deux projets
(API REST + client web) et conteneurisée avec Docker Compose.

Réalisée dans le cadre de la formation **Concepteur Développeur d'Applications**
(O'clock, promo Francfort).

## Stack technique

**Back-end (`api/`)**

- Node.js + Express 5 — API REST
- Sequelize (ORM) + PostgreSQL
- Joi — validation des données
- JWT + Argon2 — authentification et hachage des mots de passe
- `express-xss-sanitizer` — protection anti-XSS

**Front-end (`client/`)**

- Svelte 5 + Vite
- Pico CSS / Tailwind / DaisyUI — mise en forme
- `svelte-dnd-action` + SortableJS — glisser-déposer des cartes
- `jwt-decode` — lecture du jeton côté client

**Infra**

- Docker + Docker Compose (3 services : `api`, `client`, `db`)

## Architecture

```
okanban/
├── api/                 API REST (Express + Sequelize)
├── client/              SPA (Svelte 5 + Vite)
├── docker-compose.yml   Orchestration des 3 conteneurs
├── .database.docker.env Variables d'environnement de la base (Docker)
└── package.json         Scripts globaux (dev, build, db:*)
```

Voir les README dédiés : [`api/README.md`](./api/README.md) · [`client/README.md`](./client/README.md)

## Démarrage rapide

### Avec Docker Compose (recommandé)

```bash
docker compose up --build
```

Les trois conteneurs démarrent :

- `okanban-database` (PostgreSQL 17) — les scripts SQL d'`api/data/` sont
  exécutés automatiquement au premier lancement
- `okanban-api` (port `3000`) — démarre après la base
- `okanban-cli` (port `4173`) — démarre après l'API

### En local (sans Docker)

```bash
# 1. Installer les dépendances (API puis client via postinstall)
npm install

# 2. Configurer les variables d'environnement
cp api/.env.example api/.env
cp client/.env.example client/.env

# 3. Préparer la base de données PostgreSQL
npm run db:create
npm run db:seed

# 4. Lancer back et front en parallèle
npm run dev
```

- API : http://localhost:3000
- Client : http://localhost:5173

## Scripts npm (racine)

| Script | Description |
|--------|-------------|
| `npm install` | Installe les dépendances de `api/` puis `client/` |
| `npm run dev` | Lance back + front en parallèle |
| `npm run dev:back` | Lance uniquement l'API |
| `npm run dev:front` | Lance uniquement le client |
| `npm run db:create` | Crée les tables PostgreSQL |
| `npm run db:seed` | Insère le jeu de données de test |
| `npm run db:reset` | Recrée + ré-injecte les données |
| `npm run build` | Build de production du client |
| `npm start` | Démarre l'API en mode production |

## Utilisateurs de test

| Username | Mot de passe | Rôle |
|----------|--------------|------|
| Alice | `Passw0rd` | admin |
| Bob | `Passw0rd` | member |

## Tests unitaires

Les tests unitaires (pattern AAA, principes FIRST) sont dans
[`api/unit-tests/`](./api/unit-tests/). Voir [`api/README.md`](./api/README.md#tests).

## Variante avec IA

Une variante du projet intégrant l'API **Mistral AI** (correction
orthographique, traduction, chat) est disponible dans un dépôt séparé :
[`okanban-mistral`](https://github.com/Nathalie-Leduc/okanban-mistral).

## Auteur

Nathalie Leduc — formation CDA, O'clock.
