const Conversation = require("./conversation");
const User = require("./user");
const UserConversation = require("./userConversation")
const Message = require("./message");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

Conversation.belongsToMany(User, {through: UserConversation, as: "users"})
User.belongsToMany(Conversation, {through: UserConversation})
UserConversation.belongsTo(Message, {as: "lastMessageRead"})

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation
};
