# discordbot-typescript

## Description

Un modèle de bot Discord construit avec TypeScript et MySQL. Ce modèle fournit une structure de base pour créer un bot Discord avec gestion des commandes et intégration MySQL.

## Installation

Pour commencer avec ce projet, suivez ces étapes :

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/votre_nom_utilisateur/discordbot-typescript.git
   cd discordbot-typescript
   ```
2. **Installez les dépendances avec pnpm :**

   ```bash
   pnpm install
   ```
3. **Créez un fichier `.env` :**
   Créez un fichier `.env` dans le répertoire racine et ajoutez vos variables d'environnement :

   ```
   USE_SQL=true
   DISCORD_GUILD_ID=your_discord_guild_id
   DISCORD_TOKEN=your_discord_bot_token
   SQL_HOST=your_sql_host
   SQL_USER=your_sql_user
   SQL_PASSWORD=your_sql_password
   SQL_DATABASE=your_sql_database
   SQL_PORT=your_sql_port
   ```
4. **Construisez le projet :**
   Une fois le projet terminé, exécutez :

   ```bash
   pnpm build
   ```
5. **Démarrez le bot en mode production :**
   Pour lancer le bot en mode production (le bot doit d'abord être construit), utilisez :

   ```bash
   pnpm start:prod
   ```
6. **Démarrez le bot en mode développement :**
   Pour le développement, vous pouvez utiliser :

   ```bash
   pnpm start:dev
   ```

## Commandes Slash

- `/ping`: Répond avec "Pong!".
- `/sql`: Teste la connexion SQL.

## Documentation

- [Documentation de discord.js (v14.16.3)](https://discord.js.org/docs/packages/discord.js/14.16.3)
- [Documentation de mysql2](https://sidorares.github.io/node-mysql2/docs/documentation)

## Contribuer

N'hésitez pas à soumettre des problèmes ou des demandes de tirage pour améliorer ce projet.

## Licence

Ce projet est sous licence GNU GPLv3.
