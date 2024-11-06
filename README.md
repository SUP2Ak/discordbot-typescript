# discordbot-typescript

## Description
A Discord bot template built with TypeScript and MySQL. This template provides a basic structure for creating a Discord bot with command handling and MySQL integration.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/discordbot-typescript.git
   cd discordbot-typescript
   ```

2. **Install dependencies using pnpm:**
   ```bash
   pnpm install
   ```

3. **Create a `.env` file:**
   Create a `.env` file in the root directory and add your environment variables:
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

4. **Build the project:**
   Once the project is finished, run:
   ```bash
   pnpm build
   ```

5. **Run the bot in production mode:**
   To start the bot in production mode (the bot must be built first), use:
   ```bash
   pnpm start:prod
   ```

6. **Run the bot in development mode:**
   For development, you can use:
   ```bash
   pnpm start:dev
   ```

## Slash Commands
- `/ping`: Responds with "Pong!".
- `/sql`: Tests the SQL connection.

## Documentation
- [discord.js Documentation (v14.16.3)](https://discord.js.org/docs/packages/discord.js/14.16.3)
- [mysql2 Documentation](https://sidorares.github.io/node-mysql2/docs/documentation)

## Contributing
Feel free to submit issues or pull requests to improve this project.

## License
This project is licensed under the GNU GPLv3 License.