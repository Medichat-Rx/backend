const database = require("../config/db");
const validator = require("validator");
const { GraphQLError } = require("graphql");
const bcryptjs = require("bcryptjs");

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

}

module.exports = User;
