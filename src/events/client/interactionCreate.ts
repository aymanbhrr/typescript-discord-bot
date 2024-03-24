import * as Discord from "discord.js";
import prettyMs = require("pretty-ms");
import ClientManager from "../../managers/clientManager";
import DisabledGuild from "../../util/models/client/DisabledGuild";
import DisabledUser from "../../util/models/client/DisabledUser";

export default async (bot: ClientManager, interaction: Discord.Interaction): Promise<any> => {
 var slashCommand: any;
 var identifier: string;

 const slashCommandCooldown = bot.collections.cooldowns.slashCommand;
 const commandCooldown = bot.collections.cooldowns.command;

 //Slash Commands Handler
 if (interaction.isChatInputCommand()) {
  slashCommand = bot._applicationCommands.get(interaction.commandName);
  if (await DisabledGuild.findOne({ guild: interaction.guild?.id }) || await DisabledUser.findOne({ user: interaction.user.id })) return;
  if (slashCommand.dev && interaction.user.id !== bot.developer?.id)
   return interaction.reply({ content: "Unauthorized access.", ephemeral: true });

  if (typeof slashCommand.cooldown === "number" && slashCommand.cooldown > 0) {
   identifier = `${interaction.commandName}-${interaction.user.id}-${interaction.guild?.id}`;
   if (slashCommandCooldown.has(identifier))
    return interaction.reply({ content: `Please wait \`${prettyMs(slashCommandCooldown.get(identifier) - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\` before using this command again.`, ephemeral: true });
   if (interaction.user.id !== bot.developer?.id) {
    slashCommandCooldown.set(identifier, Date.now() + slashCommand.cooldown);
    const command = bot._commands.get(interaction.commandName);
    if (slashCommand.cooldown === command?.cooldown) commandCooldown.set(identifier, Date.now() + command.cooldown);
   }

   setTimeout(() => { slashCommandCooldown.delete(identifier); commandCooldown.delete(identifier); }, slashCommand.cooldown);
  }

  try {
   await slashCommand.run(bot, interaction);
  } catch (error) {
   console.error(error);
   await interaction[interaction.replied || interaction.deferred ? "followUp" : "reply"]({ content: "There was en error while executing this command.", ephemeral: true });
  }
 } else if (interaction.isAutocomplete()) { //Autocomplete handler
  slashCommand = bot._applicationCommands.get(interaction.commandName);
  identifier = `${interaction.commandName}-${interaction.user.id}-${interaction.guild?.id}`;

  if (slashCommand && !slashCommandCooldown.has(identifier) && !commandCooldown.has(identifier)) {
   if (await DisabledGuild.findOne({ guild: interaction.guild?.id }) || await DisabledUser.findOne({ user: interaction.user.id })) return;

   try {
    await slashCommand?.autoComplete(bot, interaction);
   } catch (error) {
    console.error(error);
   }
  }
 } else if (interaction.isMessageComponent()) { //Component handler
  const component = bot._components.get(interaction.customId);

  if (component) {
   if (await DisabledGuild.findOne({ guild: interaction.guild?.id }) || await DisabledUser.findOne({ user: interaction.user.id })) return;
   
   const cooldown = bot.collections.cooldowns.component;
   const identifier = `${interaction.customId}-${interaction.message.id}-${interaction.guild?.id}-${interaction.user.id}`;
   if (cooldown.has(identifier))
    return interaction.reply({ content: `Please wait \`${prettyMs(cooldown.get(identifier) - Date.now(), { verbose: true })}\` before using this interaction again.`, ephemeral: true });

   try {
    await component.execute(bot, interaction);
   } catch (error) {
    console.error(error);
    return await interaction[interaction.replied || interaction.deferred ? "followUp" : "reply"]({ content: "There was an error while executing this interaction.", ephemeral: true });
   }

   if (component.cooldown > 0 && interaction.user.id !== bot.developer?.id) {
    cooldown.set(identifier, Date.now() + component.cooldown);
    setTimeout(() => cooldown.delete(identifier), component.cooldown);
   }
  }
 }
}
