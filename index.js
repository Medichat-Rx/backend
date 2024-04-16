if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schemas/user");

const userResolvers = require("./resolvers/user");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
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
