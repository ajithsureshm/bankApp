//token
const req = require('express/lib/request')
const jwt = require('jsonwebtoken')

// import db
const db = require('./db')

database = {
    1000: { acno: 1000, username: "ajith", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, username: "akaash", password: 1001, balance: 500, transaction: [] },
    1002: { acno: 1002, username: "adi", password: 1002, balance: 50000, transaction: [] },
    1003: { acno: 1003, username: "nikk", password: 1003, balance: 50005, transaction: [] }

}

// register

const register = (username, acno, password) => {

    // asynchronous
    return db.User.findOne({ acno })
        .then(user => {
            console.log(user);
            if (user) {

                // already exist
                return {
                    statusCode: 401,
                    status: false,
                    message: "account already exist....please login"
                }

            } else {
                const newUser = new db.User(
                    {
                        acno,
                        username,
                        password,
                        balance: 0,
                        transaction: []
                    })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "registration sucessfuly!!! please login"
                }
            }
        })

    // else {

    // // add to db
    // database[acno] = { acno, username, password, balance: 0, transaction: [] }
    // console.log(database);



}




// login

const login = (acno, pwd) => {

    return db.User.findOne({ acno, password: pwd })

        .then(user => {

            if (user) {

                currentUser = user.username
                currentAcno = acno

                // token generating
                const token = jwt.sign({
                    currentAcno: acno
                }, 'kl08')

                return {
                    statusCode: 200,
                    status: true,
                    message: "login sucessfuly",
                    token,
                    currentAcno,
                    currentUser
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Invalid Entry !!!"
                }
            }
        })
}

//     if (acno in database) {

//         if (pwd == database[acno]["password"]) {



//         } else {
//             return {
//                 statusCode: 401,
//                 status: false,
//                 message: "incorrect password"
//             }
//         }

//     } else {

//     }
// }



// deposit

const deposit = (acno, pwd, amt) => {

    var amount = parseInt(amt)


    return db.User.findOne({ acno, password: pwd })
        .then(user => {
            if (user) {

                user.balance += amount


                user.transaction.push({
                    type: "CREDIT",
                    amount: amount
                })

                user.save()

                // console.log(database);

                return {
                    statusCode: 200,
                    status: true,
                    message: amt + "sucessfully deposited.. And current balance" + user.balance
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Invalid Entry !!!"
                }
            }
        })



    // if (acno in database) {
    //     if (pwd == database[acno]["password"]) {



    //     } else {
    //         return {
    //             statusCode: 401,
    //             status: false,
    //             message: "incorrect password"
    //         }
    //     }

    // } else {
    //     return {
    //         statusCode: 401,
    //         status: false,
    //         message: "user does not exits!!!"
    //     }
    // }
}


// withdraw

const withdraw = (req, acno, pwd1, amt1) => {

    var amount = parseInt(amt1)

    return db.User.findOne({ acno, password: pwd1 })

        .then(user => {
            console.log(user);

            if (req.currentAcno != acno) {

                console.log(req.currentAcno);

                return {
                    statusCode: 401,
                    status: false,
                    message: "operaton delined"
                }
            }
            if (user) {
                if (amount <= user.balance) {

                    user.balance -= amount // balance = balance - amount


                    user.transaction.push({
                        type: "DEBIT",
                        amount: amount
                    })
                    user.save()

                    return {
                        statusCode: 200,
                        status: true,
                        message: amt1 + "sucessfully withdraw.. And current balance" + user.balance
                    }
                } else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: "insufficent balance !!!"
                    }
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "Invalid Entry !!!"
                }
            }
        })
}


// transaction 

const transaction = (acno) => {

    return db.User.findOne({ acno })

        .then(user => {

            if (user) {
                return {
                    statusCode: 200,
                    status: true,
                    transaction: user.transaction
                }
            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "user does not exist !!!"
                }
            }
        })

}

// deleteAcc

const deleteAcc = (acno) => {
    return db.User.deleteOne({ acno })
        .then(user => {
            if (!user) {
                return {
                    statusCode: 401,
                    status: false,
                    message: "operation failed !!!"
                }
            } else {

                return {
                    statusCode: 200,
                    status: true,
                    message: "Account number" + acno + " deleted sucessfully...."
                }
            }
        })
}

// export

module.exports = {
    register, login, deposit, withdraw, transaction ,deleteAcc
}