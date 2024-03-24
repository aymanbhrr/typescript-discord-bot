import ClientManager from "../../managers/clientManager";
import { Fg } from "../../util/functions/AnsiStylesManager";

export default async (bot: ClientManager): Promise<any> => console.info(`${Fg.makeMagneta("[DEV]")} ${Fg.makeGreen("[BOT] :")} Connected to Discord.`);
