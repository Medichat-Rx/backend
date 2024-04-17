const Conversation = require("../models/conversation");

const resolvers = {
  Query: {
    getChatMessage: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      console.log(decodedToken._id);
      const chats = await Conversation.getChatUser(decodedToken._id);

      // console.log(chats, "<<<<");

      return chats;
    },
  },

  Mutation: {
    sendMessage: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const UserId = decodedToken._id;
      const { text } = args.newMessage;

      const data = {
        text,
        username: decodedToken.username,
        UserId,
      };

      const result = await Conversation.sendMessage(data);

      return result;
    },
  },
};

module.exports = resolvers;
