import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser: any
  currentAcno: any

  database: any = {
    1000: { acno: 1000, username: "ajith", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, username: "akaash", password: 1001, balance: 500, transaction: [] },
    1002: { acno: 1002, username: "adi", password: 1002, balance: 50000, transaction: [] },
    1003: { acno: 1003, username: "laxz", password: 1003, balance: 50005, transaction: [] }

  }

  constructor() {
    this.getDetails()
  }

  // to set data in localstorage

  saveDetails() {
    localStorage.setItem("database", JSON.stringify(this.database))

    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }

    if (this.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
    }
  }

  // to get data from local storage

  getDetails() {
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database") || '')
    }

    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }


    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '')
    }
  }


  // register

  register(username: any, acno: any, password: any) {

    let database = this.database

    if (acno in database) {

      // already exist
      return false

    } else {

      // add to db
      database[acno] = { acno, username, password, balance: 0, transaction: [] }
      console.log(database);
      this.saveDetails()
      return true


    }

  }

  // login

  login(acno: any, pwd: any) {



    let database = this.database

    if (acno in database) {

      if (pwd == database[acno]["password"]) {

        this.currentUser = database[acno]["username"]
        this.currentAcno = acno
        // already login
        this.saveDetails()
        return true

      } else {
        alert("incorrect password")
        return false
      }

    } else {
      alert("user does not exist !!!")
      return false
    }
  }

  // deposit

  deposit(acno: any, pwd: any, amt: any) {

    var amount = parseInt(amt)

    let database = this.database

    if (acno in database) {
      if (pwd == database[acno]["password"]) {

        database[acno]["balance"] += amount


        database[acno]["transaction"].push({
          type: "CREDIT",
          amount: amount
        })

        // console.log(database);

        this.saveDetails()

        return database[acno]["balance"]
      } else {
        alert("incorrect password")
        return false
      }

    } else {
      alert("user does not exits!!!")
      return false
    }
  }

  // withdraw

  withdraw(acno: any, pwd1: any, amt1: any) {

    var amount = parseInt(amt1)

    let database = this.database

    if (acno in database) {

      if (pwd1 == database[acno]["password"]) {

        if (amount <= database[acno]["balance"]) {

          database[acno]["balance"] -= amount // balance = balance - amount


          database[acno]["transaction"].push({
            type: "DEBIT",
            amount: amount
          })

          console.log(database);

          this.saveDetails()

          return database[acno]["balance"]

        } else {
          alert("insufficent balance")
          return false
        }

      } else {
        alert("incorrect password")
        return false
      }

    } else {
      alert("user doesnot exicts!!!")
      return false
    }


  }

  // transaction 

  transaction(acno: any) {

    return this.database[acno].transaction
  }
}
