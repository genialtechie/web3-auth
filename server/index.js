const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());

const uri = process.env.MONGO_ATLAS;
const client = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
});

(async function() {
  try {
    await client.connect();
    console.log('succesfully connected!');
    // access db collection
    const collection = client.db('authDb').collection('Users');
    client.close();
  } catch (error) {
    console.error(error);
  }
  return true
})();


app.post('/api/register', async (req, res) => {
  console.log(req.body);
})

app.listen(5000, function () {
    console.log('server has started!');
});
