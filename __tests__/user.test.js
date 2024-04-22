const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");
const { default: isEmail } = require("validator/lib/isEmail.js");

it("returns all users", async () => {
  const response = await server.executeOperation({
    query: `query {
        findAllUsers {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
  });

  const users = response.body.singleResult.data?.findAllUsers;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Array));
  expect(users[0]).toEqual(expect.any(Object));
  expect(users[0]).toHaveProperty("_id");
  expect(users[0]).toHaveProperty("name");
  expect(users[0]).toHaveProperty("username");
  expect(users[0]).toHaveProperty("email");
  expect(users[0]).toHaveProperty("password");
  expect(users[0]).toHaveProperty("createdAt");
});

it("returns user by id", async () => {
  const response = await server.executeOperation({
    query: `query($id: ID!) {
        findUserById(_id: $id) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      id: "6625a31e7ebe817aaebd3b51",
    },
  });
  const users = response.body.singleResult.data?.findUserById;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
});

it("returns user by username", async () => {
  const response = await server.executeOperation({
    query: `query($username: String!) {
        findUserByUsername(username: $username) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      username: "TesterUser",
    },
  });
  const users = response.body.singleResult.data?.findUserByUsername;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
})

it("returns all chats by user id", async () => {
  const response = await server.executeOperation({
    query: `query {
      getChatMessage {
        _id
        UserId
        message {
          _id
          UserId
          username
          text
          createdAt
        }
      }
    }`,
  },
  {
    contextValue: {
      authentication: async () => {
        return {
          _id: "6625a31e7ebe817aaebd3b51",
          username: "TesterUser",
          email: "test@mail.com"
        }
      }
    }
  }
)
  const chats = response.body.singleResult.data?.getChatMessage
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(chats).toEqual(expect.any(Object));
  expect(chats).toHaveProperty("_id");
  expect(chats).toHaveProperty("UserId");
  expect(chats.message).toEqual(expect.any(Array));
  expect(chats.message[0]).toEqual(expect.any(Object));
  expect(chats.message[0]).toHaveProperty("_id");
  expect(chats.message[0]).toHaveProperty("UserId");
  expect(chats.message[0]).toHaveProperty("username");
  expect(chats.message[0]).toHaveProperty("text");
  expect(chats.message[0]).toHaveProperty("createdAt");
})

it("returns user by email", async () => {
  const response = await server.executeOperation({
    query: `query($email: String!) {
        findByEmail(email: $email) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      email: "test@mail.com",
    },
  });
  const users = response.body.singleResult.data?.findByEmail;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
})