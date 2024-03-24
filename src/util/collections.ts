import { Collection } from "discord.js";

export default {
 _commands: new Collection(),
 _applicationCommands: new Collection(),
 _components: new Collection(),
 cooldowns: {
  slashCommand: new Collection(),
  command: new Collection(),
  modmail: new Collection(),
  component: new Collection()
 },
 modmailTicketProcess: new Collection(),
 verificationProcess: new Collection()
}
