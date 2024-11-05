import {
    ApplicationCommandDataResolvable,
    Client as DiscordClient,
    ClientEvents,
    Collection
} from "discord.js";
import glob from "glob";

export class Event<K extends keyof ClientEvents> {
    constructor(public name: K, public run: (client: Client, ...args: ClientEvents[K]) => any) {};
};

/**
 * @extends DiscordClient
 */
export class Client extends DiscordClient {
    commands: Collection<string, ApplicationCommandDataResolvable> = new Collection();

    constructor() {
        super({ intents: 1 });
    };

    start() {
        this.login(process.env.DISCORD_TOKEN);
    };

    /**
     * Import a file
     * @param {string} filePath - The path to the file
     * @returns {Promise<any>} The imported file
     */
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    };

    /**
     * Register commands to the bot
     * @param {ApplicationCommandDataResolvable[]} commands - The commands to register
     * @param {string} [guildId] - The guild ID to register the commands to
     */
    async registerCommands({ commands, guildId }: { commands: ApplicationCommandDataResolvable[], guildId?: string }) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registered ${commands.length} commands to the guild ${guildId}.`);
        } else {
            this.application?.commands.set(commands);
            console.log(`Registered ${commands.length} commands to the global command registry.`);
        };
    };

    /**
     * Register modules to the bot
     */
    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = glob.sync(`${__dirname}/commands/**/*{.ts,.js}`);
        commandFiles.map(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name) {
                console.warn(`This command has no name: ${filePath}!`);
            } else {
                console.log(`Command: ${command.name} was successfully imported.`);
                this.commands.set(command.name, command);
                slashCommands.push(command);
            }
        });

        this.on("ready", () => {
            this.registerCommands({ 
                commands: slashCommands,
                guildId: process.env.DISCORD_GUILD_ID
            });
        });

        // Register events
        const eventFiles = glob.sync(`${__dirname}/events/**/*{.ts,.js}`);
        eventFiles.map(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            if (!event.name || typeof event.run !== 'function') {
                console.warn(`${!event.name ? 'This event has no name' : 'This event has no run function, type was ['} ${typeof event.run}] in ${filePath}!`);
            } else {
                console.log(`Event: ${event.name} was successfully imported.`);
                this.on(event.name, (...args) => event.run(this, ...args));
            };
        });
    };
};