import {
    ApplicationCommandDataResolvable,
    Client as DiscordClient,
    ClientEvents,
    Collection,
} from "discord.js";
import { RegisterCommandsOptions, CommandType } from "@/typings";
import { glob } from "glob";
import path from "path";

let mysql: any;
async function initMySQL() {
    mysql = await import('mysql2');
    const { Pool, PoolOptions } = mysql as typeof mysql;
    return mysql.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        database: process.env.SQL_DATABASE,
        password: process.env.SQL_PASSWORD,
        port: parseInt(process.env.SQL_PORT || '3306'),
    } as typeof PoolOptions) as typeof Pool;
}

/**
 * @extends ClientEvents
 */
export class Event<K extends keyof ClientEvents> {
    constructor(public name: K, public run: (...args: ClientEvents[K]) => any) { };
};

/**
 * @extends ApplicationCommandDataResolvable
 */
export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}

/**
 * @extends DiscordClient
 */
export class Client extends DiscordClient {
    public commands: Collection<string, CommandType> = new Collection();
    public sql: any;

    constructor() {
        super({ intents: 1 });
        // console.log('Client created!');
    };

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_TOKEN).then(async () => {
            if (process.env.USE_SQL !== 'true') return;
            this.sql = await initMySQL();
            this.sql?.query('SELECT DATABASE()', (err: Error, rows: Array<{ 'DATABASE()': string }>) => {
                if (err) throw err;
                console.log(rows, 'MySQL initialized!');
            });
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    };

    /**
     * Import a file
     * @param {string} filePath - The path to the file
     * @returns {Promise<any>} The imported file
     */
    async importFile(filePath: string) {
        // console.log(filePath, 'relative path');
        const fullPath = `.\\${filePath}`; //path.join(__dirname, filePath); // Construit le chemin complet
        // console.log(`Trying to import file: ${fullPath}`);
        return (await import(fullPath))?.default;
    }

    /**
     * Register commands to the bot
     * @param {ApplicationCommandDataResolvable[]} commands - The commands to register
     * @param {string} [guildId] - The guild ID to register the commands to
     */
    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        // console.log('Registering commands...');
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registered ${commands.length} commands to the guild ${guildId}.`);
        } else {
            this.application?.commands.set(commands);
            console.log(`Registered ${commands.length} commands to the global command registry.`);
        };
    };

    // Register Modules
    async registerModules() {
        // Register Slash Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        // console.log('Registering commands...');
        const commandFiles = await glob(`${__dirname}/commands/*/*{.ts,.js}`) as string[];
        // console.log(commandFiles)
        commandFiles.map(async (filePath: string) => {
            const command = await this.importFile(path.relative(__dirname, filePath)); // Utilisez le chemin relatif
            if (!command.name) {
                console.warn(`This command has no name: ${filePath}!`);
            } else {
                // console.log(`Command: ${command.name} was successfully imported.`);
                this.commands.set(command.name, command);
                slashCommands.push(command);
            }
        });

        // Register commands on ready
        this.on("ready", () => {
            // console.log('Bot is ready!');
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.DISCORD_GUILD_ID
            });
            // console.log('Commands registered!');
        });

        // Register events
        const eventFiles = await glob(`${__dirname}/events/**/*.{ts,js}`) as string[];
        eventFiles.map(async (filePath: string) => {
            const event: Event<keyof ClientEvents> = await this.importFile(path.relative(__dirname, filePath));
            if (!event.name || typeof event.run !== 'function') {
                console.warn(`${!event.name ? 'This event has no name' : 'This event has no run function, type was ['} ${typeof event.run}] in ${filePath}!`);
            } else {
                // console.log(`Event: ${event.name} was successfully imported.`);
                this.on(event.name, event.run);
            };
        });
    };
};