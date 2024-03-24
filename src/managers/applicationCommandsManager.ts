import { REST, Routes } from "discord.js";
import { Fg } from "../util/functions/AnsiStylesManager";
import ClientManager from "./clientManager";
import loadCommands from "../util/handlers/appCommands";

export default class {
 private client: ClientManager;
 private rest: typeof REST.prototype;

 constructor(client: ClientManager) {
  this.client = client;
  this.rest = new REST().setToken(this.client.config._token);
  if (!this.client) throw new ReferenceError('Missing Discord client.');
 }

 public async register(options: { deployment: "guild" | "global" }): Promise<void> {
  if (typeof options.deployment !== "string")
   throw new RangeError(`Expected a string for the deployment type but "${typeof options.deployment}" was given instead.`);
  await loadCommands(this.client);

  var data: any;
  try {
   if (options.deployment === "guild")
    data = await this.rest.put(Routes.applicationGuildCommands(this.client.config.client_id, this.client.config.guilds.main), { body: this.client._applicationCommands.map(c => c.data) });
   else if (options.deployment === "global")
    data = await this.rest.put(Routes.applicationCommands(this.client.config.client_id), { body: this.client._applicationCommands.map(c => c.data) });
   else throw new RangeError('Invalid deployment type. Expected "guild" or "global".');

   console.info(`${Fg.makeMagneta("[SLASH] :")} Registered ${Fg.makeYellow(data.length)} ${options.deployment}-based (/) commands.`);
  } catch (error) {
   throw error;
  }
 }

 public async remove(options: { deployment: "guild" | "global", commandId: string }): Promise<void> {
  if (typeof options.deployment !== "string")
   throw new RangeError(`Expected a string for the deployment type but "${typeof options.deployment}" was given instead.`);

  try {
   if (options.deployment === "guild") {
    if (options.commandId)
     await this.rest.put(Routes.applicationGuildCommand(this.client.config.client_id, this.client.config.guilds.main, options.commandId), { body: [] });
    else await this.rest.put(Routes.applicationGuildCommands(this.client.config.client_id, this.client.config.guilds.main), { body: [] });
   } else if (options.deployment === "global")
    await this.rest.put(Routes.applicationCommands(this.client.config.client_id), { body: [] });
   else throw new RangeError('Invalid deployment type. Expected "guild" or "global".');
  } catch (error) {
   throw error;
  }
 }
}
