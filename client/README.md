# O'Kanban — Client (front-end)

Application web monopage (SPA) du projet O'Kanban, développée avec Svelte 5 et Vite.
Elle consomme l'[API REST O'Kanban](../api/README.md).

## Stack technique

- **Svelte 5** — framework de composants (runes : `$props`, `$state`, `$derived`)
- **Vite** — serveur de développement et build
- **Pico CSS**, **Tailwind CSS**, **DaisyUI** — mise en forme
- **`@lucide/svelte`** — icônes
- **SortableJS** + **svelte-dnd-action** — glisser-déposer des cartes
- **jwt-decode** — décodage du jeton JWT côté client
- **`@zerodevx/svelte-toast`** — notifications

## Architecture

```
client/
├── index.html
├── vite.config.js
├── svelte.config.js
└── src/
    ├── main.js                 Point d'entrée
    ├── App.svelte              Composant racine
    ├── assets/                 Styles globaux (app.css, reset.css)
    ├── components/
    │   ├── List.svelte         Une colonne du board
    │   ├── Card.svelte         Une carte
    │   ├── business/           Boutons d'action métier (Add/Edit/Delete + Login/Logout/Signup)
    │   └── generic/            Composants réutilisables (FormModal…)
    ├── services/               Couche d'accès à l'API (api.service.js, httpRequester.js)
    ├── stores/                 État partagé (auth.store.js, kanban.store.js)
    └── lib/                    Utilitaires (sortable.js)
```

L'état global est centralisé dans des **stores** Svelte (`auth.store`,
`kanban.store`). Les appels réseau sont regroupés dans `services/` pour isoler
la logique HTTP des composants d'affichage.

## Fonctionnalités

- Inscription, connexion, déconnexion (JWT stocké côté client)
- Affichage des listes et des cartes
- Création, édition, suppression de listes et de cartes
- Réorganisation des cartes par glisser-déposer
- Affichage conditionnel des actions d'administration (basé sur le rôle décodé dans le JWT)

## Installation

```bash
npm install
```

## Variables d'environnement

```bash
cp .env.example .env
```

Variable attendue :

```
VITE_API_URL=http://localhost:3000
```

> L'API doit être démarrée au préalable (voir [`api/README.md`](../api/README.md)).

## Scripts npm

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement Vite (port 5173) |
| `npm run build` | Build de production (dossier `dist/`) |
| `npm run preview` | Prévisualisation du build (port 4173) |

## Conteneurisation

Le fichier [`Dockerfile.client`](./Dockerfile.client) construit l'application
(`npm run build`) puis sert le résultat via `npm run preview`. Il est utilisé
par le `docker-compose.yml` à la racine.

## Auteur

Nathalie Leduc — formation CDA, O'clock.
