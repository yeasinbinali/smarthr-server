const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const messageCollection = client.db('smart-hr').collection("message")

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

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    })

    app.patch('/users/:id/status', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedUser = {
        $set: {
          status: user.status
        }
      }
      const result = await usersCollection.updateOne(filter, updatedUser);
      res.send(result);
    })

    app.put('/users/:id/role', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedUser = {
        $set: {
          role: user.role
        }
      }
      const result = await usersCollection.updateOne(filter, updatedUser);
      res.send(result);
    })

    app.patch('/users/:id/fired', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedUser = {
        $set: {
          fired: user.fired
        }
      }
      const result = await usersCollection.updateOne(filter, updatedUser);
      res.send(result);
    })

    app.patch('/users/:id/salary', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedUser = {
        $set: {
          salary: user.salary
        }
      }
      const result = await usersCollection.updateOne(filter, updatedUser);
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    app.get('/worksheet', async (req, res) => {
      const result = await worksheetCollection.find().toArray();
      res.send(result);
    })

    app.get('/worksheet/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const result = await worksheetCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/worksheet', async (req, res) => {
      const newWorksheet = req.body;
      const result = await worksheetCollection.insertOne(newWorksheet);
      res.send(result);
    })

    app.get('/message', async (req, res) => {
      const result = await messageCollection.find().toArray();
      res.send(result);
    })

    app.post('/message', async (req, res) => {
      const message = req.body;
      const result = await messageCollection.insertOne(message);
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