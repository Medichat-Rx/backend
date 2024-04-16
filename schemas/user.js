
const typeDefs = `#graphql
  type User {
      _id: ID
      name: String
      username: String
      email: String
      password: String
      createdAt: String
  }

  type LoginUser {
    access_token: String
    email: String
  }

  

  type Query {
    findAllUsers: [User]
  }

  type Mutation{
    login(email: String!, password: String!): LoginUser
  }
`;

module.exports = typeDefs;
