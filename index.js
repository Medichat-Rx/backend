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
const server = new ApolloServer({
  typeDefs: [userTypeDefs, conversationTypeDefs, userComplaintTypeDefs],
  resolvers: [userResolvers, conversationResolvers, userComplaintResolvers],
  instropection: true,
});

const { url } = startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      authentication: async () => {
        if (!req.headers.authorization) {
          throw (
            (new GraphQLError("Access token must be provided"),
            {
              extensions: {
                code: "UNAUTHORIZED",
              },
            })
          );
        }
        const access_token = req.headers.authorization.split(" ")[1];
        if (!access_token) {
          throw (
            (new GraphQLError("Access token must be provided"),
            {
              extensions: {
                code: "UNAUTHORIZED",
              },
            })
          );
        }
        const decoded_token = jwt.verify(access_token, process.env.JWT_SECRET);
        if (!decoded_token) {
          throw (
            (new GraphQLError("Access token must be valid"),
            {
              extensions: {
                code: "UNAUTHORIZED",
              },
            })
          );
        }
        return decoded_token;
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
