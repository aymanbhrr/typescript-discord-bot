import { Schema, model } from "mongoose";

interface DisabledUser {
 /**
  * The reference ID of the disabled user.
  */
 _id: string;
 /**
  * The ID of the disabled user.
  */
 user: string;
 /**
  * The reason for disabling this user.
  */
 reason?: string | null
}

export default model("disabled_user", new Schema<DisabledUser>({
 _id: { type: String, required: true },
 user: { type: String, required: true },
 reason: { type: String, default: null }
}), "disabled_users")
