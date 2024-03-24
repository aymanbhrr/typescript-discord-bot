import * as Discord from "discord.js";
import ClientManager from "../../managers/clientManager";

export default {
 data: new Discord.SlashCommandBuilder()
  .setName("ping")
  .setDescription("Shows the bot's and Discord API's latency."),
 cooldown: 50000,

 async run(bot: ClientManager, interaction: Discord.CommandInteraction): Promise<any> {
  await interaction.deferReply();
  const _acknowledgement = await interaction.fetchReply();

  interaction.editReply(`Pong! (\`API Latency\`: ${bot.ws.ping}ms. \`Bot Latency\`: ${_acknowledgement.createdTimestamp - interaction.createdTimestamp}ms.)`);
 }
}
