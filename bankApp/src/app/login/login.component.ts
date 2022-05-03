import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // dataabase


  aim = "your perfect banking partner"
  accNum = "Account Number Please!!!"
  acno = ""
  pwd = ""


  // login modal

  loginForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })




  constructor(private router: Router, private db: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // acnoChange(event: any) {
  //   // console.log(event.target.value);
  //   this.acno = event.target.value
  //   console.log(this.acno);


  // }

  // pwdChange(event: any) {
  //   this.pwd = event.target.value
  //   console.log(this.pwd);


  // }

  // login - using event binding
  // two waybinding

  login() {

    var acno = this.loginForm.value.acno
    // console.log(acno);

    var pwd = this.loginForm.value.pwd

    if (this.loginForm.valid) {


      // call dataservice
      const result = this.db.login(acno, pwd)

      if (result) {

        alert("login sucessfully")

        this.router.navigateByUrl("dashboard")

      }

      // if (acno in this.db.database) {

      //   if (pwd == this.db.database[acno]["password"]) {

      //     alert("login sucessfully")

      //     this.router.navigateByUrl("dashboard")


      //   } else {
      //     alert("incorrect password")
      //   }

      // } else {
      //   alert("user does not exist !!!")
      // }
    } else {
      alert("invalid form")
    }
  }


  // LOGIN - using template reference varible

  // login(a:any,p:any) {

  //   console.log(a.value);



  //     var acno = a.value
  //     var pwd = p.value

  //     let database = this.database

  //     if (acno in database) {

  //       if (pwd == database[acno]["password"]) {

  //         alert("login sucessfully")

  //       } else {
  //         alert("incorrect password")
  //       }

  //     } else {
  //       alert("user does not exist !!!")
  //     }
  //   }

}
