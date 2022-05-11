
// server creation step

// import express
const express = require('express');


// import token
const jwt = require('jsonwebtoken')

// import cors
const cors = require('cors')


// create server app using express
const app = express()

// use cors
app.use(cors({
    origin: 'http://localhost:4200'
}))

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

const dataservice = require('./service/data.service');
const res = require('express/lib/response');



// register API

app.post('/register', (req, res) => {
    dataservice.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })
})

// login API

app.post('/login', (req, res) => {
    dataservice.login(req.body.acno, req.body.pwd)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

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
    dataservice.deposit(req.body.acno, req.body.pwd, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})

// withdraw 

app.post('/withdraw', middlevare, (req, res) => {
    dataservice.withdraw(req, req.body.acno, req.body.pwd1, req.body.amt1)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})

// transaction 

app.post('/transaction', middlevare, (req, res) => {
    dataservice.transaction(req.body.acno)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})


// onDelete API

app.delete('/onDelete/:acno', middlevare, (req, res) => {
    dataservice.deleteAcc(req.params.acno)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})


// set port number
app.listen(3000, () => {
    console.log("server started at 3000");
})