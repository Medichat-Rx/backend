const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers, server } = require("../index.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const User = require('../models/user.js');

it("returns all users", async () => {
  const response = await server.executeOperation({
    query: `query {
        findAllUsers {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
  });

  const users = response.body.singleResult.data?.findAllUsers;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Array));
  expect(users[0]).toEqual(expect.any(Object));
  expect(users[0]).toHaveProperty("_id");
  expect(users[0]).toHaveProperty("name");
  expect(users[0]).toHaveProperty("username");
  expect(users[0]).toHaveProperty("email");
  expect(users[0]).toHaveProperty("password");
  expect(users[0]).toHaveProperty("createdAt");
});

it("returns user by id", async () => {
  const response = await server.executeOperation({
    query: `query($id: ID!) {
        findUserById(_id: $id) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      id: "6625a31e7ebe817aaebd3b51",
    },
  });
  const users = response.body.singleResult.data?.findUserById;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
});

it("returns user by username", async () => {
  const response = await server.executeOperation({
    query: `query($username: String!) {
        findUserByUsername(username: $username) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      username: "TesterUser",
    },
  });
  const users = response.body.singleResult.data?.findUserByUsername;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
})

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

it("returns user by email", async () => {
  const response = await server.executeOperation({
    query: `query($email: String!) {
        findByEmail(email: $email) {
          _id
          name
          username
          email
          password
          createdAt
        }
      }`,
    variables: {
      email: "test@mail.com",
    },
  });
  const users = response.body.singleResult.data?.findByEmail;
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(users).toEqual(expect.any(Object));
  expect(users).toHaveProperty("_id");
  expect(users).toHaveProperty("name");
  expect(users).toHaveProperty("username");
  expect(users).toHaveProperty("email");
  expect(users).toHaveProperty("password");
  expect(users).toHaveProperty("createdAt");
})

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
          _id: "6625a31e7ebe817aaebd3b51",
          username: "TesterUser",
          email: "test@mail.com"
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

//login
it("login successfully", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { access_token,email } }",
      variables: { email: "test@mail.com", password: 'password' }
  });

  //console.log(response.body.singleResult.errors)
  const login = response.body.singleResult.data?.login;
  expect(response.body.singleResult.errors).toBeUndefined()
  expect(login).toEqual(expect.any(Object));
  expect(login).toHaveProperty("access_token");
  expect(login).toHaveProperty("email");
});

it("login failed user didnt input email", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { access_token,email } }",
      variables: { email: "", password: 'password' }
  });

  
  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Invalid email/password");
});

it("login failed user didnt input password", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { access_token,email } }",
      variables: { email: "test@mail.com", password: '' }
  });

  
  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Invalid email/password");
});

//register
const newUsers ={
  email: "cobatesting321@mail.com",
  name: "fortesting",
  password: "password",
  username: "cobatesting"
}

it("register successfully", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:newUsers }
  });

  const register = response.body.singleResult.data?.register;
  expect(response.body.singleResult.errors).toBeUndefined()
  expect(register).toEqual(expect.any(Object));
  expect(register).toHaveProperty("_id");
  expect(register).toHaveProperty("createdAt");
  expect(register).toHaveProperty("email");
  expect(register).toHaveProperty("name");
  expect(register).toHaveProperty("password");
  expect(register).toHaveProperty("username");
});

it("register failed user didnt input username", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'aaa@aaa.com',name:'abcdefg',password:'12345',username:''} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Username is required");
});

it("register failed user didnt input email", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'',name:'abcdefg',password:'12345',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Email is required");
});

it("register failed user didnt input password", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'aaa@aaa.com',name:'abcdefg',password:'',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Password is required");
});

it("register failed user input wrong email format", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'aaa',name:'abcdefg',password:'123456',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Invalid email format");
});

it("register failed user password is less than 5 character", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'aaa@aa.com',name:'abcdefg',password:'123',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Password must be at least 5 character or more");
});

it("register failed email must be unique", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:newUsers.email,name:'abcdefg',password:'12345',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Email must be unique");
});

it("register failed email must be unique", async () => {
  const response = await server.executeOperation({
      query:
          "mutation Register($newUser: NewUser) { register(newUser: $newUser) { _id,createdAt,email,name,password,username } }",
      variables: { newUser:{email:'aaaa@aaaa.com',name:newUsers.name,password:'12345',username:'aaaaa'} }
  });

  const errors = response.body.singleResult.errors[0];
  expect(errors).toHaveProperty("message");
  expect(errors.message).toBe("Username must be unique");
});

afterAll(async () => {
  await User.collection().deleteOne({email:newUsers.email})
})