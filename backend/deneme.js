import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://cifcimustafakerem:BGRqzWP8l3ATZeru@cluster0.bedtx0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Bağlandığımız db'yi seçiyoruz (örneğin "mydatabase")
    const database = client.db("freelanceWeb");

    // "users" koleksiyonunu seçiyoruz
    const users = database.collection("users");

    // Eklenecek kullanıcı verisi
    const newUser = {
      name: "Mustafa Kerem Çifçi",
      email: "mustafa@example.com",
      age: 25,
      createdAt: new Date()
    };

    // Veri ekleme (insertOne)
    const result = await users.insertOne(newUser);

    console.log(`Yeni kullanıcı eklendi, _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
