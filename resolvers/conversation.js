const Conversation = require("../models/conversation");

const resolvers = {
  Query: {
    getChatMessage: async () => {
      const chats = await Conversation.getChatUser();

      console.log(chats, "<<<<")

      return chats;
    },
  },
};


module.exports = resolvers
