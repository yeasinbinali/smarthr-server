const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

// smart-hr
// l1ZKSwIqq9W0y8kd

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d7bt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const servicesCollection = client.db('smart-hr').collection("services");
    const newsCollection = client.db("smart-hr").collection("news");
    const testimonialsCollection = client.db('smart-hr').collection("testimonials");
    const usersCollection = client.db('smart-hr').collection("users");
    const worksheetCollection = client.db('smart-hr').collection("worksheet");

    app.get('/services', async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    })

    app.get('/news', async (req, res) => {
      const result = await newsCollection.find().toArray();
      res.send(result);
    })

    app.get('/testimonials', async (req, res) => {
      const result = await testimonialsCollection.find().toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    app.post('/worksheet', async (req, res) => {
      const worksheet = req.body;
      const result = await worksheetCollection.insertOne(worksheet);
      res.send(result);
    })

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Smart hr server is running')
})

app.listen(port, () => {
  console.log(`Smart hr server is running on port ${port}`)
})