const typeDefs = `#graphql
type Conversation {
    _id: ID
    UserId: ID
    message: [Message]
}

type Message {
    _id: ID 
    UserId: ID
    text: String
    createdAt: String
}

# input newMessage {
    
# }


type Query {
    getChatMessage: Conversation
}
`;

module.exports = typeDefs
