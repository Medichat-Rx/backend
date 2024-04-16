const Users = [
  {
    _id: 1,
    name: "raihan",
    username: "raihank43",
    email: "raihank43@mail.com",
    password: "password",
    createdAt: new Date(),
  },
  {
    _id: 2,
    name: "Anon",
    username: "Anon01",
    email: "anon@mail.com",
    password: "password",
    createdAt: new Date(),
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    findAllUsers: () => {
      return Users;
    },
  },
};

module.exports = resolvers;
