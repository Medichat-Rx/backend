const database = require("../config/db");
const validator = require("validator");
const { GraphQLError } = require("graphql");
const bcryptjs = require("bcryptjs");
const { ObjectId } = require("mongodb");
class User {
  static collection() {
    return database.collection("users");
  }

  static async findAll() {
    const userCollection = this.collection();

    const data = await userCollection.find().toArray();
    return data;
  }

  static async findByEmail(email) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({ email: email });
    return data;
  }

  static async findById(_id) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({ _id: new ObjectId(_id) });
    return data;
  }

  static async findByUsername(username) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({
      username: username,
    });
    return data;
  }

  static async findCurrentLogUser(_id) {
    const userCollection = this.collection();

    const data = await userCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(_id),
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ])
      .toArray();

    return data[0];
  }

  static async createUser(newUser) {
    const userCollection = this.collection();
    const isEmailValid = validator.isEmail(newUser.email);
    const isLengthValid = validator.isLength(newUser.password, { min: 5 });
    const isEmailUniqueValid = await this.findByEmail(newUser.email);
    const isUsernameUniqueValid = await this.findByUsername(newUser.username);

    if (validator.isEmpty(newUser.username)) {
      throw new GraphQLError("Username is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (validator.isEmpty(newUser.email)) {
      throw new GraphQLError("Email is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (validator.isEmpty(newUser.password)) {
      throw new GraphQLError("Password is required", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!isEmailValid) {
      throw new GraphQLError("Invalid email format", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!isLengthValid) {
      throw new GraphQLError("Password must be at least 5 character or more", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (isEmailUniqueValid) {
      throw new GraphQLError("Email must be unique", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (isUsernameUniqueValid) {
      throw new GraphQLError("Username must be unique", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    const data = await userCollection.insertOne({
      ...newUser,
      createdAt: new Date(),
      password: bcryptjs.hashSync(newUser.password),
    });

    // console.log(data);
    const createUser = this.findById(data.insertedId);

    return createUser;
  }
}

module.exports = User;
