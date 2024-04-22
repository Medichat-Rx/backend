const typeDefs = `#graphql
type Conversation {
    _id: ID
    UserId: ID
    message: [Message]
}

type Message {
    _id: ID 
    UserId: ID
    username: String
    text: String
    createdAt: String
}

input NewMessage {
    text: String!
}


type Query {
    getChatMessage: Conversation
}

type Mutation {
    sendMessage(newMessage:NewMessage): Conversation
}
`;

module.exports = typeDefs;
