import clientManager from "../../managers/clientManager";
import { readdir } from "fs/promises";
import { makeItalicAndBold, Fg, Bg } from "../functions/AnsiStylesManager";
import { join } from "path";

export default async function (client: clientManager): Promise<any> {
 const parentDirName = "appCommands";
 const dirPath = join(__dirname, `../../${parentDirName}`);

 try {
  const dirs = await readdir(`${dirPath}\\`);
  if (dirs.length <= 0)
   return console.warn(`${Bg.makeYellow("WARNING")} : No sub-folders were detected in the ${Fg.makeYellow(makeItalicAndBold(parentDirName))} directory.\n${makeItalicAndBold(`Path : ${dirPath}`)}`);

  await Promise.all(dirs.map(async dir => {
   const files = (await readdir(`${dirPath}\\${dir}\\`)).filter(n => n.endsWith(".js") || n.endsWith(".ts"));
   if (files.length <= 0)
    return console.warn(`${Bg.makeYellow("WARNING")} : No commands were detected in the ${Fg.makeYellow(makeItalicAndBold(dir))} sub-folder.\n${makeItalicAndBold(`Path : ${dirPath}\\${dir}`)}`);

   await Promise.all(files.map(async file => {
    const command = require(`../../${parentDirName}/${dir}/${file}`).default;

    if (typeof command.data === "undefined")
     throw new ReferenceError(`Missing "data" property for the ${makeItalicAndBold(file)} (/) command.\n${makeItalicAndBold(`Path : ${dirPath}\\${dir}\\${file}`)}`);
    if (!command.data.name)
     throw new ReferenceError(`Missing command name for the ${makeItalicAndBold(file)} (/) command.\n${makeItalicAndBold(`Path : ${dirPath}\\${dir}\\${file}`)}`);
    if (typeof command.data.description !== "string") command.data.description = "No description.";
    if (typeof command.data.nsfw !== "boolean") command.data.setNSFW(false);
    if (typeof command.data.dm_permission !== "boolean") command.data.setDMPermission(false);

    if (typeof command.dev !== "boolean") command.dev = false;
    if (typeof command.cooldown !== "number") command.cooldown = 0;
    if (typeof command.disabled !== "boolean") command.disabled = false;
    if (typeof command.run !== "function")
     throw new ReferenceError(`Missing \`run\` method at ${makeItalicAndBold(file)}.\n${makeItalicAndBold(`Path : ${dirPath}\\${dir}\\${file}`)}`);

    command.fileName = file;
    command.category = dir;

    if (!command.disabled) client._applicationCommands.set(command.data.name, command);
    else console.warn(`${Bg.makeYellow("WARNING")} : The ${Fg.makeYellow(makeItalicAndBold(file))} (/) command is ${Fg.makeRed("disabled")}.`);
   }));
  }));
 } catch (error) {
  console.error(error);
  return client._applicationCommands;
 }
}
