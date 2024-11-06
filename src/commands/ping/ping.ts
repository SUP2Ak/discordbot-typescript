import { Command } from "../../constructor";

export default new Command({
    name: "ping",
    description: "Ping the bot",
    // options: [
    //     {
    //         name: "subcommand",
    //         description: "Subcommand",
    //         type: ApplicationCommandOptionType.Subcommand
    //     }
    // ],
    run: async ({ interaction }) => {
        interaction.followUp("Pong!");
    }
});