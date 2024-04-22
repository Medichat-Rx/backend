if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const userTypeDefs = require("./schemas/user");
const conversationTypeDefs = require("./schemas/conversation");


const userResolvers = require("./resolvers/user");
const conversationResolvers = require("./resolvers/conversation");


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const typeDefs = [userTypeDefs, conversationTypeDefs]
const resolvers = [userResolvers, conversationResolvers]
const server = new ApolloServer({
  typeDefs,
  resolvers,
  instropection: true,
});

module.exports = {
  typeDefs,
  resolvers,
  server
}