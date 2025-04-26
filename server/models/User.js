const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   displayId: Number,
   name : String,
   email : String,
   password : String
})

const UserModel = mongoose.model("accounts",UserSchema)

module.exports = UserModel