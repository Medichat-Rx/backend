const typeDefs = `#graphql
type UserComplaint {
    _id: ID
    UserId: ID
    symptoms: String
    symptom_start_time: String
    medical_history: String,
    triggering_factors: String,
    general_feeling: String,
    createdAt: String,
    updatedAt: String
}

type Query {
    getUserComplaint: UserComplaint
}
`;

module.exports = typeDefs;
