import { PermissionsBitField } from "discord.js";
import { Command } from "../../constructor";

export default new Command({
    name: "sql",
    description: "Test the sql connection",
    // options: [
    //     {
    //         name: "subcommand",
    //         description: "Subcommand",
    //         type: ApplicationCommandOptionType.Subcommand
    //     }
    // ],
    run: async ({ interaction, client }) => {
        const member = interaction.member;
        if (!member || !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.followUp("You do not have permission to use this command!");
            return;
        }

        client.sql?.query("SELECT * FROM test", (err: Error, rows: Array<string>) => {
            if (err) throw err;
            interaction.followUp(JSON.stringify(rows));
        });
    }
});