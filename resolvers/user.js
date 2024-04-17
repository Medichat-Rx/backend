const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const Conversation = require("../models/conversation");

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

const resolvers = {
  Query: {
    findAllUsers: async () => {
      const users = await User.findAll();
      return users;
    },

    findUserByUsername: async (_, args) => {
      const findUser = await User.findByUsername(args.username);
      return findUser;
    },

    findUserById: async (_, args) => {
      const { _id } = args;
      const user = await User.findById(_id);
      return user;
    },
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = args.newUser;
      // console.log(newUser.username, "<<<<<")
      const result = await User.createUser(newUser);

      /// create conversation upon register
      const createConversation = await Conversation.createConversation(result._id)
      // console.log(createConversation, "<<<<");
      return result;
    },

    login: async (_, args) => {
      const { email, password } = args;
      const user = await User.findByEmail(email);
      if (!user) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const access_token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      return {
        access_token,
        email,
      };
    },
  },
};

module.exports = resolvers;
