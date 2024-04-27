import Message from "../models/messageMode.js";
import Conversation from "../models/conversationModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    console.log(req.user)
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save()

    //also add socketio functionality

    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()])

    return res.status(201).json({
      status: "success",
      msg: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      error: err.message,
      msg: "Internal Server Error",
    });
  }
};

export const getMessages = async(req,res)=>{
  try{

    const {id:userToChatId} = req.params
    const senderId = req.user;

    const conversation = await Conversation.findOne({
      participants :{ $all:[senderId,userToChatId]}
    }).populate("messages") //not a reference but actual message


    if(!conversation)
    {
      return res.status(200).json([])
    }

    const messages = conversation.messages

    res.status(200).json({
      status:'success',
      data: messages
    })



  }catch(err)
  {
    console.log(err)
    return res.status(500).json({msg:"Internal server error"})
  }
}