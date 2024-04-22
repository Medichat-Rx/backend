
const { GraphQLError } = require("graphql");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { server } = require("./index.js");
const jwt = require("jsonwebtoken");

(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },context: async ({ req, res }) => {
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
      }
    });
  
    console.log(`🚀  Server ready at: ${url}`);
  })();