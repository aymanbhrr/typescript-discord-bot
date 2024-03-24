import { Schema, model } from "mongoose";

interface AfkStatus {
 /**
  * The ID of the AFK user.
  */
 _id: string;
 /**
  * The ID of the guild.
  */
 guild: string;
 /**
  * The reason of the AFK.
  */
 reason?: string | null
}

export default model("afk_status", new Schema<AfkStatus>({
 _id: { type: String, required: true },
 guild: { type: String, required: true },
 reason: { type: String, default: null }
}), "afk_statuses");
