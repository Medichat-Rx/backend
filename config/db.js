const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//? database yang dituju
const database = client.db("MedichatRx");

// async function run() {
//   await client.db("MedichatRx").command({ ping: 1 });
//   console.log("Pinged your deployment. You successfully connected to MongoDB!");

//   const res = await database.collection("users").insertOne({
//     name: "raihan",
//     username: "raihank43",
//     email: "raihank43@mail.com",
//     password: "password",
//     createdAt: new Date(),
//   });
// }
// run().catch(console.dir);

//? kemudian di exports
module.exports = database;
