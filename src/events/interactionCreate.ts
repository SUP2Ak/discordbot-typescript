import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../constructor";
import client  from "../index";
import { Interaction } from "../typings";

export default new Event("interactionCreate", async (interaction: any) => {
    if (interaction.isCommand()) {
        console.log("Command interaction detected!");
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp("Command not found!");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as Interaction
        });
    }
});