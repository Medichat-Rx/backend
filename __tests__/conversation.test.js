const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");

it("returns all chats by user id", async () => {
    const response = await server.executeOperation({
      query: `query {
        getChatMessage {
          _id
          UserId
          message {
            _id
            UserId
            username
            text
            createdAt
          }
        }
      }`,
    },
    {
      contextValue: {
        authentication: async () => {
          return {
            _id: "6625a31e7ebe817aaebd3b51",
            username: "TesterUser",
            email: "test@mail.com"
          }
        }
      }
    }
  )
    const chats = response.body.singleResult.data?.getChatMessage
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(chats).toEqual(expect.any(Object));
    expect(chats).toHaveProperty("_id");
    expect(chats).toHaveProperty("UserId");
    expect(chats.message).toEqual(expect.any(Array));
    expect(chats.message[0]).toEqual(expect.any(Object));
    expect(chats.message[0]).toHaveProperty("_id");
    expect(chats.message[0]).toHaveProperty("UserId");
    expect(chats.message[0]).toHaveProperty("username");
    expect(chats.message[0]).toHaveProperty("text");
    expect(chats.message[0]).toHaveProperty("createdAt");
  })

it("send message", async () => {
    const response = await server.executeOperation({
        query:
            "mutation SendMessage($newMessage: NewMessage) { sendMessage(newMessage: $newMessage) { UserId,_id,message {UserId,_id,createdAt,text,username} } }",
        variables: { newMessage: {text:'hello'} }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                  _id: "6625a31e7ebe817aaebd3b51",
                  username: "TesterUser",
                  email: "test@mail.com"
                }
              }
        }
    });

    
    const sendMessage = response.body.singleResult.data?.sendMessage;
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(sendMessage).toEqual(expect.any(Object));
    expect(sendMessage).toHaveProperty("UserId");
    expect(sendMessage).toHaveProperty("_id");
    expect(sendMessage).toHaveProperty("message");
},10000);

it("send message", async () => {
  const response = await server.executeOperation({
      query:
          "mutation SendMessage($newMessage: NewMessage) { sendMessage(newMessage: $newMessage) { UserId,_id,message {UserId,_id,createdAt,text,username} } }",
      variables: { newMessage: {text:''} }
  }, {
      contextValue: {
          authentication: async () => {
              return {
                _id: "6625a31e7ebe817aaebd3b51",
                username: "TesterUser",
                email: "test@mail.com"
              }
            }
      }
  });

  
  const errors = response.body.singleResult.errors[0]
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Tolong masukkan pesan");

},10000);