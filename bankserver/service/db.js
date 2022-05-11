
// import library
const mongoose = require('mongoose')

// connection string : to coneect db with server
mongoose.connect('mongodb://localhost:27017/bankServer', {
    useNewUrlParser: true
})

// create a modal : to perform the operation user and db

const User = mongoose.model('User', {
    acno: Number,
    username: String,
    password: String,
    balance: Number,
    transaction: []
})

module.exports = {
    User
}