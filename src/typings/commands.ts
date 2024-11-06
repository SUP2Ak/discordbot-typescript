import {
    ApplicationCommandDataResolvable,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from "discord.js";
import { Client } from "@/constructor";

export interface Interaction extends CommandInteraction {
    member: GuildMember;
}

export interface RegisterCommandsOptions {
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: (options: { client: Client, interaction: Interaction, args: CommandInteractionOptionResolver }) => any;
} & ChatInputApplicationCommandData;