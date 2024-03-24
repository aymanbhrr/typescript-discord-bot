import { Schema, model } from "mongoose";

interface DisabledGuild {
 /**
  * The reference ID of the disabled guild.
  */
 _id: string;
 /**
  * The ID of the guild.
  */
 guild: string;
 /**
  * The reason for disabling this guild.
  */
 reason?: string | null
}

export default model("disabled_guild", new Schema<DisabledGuild>({
 _id: { type: String, required: true },
 guild: { type: String, required: true },
 reason: { type: String, default: null }
}), "disabled_guilds")
