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
};

module.exports = resolvers;
