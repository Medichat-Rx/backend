const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");

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
  console.log(response.body.singleResult);
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
  console.log(response.body.singleResult);
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
})