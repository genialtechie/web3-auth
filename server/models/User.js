const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        trim: true, 
        unique: true 
    },
    email: {
        type: String, 
        required: false, 
        trim: true, 
        unique: true
    },
    publicAddress: {
        type: String, 
        required: true, 
        trim: true, 
        unique: true
    },
    nonce: {
        type: Number,
        default: () => Math.floor(Math.random() * 1000000)
    }
})

module.exports = mongoose.model('User', UserSchema)