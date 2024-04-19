const { ObjectId } = require("mongodb");
const userComplaint = require("../models/userComplaint");

const resolvers = {
  Query: {
    getUserComplaint: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      //   console.log(decodedToken._id);
      const userComplaints = await userComplaint.findUserComplaint(
        decodedToken._id
      );
      return userComplaints;
    },
  },

  Mutation: {
    createUserComplaint: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      const data = {
        UserId: new ObjectId(decodedToken._id),
        ...args.newUserComplaint,
      };

      const res = await userComplaint.createUserComplaint(data);

      return res
    },
  },
};

module.exports = resolvers;
