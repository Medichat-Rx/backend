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

input NewUserComplaint {
    symptoms: String
    symptom_start_time: String
    medical_history: String,
    triggering_factors: String,
    general_feeling: String,
}

type Query {
    getUserComplaint: UserComplaint
}

type Mutation {
    createUserComplaint(newUserComplaint: NewUserComplaint): UserComplaint
    updateUserComplaint(updateUserComplaint: NewUserComplaint): UserComplaint
}
`;

module.exports = typeDefs;
