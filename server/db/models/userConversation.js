const Sequelize = require("sequelize");
const db = require("../db");

const UserConversation = db.define("user_conversation", {});

module.exports = UserConversation;
