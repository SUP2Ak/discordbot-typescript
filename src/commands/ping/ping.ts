import { Command, CommandData } from "@constructor";

export default new Command({
    name: "ping",
    description: "Ping the bot",
    options: [
        {
            name: "subcommand",
            description: "Subcommand",
            type: CommandData.Subcommand
        }
    ],
    run: async (_, interaction) => {
        interaction.followUp("Pong!");
    }
});