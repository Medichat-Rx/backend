const { ObjectId } = require("mongodb");
const database = require("../config/db");

class Conversation {
  static collection() {
    return database.collection("conversations");
  }

  static async getChatUser(_id) {
    const conversationCollection = this.collection();

    const data = await conversationCollection.findOne({
      UserId: new ObjectId(_id),
    });

    return data;
  }
}

module.exports = Conversation;
