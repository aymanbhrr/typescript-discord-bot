import * as Discord from "discord.js";
import prettyMs = require("pretty-ms");
import ClientManager from "../../managers/clientManager";
import DisabledGuild from "../../util/models/client/DisabledGuild";
import DisabledUser from "../../util/models/client/DisabledUser";

export default async (bot: ClientManager, message: Discord.Message): Promise<any> => {
 if (message.author.bot) return;
 if (message.channel.type === Discord.ChannelType.DM) return;

 var _prefix: string;
 _prefix = bot.config._defaultPrefix;

 if (message.content.match(new RegExp(`^<@!?${bot.user?.id}>( |)$`)))
  return message.reply({ content: `My prefix is ${_prefix}`, allowedMentions: { repliedUser: false } });
 if (message.content.trim().startsWith(_prefix)) {
  const args = message.content.slice(_prefix.length).trim().split(/ +/);
  const commandIdentification = args.shift()?.toLowerCase();
  const command = bot._commands.get(commandIdentification) || bot._commands.find(command => command.aliases.includes(commandIdentification));

  if (command) {
   if (message.channel.type !== Discord.ChannelType.GuildText) return;
   if (command.dev && message.author.id !== bot.developer?.id) return message.delete();
   if (await DisabledGuild.findOne({ guild: message.guild?.id }) || await DisabledUser.findOne({ user: message.author.id })) return;
   if (!message.channel.nsfw && command.isNsfw) return message.delete();
   const cooldown = bot.collections.cooldowns.command;
   const identifier = `${command.name}-${message.author.id}-${message.guild?.id}`;

   if (cooldown.has(identifier) && command.cooldown > 0)
    return message.reply({
      content: `Please wait \`${prettyMs(cooldown.get(identifier) - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\` before using this command again.`,
      allowedMentions: { repliedUser: false }
    }).then(msg => setTimeout(() => { message.delete().catch(() => {}); msg.delete().catch(() => {}); }, 3000));

   try {
    await command.run(bot, message, args);
   } catch (error) {
    console.error(error);
    return message.reply({ content: "There was an error while executing this command.", allowedMentions: { repliedUser: false } })
     .then(msg => setTimeout(() => { message.delete().catch(() => {}); msg.delete().catch(() => {}); }, 3000));
   }

   if (command.cooldown > 0 && message.author.id !== bot.developer?.id) {
    cooldown.set(identifier, Date.now() + command.cooldown);
    const slashCommand = bot._applicationCommands.get(command.name);
    if (command.cooldown === slashCommand?.cooldown) bot.collections.cooldowns.slashCommand.set(identifier, Date.now() + slashCommand.cooldown);
   }
  }
 }
}
