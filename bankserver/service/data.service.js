//token
const req = require('express/lib/request')
const jwt = require('jsonwebtoken')

database = {
    1000: { acno: 1000, username: "ajith", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, username: "akaash", password: 1001, balance: 500, transaction: [] },
    1002: { acno: 1002, username: "adi", password: 1002, balance: 50000, transaction: [] },
    1003: { acno: 1003, username: "laxz", password: 1003, balance: 50005, transaction: [] }

}

// register

const register = (username, acno, password) => {


    if (acno in database) {

        // already exist
        return {
            statusCode: 401,
            status: false,
            message: "account already exist....please login"
        }

    } else {

        // add to db
        database[acno] = { acno, username, password, balance: 0, transaction: [] }
        console.log(database);
        return {
            statusCode: 200,
            status: true,
            message: "registration sucessfuly"
        }


    }

}


// login

const login = (acno, pwd) => {


    if (acno in database) {

        if (pwd == database[acno]["password"]) {

            currentUser = database[acno]["username"]
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
                message: "incorrect password"
            }
        }

    } else {
        return {
            statusCode: 401,
            status: false,
            message: "user does not exist !!!"
        }
    }
}

// deposit

const deposit = (acno, pwd, amt) => {

    var amount = parseInt(amt)


    if (acno in database) {
        if (pwd == database[acno]["password"]) {

            database[acno]["balance"] += amount


            database[acno]["transaction"].push({
                type: "CREDIT",
                amount: amount
            })

            // console.log(database);

            return {
                statusCode: 200,
                status: true,
                message: amt + "sucessfully deposited.. And current balance" + database[acno]["balance"]
            }

        } else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect password"
            }
        }

    } else {
        return {
            statusCode: 401,
            status: false,
            message: "user does not exits!!!"
        }
    }
}


// withdraw

const withdraw = (req, acno, pwd1, amt1) => {

    var amount = parseInt(amt1)


    if (acno in database) {

        if (pwd1 == database[acno]["password"]) {

            if (req.currentAcno != acno) {
                return {
                    statusCode: 401,
                    status: false,
                    message: "operaton delined"
                }
            }

            if (amount <= database[acno]["balance"]) {

                database[acno]["balance"] -= amount // balance = balance - amount


                database[acno]["transaction"].push({
                    type: "DEBIT",
                    amount: amount
                })

                console.log(database);


                return {
                    statusCode: 200,
                    status: true,
                    message: amt1 + "sucessfully withdraw.. And current balance" + database[acno]["balance"]
                }

            } else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "insufficent balance"
                }
            }

        } else {

            return {
                statusCode: 401,
                status: false,
                message: "incorrect password"
            }
        }


    } else {
        return {
            statusCode: 401,
            status: false,
            message: "user doesnot exicts!!!"
        }
    }


}

// transaction 

const transaction = (acno) => {

    if (acno in database) {
        return {
            statusCode: 200,
            status: true,
            transaction: database[acno].transaction
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "user does not exist !!!"
        }
    }
}

// export

module.exports = {
    register, login, deposit, withdraw, transaction
}