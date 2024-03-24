import * as Discord from "discord.js";
import mongoose from "mongoose";
import * as config from "../../data/json/__config.json";
import EventManager from "./Event";
import collections from "../util/collections";
import appCommandsManager from "./applicationCommandsManager";
import loadCommands from "../util/handlers/commands";

//Types
import Config from "../types/Config";

export default class extends Discord.Client {
 config: Config;
 db: mongoose.Mongoose;
 collections: { _commands: typeof Discord.Collection.prototype, _applicationCommands: typeof Discord.Collection.prototype, _components: typeof Discord.Collection.prototype, cooldowns: { slashCommand: typeof Discord.Collection.prototype, command: typeof Discord.Collection.prototype, modmail: typeof Discord.Collection.prototype, component: typeof Discord.Collection.prototype }, modmailTicketProcess: typeof Discord.Collection.prototype, verificationProcess: typeof Discord.Collection.prototype }
 _applicationCommands: typeof Discord.Collection.prototype;
 _commands: typeof Discord.Collection.prototype;
 _components: typeof Discord.Collection.prototype;
 developer: Discord.User | undefined | null;

 constructor(options: Discord.ClientOptions) {
  super(options);
  this.config = config;
  this.db = mongoose;
  this.collections = collections;
  this._applicationCommands = this.collections._applicationCommands;
  this._commands = this.collections._commands;
  this._components = this.collections._components;
 }

 async setup(): Promise<void> {
  await new EventManager(this).All();

  await this.db.connect(this.config._dbKey);
  await this.login(this.config._token);
  await new appCommandsManager(this).register({ deployment: "guild" });
  await loadCommands(this);

  const owner = (await this.application?.fetch())?.owner;
  if (owner instanceof Discord.Team) this.developer = owner.owner?.user;
  else this.developer = owner;
 }
}
