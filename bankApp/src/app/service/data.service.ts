import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders
}

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

  constructor(private htpp: HttpClient) {
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

    const data = {
      username,
      acno,
      password
    }

    // register function api call
    return this.htpp.post('http://localhost:3000/register', data)

  }

  // login

  login(acno: any, pwd: any) {

    // req body
    const data = {
      acno,
      pwd
    }

    // login api call
    return this.htpp.post('http://localhost:3000/login', data)
  }

  // deposit

  deposit(acno: any, pwd: any, amt: any) {

    const data = {
      acno,
      pwd,
      amt
    }



    // deposit api calling

    return this.htpp.post('http://localhost:3000/deposit', data, this.getFunctions())
  }

  getFunctions() {
    // to fetch token

    const token = JSON.parse(localStorage.getItem('token') || '')

    // create http header
    let headers = new HttpHeaders()

    if (token) {
      headers = headers.append('x-acess-token', token)
      options.headers = headers

    }
    return options
  }

  // withdraw

  withdraw(acno: any, pwd1: any, amt1: any) {


    const data = {
      acno,
      pwd1,
      amt1
    }


    // deposit api calling

    return this.htpp.post('http://localhost:3000/withdraw', data, this.getFunctions())

  }

  // transaction 

  transaction(acno: any) {

    const data = {
      acno
    }

    // deposit api calling

    return this.htpp.post('http://localhost:3000/transaction', data, this.getFunctions())

  }

  onDelete(acno:any){
    // onDelete api callling

    return this.htpp.delete('http://localhost:3000/onDelete/'+acno, this.getFunctions())

  }
}
