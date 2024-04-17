const { ObjectId } = require("mongodb");
const database = require("../config/db");

class Conversation {
  static collection() {
    return database.collection("conversations");
  }

  static async getChatUser() {
    const conversationCollection = this.collection();

    const data = await conversationCollection.findOne({
      UserId: new ObjectId("661e32db89ab5d7409672d22"),
    });

    return data;
  }
}

module.exports = Conversation;
