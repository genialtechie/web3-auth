const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongoose');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('models/User');

app.use(cors());
app.use(bodyParser.json())

const uri = process.env.MONGO_ATLAS;
try {
  mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => console.log('Connected to Mongo Cluster!'));
} catch (error) {
  console.error(error)
}

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    publicAddress: req.body.address
  })
  user.save();
})

app.listen(5000, function () {
    console.log('server has started!');
});
