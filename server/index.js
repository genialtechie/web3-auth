const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

app.use(cors());
app.use(express.json())

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
  try {
    const user = new User({
      name: req.body.name,
      publicAddress: req.body.address
    })
    res.send({status: 'ok'});
  } catch (error) {
    res.send({status: 'error'})
    console.error(error);
  }
  
  user.save();
})

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      publicAddress: req.body.address
    })
    return user ?  res.json({status: 'ok', user: true}) : res.json({status: 'error', user: false})
  } catch (error) {
    console.error(error)
  }
  
  
})

app.listen(5000, function () {
    console.log('server has started!');
});
