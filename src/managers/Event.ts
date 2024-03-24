import ClientManager from "./clientManager";
import { readdir } from "fs/promises";
import { join } from "path";

export default class {
 private client: ClientManager;
 private dir: string;

 constructor(client: ClientManager) {
  this.client = client;
  this.dir = join(__dirname, "../events");
 }

 public async initClientEvents(): Promise<void> {
  const dir = "client";
  try {
   const files = (await readdir(`${this.dir}\\${dir}\\`)).filter(n => n.endsWith(".js") || n.endsWith(".ts"));
   files.forEach(f => {
    const event = require(`../events/${dir}/${f}`).default;
    const name = f.split(".")[0];
    this.client.on(name, async (...args: any[]) => await event(this.client, ...args));
   })
  } catch (error) {
   throw error;
  }
 }

 public async initDbConnectionEvents(): Promise<void> {
  const dir = "db";
  try {
   const files = (await readdir(`${this.dir}\\${dir}\\`)).filter(n => n.endsWith(".js") || n.endsWith(".ts"));
   files.forEach(f => {
    const event = require(`../events/${dir}/${f}`).default;
    const name = f.split(".")[0];
    this.client.db.connection.on(name, async (...args: any[]) => await event(this.client, ...args));
   })
  } catch (error) {
   throw error;
  }
 }

 public async initDbWatchEvents(): Promise<void> {
  const dir = "db\\watch";
  try {
   const files = (await readdir(`${this.dir}\\${dir}\\`)).filter(n => n.endsWith(".js") || n.endsWith(".ts"));
   files.forEach(f => {
    const event = require(`../events/${dir}/${f}`).default;
    const name = f.split(".")[0];
    this.client.db.connection.watch().on(name, async (...args: any[]) => await event(this.client, ...args));
   });
  } catch (error) {
   throw error;
  }
 }

 public async All(): Promise<void> {
  await this.initDbConnectionEvents();
  await this.initDbWatchEvents();
  await this.initClientEvents();
 }
}
