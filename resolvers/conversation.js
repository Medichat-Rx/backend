const Conversation = require("../models/conversation");
const UserComplaint = require("../models/userComplaint");

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

      const {
        symptoms,
        symptom_start_time,
        medical_history,
        triggering_factors,
        drug_allergies,
        general_feeling,
      } = await UserComplaint.findUserComplaint(UserId);

      const data = {
        text,
        username: decodedToken.username,
        UserId,
        symptoms,
        symptom_start_time,
        medical_history,
        triggering_factors,
        drug_allergies,
        general_feeling,
      };

      const result = await Conversation.sendMessage(data);

      return result;
    },
  },
};

module.exports = resolvers;
