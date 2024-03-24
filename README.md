# TypeScript Discord Bot

<img src="https://cdn.discordapp.com/attachments/827545205611036692/1221486798987858021/ts-bot.png?ex=6612c13b&is=66004c3b&hm=2114a007fd324b19b75476f2ea0ae66de0d3507886e2756413583049c34b8f7c&" width="800" height="">

A fully functional discord.js TypeScript bot template, with Slash & Regular text commands and events handlers.

# Getting Started
Before doing anything else, it is important to complete this step before, and it is the `__config.json` file creation.
To begin, create a folder called `data` in your root directory, inside that `data` folder, create another folder called `json`, inside it, create the `__config.json` file, and finally put inside it these informations:
```json
{
 "client_id": "YOUR_CLIENT_ID",
 "_token": "YOUR_BOT_TOKEN_ID",
 "_dbKey": "YOUR_MONGODB_KEY",
 "_defaultPrefix": ">>",
 "guilds": {
  "main": "YOUR_MAIN_GUILD_ID",
  "authorized": []
 }
}
```

## Dependencies Installation
```json
{
 "dependencies": {
 "discord.js": "^14.14.1",
 "fs": "^0.0.1-security",
 "mongoose": "^8.2.3",
 "pretty-ms": "^7.0.1"
 }
}
```
To install these libraries run in your terminal the following command:
```bash
npm install
```
You also need to install development dependencies:
```json
{
 "devDependencies": {
 "@types/node": "^20.11.30",
 "tsx": "^4.7.1"
 }
}
```
To do so, run the following command:
```bash
npm install -D tsx @types/node
```
***Globally*** install TypeScript:
```bash
npm install -g typescript
```
## Running TypeScript Code
To run your TypeScript code, it is required to run the `tsx watch src/index.ts` command, whom alias is `npm run dev`.
```bash
npm run dev
```
However, it is not recommended to run your TypeScript code primarily due to performance issues. You will have to compile the TypeScript files to JavaScript files, in an automatically created `dist` folder.

- To compile the TypeScript files to Javascript files, run the following command:
  ```bash
  npm run build
  ```
- And finally, to run your compiled JavaScript files, run the follow command:
  ```bash
  npm run start
  ```
  or `node .`
