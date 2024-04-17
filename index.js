if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schemas/user");
const conversationTypeDefs = require("./schemas/conversation");

const userResolvers = require("./resolvers/user");
const conversationResolvers = require("./resolvers/conversation");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [userTypeDefs, conversationTypeDefs],
  resolvers: [userResolvers, conversationResolvers],
  instropection: true,
});

const { url } = startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
