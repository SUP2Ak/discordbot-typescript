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
        client.sql?.query('SELECT * FROM test', (err: Error, rows: Array<string>) => {
            if (err) throw err;
            interaction.followUp(JSON.stringify(rows));
        });
    }
});