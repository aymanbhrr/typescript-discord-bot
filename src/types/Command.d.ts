export default interface Command {
 /**
  * The name of the command.
  */
 name: string;
 /**
  * The aliases of the command.
  */
 aliases?: [] | undefined;
 /**
  * The description of the command.
  */
 description?: string | null;
 /**
  * The usage of the command.
  */
 usage?: string | undefined;
 /**
  * Whether or not the command is a NSFW command.
  */
 isNsfw?: boolean | false;
 /**
  * Whether or not the command is developer-only.
  */
 dev?: boolean | false;
 /**
  * The cooldown of the command.
  */
 cooldown?: number | null;
 /**
  * Whether or not disable this command.
  */
 disabled?: boolean | false;
 /**
  * The run method of this command.
  */
 run: typeof function;
}
