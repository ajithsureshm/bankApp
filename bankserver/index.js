
// server creation step

// import express
const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');

// import token
const jwt = require('jsonwebtoken')


// create server app using express
const app = express()

// to parse json
app.use(express.json())

//      Resolving API call
//   *-----------------------*


// GET - to read data
app.get('/', (req, res) => {
    res.send("GET RESPONSE")
})

// post - to read & write data(create)
app.post('/', (req, res) => {
    res.send("post RESPONSE")
})

// put - to update/modify data
app.put('/', (req, res) => {
    res.send("put RESPONSE")
})

// patch - to partally update data
app.patch('/', (req, res) => {
    res.send("patch RESPONSE")
})

// delete - to read data
app.delete('/', (req, res) => {
    res.send("delete RESPONSE")
})



// import dataservice

const dataservice = require('./service/data.service')



// register API

app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.username, req.body.acno, req.body.password)

    res.status(result.statusCode).json(result)
})

// login API

app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.pwd)

    res.status(result.statusCode).json(result)
})


// middlevare to verify token
const middlevare = (req, res, next) => {
    try {
        const token = req.headers["x-acess-token"]
        const data = jwt.verify(token, 'kl08')
        // console.log(jwt.verify(token, 'kl08'));
        req.currentAcno = data.currentAcno

        next()

    } catch {
        res.status(401).json({
            status: false,
            message: "plz login"
        })
    }
}


// deposit 

app.post('/deposit', middlevare, (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.pwd, req.body.amt)

    res.status(result.statusCode).json(result)
})

// withdraw 

app.post('/withdraw', middlevare, (req, res) => {
    const result = dataservice.withdraw(req, req.body.acno, req.body.pwd1, req.body.amt1)

    res.status(result.statusCode).json(result)
})

// transaction 

app.post('/transaction', middlevare, (req, res) => {
    const result = dataservice.transaction(req.body.acno)

    res.status(result.statusCode).json(result)
})

// set port number
app.listen(3000, () => {
    console.log("server started at 3000");
})