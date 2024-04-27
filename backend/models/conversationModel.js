import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("conversations", conversationSchema);
export default Conversation;
