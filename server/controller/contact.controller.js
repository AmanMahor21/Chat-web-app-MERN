const Conversation = require("../model/conversation.model");
var User = require("../model/user.model");

const contactController = async (req, res) => {
  try {
    const senderID = req.user._id;
    // console.log(senderID, "senderId ");
    // const allUsers = user.where(_id).ne(senderID);
    const allUsers = await User.find({ _id: { $ne: senderID } }).select(
      "-password"
    );
    const usersWithLastMessage = await Promise.all(
      allUsers.map(async (user) => {
        // Find the most recent conversation involving the current user and sender
        const recentConversation = await Conversation.findOne({
          participants: { $all: [senderID, user._id] },
        }).select("lastMessage");

        return {
          ...user.toObject(),
          lastMessageDay: recentConversation?.lastMessage?.timestamp || null,
          content: recentConversation?.lastMessage?.content || null,
        };
      })
    );
    // .populate({ path: "last  Messages" });
    console.log(usersWithLastMessage, "i m from controller");
    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.log("Error in contactController controller", error);
    res.status(500).json({ error, message: "Internal Server Error" });
  }
};

module.exports = contactController;
