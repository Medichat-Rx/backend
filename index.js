if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const userTypeDefs = require("./schemas/user");
const conversationTypeDefs = require("./schemas/conversation");
const userComplaintTypeDefs = require("./schemas/userComplaint");


const userResolvers = require("./resolvers/user");
const conversationResolvers = require("./resolvers/conversation");
const userComplaintResolvers = require("./resolvers/userComplaint");


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const typeDefs = [userTypeDefs, conversationTypeDefs, userComplaintTypeDefs]
const resolvers = [userResolvers, conversationResolvers, userComplaintResolvers]
const server = new ApolloServer({
  typeDefs: [userTypeDefs, conversationTypeDefs, userComplaintTypeDefs],
  resolvers: [userResolvers, conversationResolvers, userComplaintResolvers],
  instropection: true,
});

module.exports = {
  typeDefs,
  resolvers,
  server
}