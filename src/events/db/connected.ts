import ClientManager from "../../managers/clientManager";
import { Fg } from "../../util/functions/AnsiStylesManager";

export default async (bot: ClientManager) => {
 console.log(`${Fg.makeMagneta("[DEV]")} ${Fg.makeGreen("[DATABASE] :")} Connected.`)
}
