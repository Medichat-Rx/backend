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

  static async createConversation(_id) {
    const conversationCollection = this.collection();
    const createConversation = await conversationCollection.insertOne({
      UserId: new ObjectId(_id),
      message: [],
    });
    return createConversation;
  }

  static async sendMessage(data) {
    const conversationCollection = this.collection();

    const result = await conversationCollection.updateOne(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $push: {
          message: {
            UserId: new ObjectId(data.UserId),
            text: data.text,
            createdAt: new Date(),
          },
        },
      }
    );

    const updatedConversationWithNewMessage = await this.getChatUser(
      data.UserId
    );

    return updatedConversationWithNewMessage;
  }
}

module.exports = Conversation;
