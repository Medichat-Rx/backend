const Conversation = require("../models/conversation");

const resolvers = {
  Query: {
    getChatMessage: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      console.log(decodedToken._id);
      const chats = await Conversation.getChatUser(decodedToken._id);

      console.log(chats, "<<<<");

      return chats;
    },
  },
};

module.exports = resolvers;
