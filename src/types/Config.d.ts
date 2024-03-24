export default interface Config {
 /**
  * The ID of this client.
  */
 client_id: string;
 /**
  * The token of this Discord bot.
  */
 _token: string;
 /**
  * The MongoBD URI for this project.
  */
 _dbKey: string;
 /**
  * The default prefix for this Discord bot.
  */
 _defaultPrefix: string;
 /**
  * The guilds for this client.
  */
 guilds: {
  /**
   * The main guild of this client.
   */
  main: string;
  /**
   * The authorized guilds by the bot.
   */
  authorized: any[];
 }
}
