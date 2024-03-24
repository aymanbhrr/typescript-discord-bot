import * as Discord from "discord.js";
import ClientManager from "../../managers/clientManager";

export default {
 name: "ping",
 aliases: ["latency"],
 description: "Shows the bot's and Discord API's latency.",
 cooldown: 50000,

 async run(bot: ClientManager, message: Discord.Message): Promise<any> {
  const m = await message.channel.send("Calculating...");
  m.edit(`Pong! (\`API Latency\`: ${bot.ws.ping}ms. \`Bot Latency\`: ${m.createdTimestamp - message.createdTimestamp}ms.)`);
 }
}
