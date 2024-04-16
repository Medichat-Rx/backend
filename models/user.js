const database = require("../config/db");

class User {
  static collection() {
    return database.collection("users");
  }

  static async findAll() {
    const userCollection = this.collection();

    const data = await userCollection.find().toArray();
    return data;
  }
}

module.exports = User;
