import { Partials } from "discord.js";
import manager from "./managers/clientManager";

const bot = new manager({
 intents: 3276799,
 partials: [Partials.Channel, Partials.Message, Partials.User]
});

bot.setup();
export default bot;
