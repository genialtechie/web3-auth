const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(cors());

const url = process.env.MONGO_ATLAS
console.log(url);
//mongoose.connect(url);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(5000, function () {
    console.log('server has started!');
});
