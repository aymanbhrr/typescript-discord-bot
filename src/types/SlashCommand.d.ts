import { SlashCommandBuilder } from "discord.js"

export default interface SlashCommand {
 /**
  * The slash command data.
  */
 data: SlashCommandBuilder;
 /**
  * Whether or not the command is developer-only.
  */
 dev?: boolean | undefined;
 /**
  * The cooldown of the command.
  */
 cooldown?: number | null | undefined;
 /**
  * Whether or not disable the command.
  */
 disabled?: boolean | undefined;
 /**
  * The run method of the command.
  */
 run: typeof function;
}
