const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const User = require('./models/User.js');
const jwt = require('jsonwebtoken')
const verifyJWT = require('./middleware/verifyJWT')
const Web3 = require('web3');
const web3 = new Web3(Web3.currentProvider)

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
    user.save();
    res.send({
      status: 'ok'
    });
  } catch (error) {
    res.send({status: 'error'})
    console.error(error);
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
      publicAddress: req.body.address
    })
    if(user) {
      const payload = {
        name: user.name,
        nonce: user.nonce
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      if (token) res.json({status: 'ok',  user: token})
      
    } else {
      res.json({status: 'error', user: false})
    } 
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/auth', verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, user: req.user.name, nonce: req.user.nonce})
})

app.post('/api/verify', (req, res) => {
  const address = req.body.publicAddress
  const signature = req.body.signature

  User.findOne({publicAddress: address}).then( user => {
    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    web3.eth.personal.ecRecover(msg, signature).then(signer => {
      if(signer.toLowerCase() === address.toLowerCase()) res.json({status: 'ok', user: true})
      else res.json({status: 'error', user: false})
    })
  })
})

app.listen(5000, function () {
    console.log('server has started!');
});
