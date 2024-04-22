const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");
const userComplaint = require("../models/userComplaint.js");
const User = require("../models/user.js");
const { ObjectId } = require("mongodb");

const newUserComplaints = {
    drug_allergies: 'tidak ada',
    general_feeling: 'pusing',
    medical_history: 'jantung',
    symptom_start_time: 'kemarin',
    symptoms: 'pusing',
    triggering_factors: 'hutang'
}

const updateUserComplaints = {
    drug_allergies: 'udang',
    general_feeling: 'pusing',
    medical_history: 'jantung',
    symptom_start_time: 'kemarin',
    symptoms: 'pusing',
    triggering_factors: 'hutang'
}

it("failed to create user complaint user didnt input data", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: null }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong ceritakan mengenai keluhan apa yang kamu alami!");

}, 10000);

it("failed to create user complaint user didnt input symptoms", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: 'tidak ada',
            general_feeling: 'pusing',
            medical_history: 'jantung',
            symptom_start_time: 'kemarin',
            symptoms: "",
            triggering_factors: 'hutang'
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong isi gejala apa yang kamu alami!");

}, 10000);

it("failed to create user complaint user didnt input symptoms start time", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: 'tidak ada',
            general_feeling: 'pusing',
            medical_history: 'jantung',
            symptom_start_time: '',
            symptoms: "pusing",
            triggering_factors: 'hutang'
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong isi sejak kapan gejala ini mulai dirasakan!");

}, 10000);

it("failed to create user complaint user didnt input medical history", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: 'tidak ada',
            general_feeling: 'pusing',
            medical_history: '',
            symptom_start_time: 'kemarin',
            symptoms: "pusing",
            triggering_factors: 'hutang'
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong isi mengenai riwayat penyakit anda, jika tidak ada anda bisa mengisi 'Tidak ada'");

}, 10000);

it("failed to create user complaint user didnt input triggering factors", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: 'tidak ada',
            general_feeling: 'pusing',
            medical_history: 'jantung',
            symptom_start_time: 'kemarin',
            symptoms: "pusing",
            triggering_factors: ''
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong isi mengenai faktor pemicu yang mungkin memperburuk penyakit anda, jika tidak tahu anda bisa mengisi 'tidak tahu'");

}, 10000);

it("failed to create user complaint user didnt input drug allergies", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: '',
            general_feeling: 'pusing',
            medical_history: 'jantung',
            symptom_start_time: 'kemarin',
            symptoms: "pusing",
            triggering_factors: 'hutang'
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong isi jika anda mempunyai alergi terhadap suatu obat, jika tidak anda dapat mengisi 'Tidak, saya tidak memiliki alergi terhadap obat-obatan.' ");

}, 10000);

it("failed to create user complaint user didnt input general feelings", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: {
            drug_allergies: 'tidak ada',
            general_feeling: '',
            medical_history: 'jantung',
            symptom_start_time: 'kemarin',
            symptoms: "pusing",
            triggering_factors: 'hutang'
        } }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("Tolong ceritakan mengenai perasaan anda secara umum selain gejala ini");

}, 10000);

it("create user complaint", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: newUserComplaints }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const sendMessage = response.body.singleResult.data.createUserComplaint;
    expect(response.body.singleResult.errors).toBeUndefined()
    console.log(response.body.singleResult.data.createUserComplaint)
    expect(sendMessage).toHaveProperty("UserId");
    expect(sendMessage).toHaveProperty("createdAt");
    expect(sendMessage).toHaveProperty("drug_allergies");
    expect(sendMessage).toHaveProperty("general_feeling");
    expect(sendMessage).toHaveProperty("medical_history");
    expect(sendMessage).toHaveProperty("symptom_start_time");
    expect(sendMessage).toHaveProperty("symptoms");
    expect(sendMessage).toHaveProperty("triggering_factors");
    expect(sendMessage).toHaveProperty("updatedAt");
}, 10000);

it("failed to create user complaint user didnt input data", async () => {
    const response = await server.executeOperation({
        query:
            "mutation CreateUserComplaint($newUserComplaint: NewUserComplaint) { createUserComplaint(newUserComplaint: $newUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { newUserComplaint: newUserComplaints }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const errors = response.body.singleResult.errors[0]
    expect(errors).toHaveProperty("message");
    expect(errors.message).toBe("A complaint associated with this user is already exist, try updating a new one instead");

}, 10000);

it("update user complaint", async () => {
    const response = await server.executeOperation({
        query:
            "mutation UpdateUserComplaint($updateUserComplaint: NewUserComplaint) { updateUserComplaint(updateUserComplaint: $updateUserComplaint) { UserId,createdAt,drug_allergies,general_feeling,medical_history,symptom_start_time,symptoms,triggering_factors,updatedAt } }",
        variables: { updateUserComplaint: updateUserComplaints }
    }, {
        contextValue: {
            authentication: async () => {
                return {
                    _id: "661f9ece57d3f0b8c60a8fb5",
                    username: "dum222",
                    email: "dummy222@mail.com"
                }
            }
        }
    });

    const sendMessage = response.body.singleResult.data.updateUserComplaint;
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(sendMessage).toHaveProperty("UserId");
    expect(sendMessage).toHaveProperty("createdAt");
    expect(sendMessage).toHaveProperty("drug_allergies");
    expect(sendMessage).toHaveProperty("general_feeling");
    expect(sendMessage).toHaveProperty("medical_history");
    expect(sendMessage).toHaveProperty("symptom_start_time");
    expect(sendMessage).toHaveProperty("symptoms");
    expect(sendMessage).toHaveProperty("triggering_factors");
    expect(sendMessage).toHaveProperty("updatedAt");
}, 10000);

it("returns chats by user complaint", async () => {
    const response = await server.executeOperation({
      query:  `query {
        getUserComplaint {
          _id
          UserId
          symptoms
          symptom_start_time
          medical_history
          triggering_factors
          drug_allergies
          general_feeling
          createdAt
          updatedAt
        }
      }`
    },
    {
      contextValue: {
        authentication: async () => {
          return {
            _id: "661f9ece57d3f0b8c60a8fb5",
            username: "dum222",
            email: "dummy222@mail.com"
          }
        }
      }
    })
    const chats = response.body.singleResult.data?.getUserComplaint
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(chats).toEqual(expect.any(Object));
    expect(chats).toHaveProperty("_id");
    expect(chats).toHaveProperty("UserId");
    expect(chats).toHaveProperty("symptoms");
    expect(chats).toHaveProperty("symptom_start_time");
    expect(chats).toHaveProperty("medical_history");
    expect(chats).toHaveProperty("triggering_factors");
    expect(chats).toHaveProperty("drug_allergies");
    expect(chats).toHaveProperty("general_feeling");
    expect(chats).toHaveProperty("createdAt");
    expect(chats).toHaveProperty("updatedAt");
  })

afterAll(async () => {
    await userComplaint.collection().deleteOne({UserId:new ObjectId('661f9ece57d3f0b8c60a8fb5')})
})