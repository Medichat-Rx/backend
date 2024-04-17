const { ObjectId } = require("mongodb");
const database = require("../config/db");
const { Hercai } = require("hercai");
const herc = new Hercai();

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

    // send the input message to AI
    const { reply } = await herc.question({ model: "v3", content: data.text });

    console.log(reply);

    const userSendMessage = await conversationCollection.updateOne(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $push: {
          message: {
            _id: new ObjectId(),
            UserId: new ObjectId(data.UserId),
            username: data.username,
            text: data.text,
            createdAt: new Date(),
          },
        },
      }
    );

    const chatBotResponse = await conversationCollection.updateOne(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $push: {
          message: {
            _id: new ObjectId(),
            username: "HercAI",
            text: reply,
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
