import { Schema, model, InferSchemaType, } from "mongoose"

const schema = new Schema({
 _id: { type: String, required: true },
 data: new Schema({
  _customPrefix: { type: String, default: null },
  _disabledCommands: {
   slash: { type: Array, default: [] },
   regular: { type: Array, default: [] }
  },
  _modmail: {
   _enabled: { type: Boolean, default: false },
   channels: {
    user_reports: { type: String, default: null },
    staff_reports: { type: String, default: null },
    suggestions: { type: String, default: null },
    role_requests: { type: String, default: null },
    appeals: { type: String, default: null },
    bot_suggestions: { type: String, default: null },
    bug_reports: { type: String, default: null },
    discussion_tickets: { type: String, default: null },
    discussion_tickets_category: { type: String, default: null },
    other: { type: String, default: null }
   }
  },
  _moderation: {
   _banAppealUrl: { type: String, default: null },
   _auto: {
    word_filter: { _enabled: { type: Boolean, default: false }, whitelisted_channels: { type: Array, default: [] } },
    links_detector: { _enabled: { type: Boolean, default: false }, whitelisted_channels: { type: Array, default: [] } },
   }
  },
  _verification: {
   _enabled: { type: Boolean, default: false },
   channel: { type: String, default: null },
   verified_role: { type: String, default: null },
   unverified_role: { type: String, default: null }
  }
 }, { _id: false })
});

type Config = InferSchemaType<typeof schema>;
export default model("guild_configuration", schema, "guild_configurations");
