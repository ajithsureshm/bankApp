import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any
  acno: any

  // // depossit 
  // acno = ""
  // pwd = ""
  // amt = ""

  //deposit modal

  depositForm = this.fb.group({
    amt: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })



  // // withdraw
  // acno1 = ""
  // pwd1 = ""
  // amt1 = ""


  //withdraw modal

  withdrawForm = this.fb.group({
    amt: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  date: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '')
    this.date = new Date()

  }

  ngOnInit(): void {
    // if (!localStorage.getItem("currentAcno")) {
    //   alert("plz login")
    //   this.router.navigateByUrl("")
    // }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amt = this.depositForm.value.amt

    if (this.depositForm.valid) {


      // call deposit in data service
      this.ds.deposit(acno, pwd, amt)

        .subscribe((result: any) => {

          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )

    } else {
      alert("invalid entry")
    }
  }

  withdraw() {

    let acno = this.withdrawForm.value.acno
    let pwd = this.withdrawForm.value.pwd
    let amt = this.withdrawForm.value.amt

    if (this.withdrawForm.valid) {


      // call withdraw in data service
      this.ds.withdraw(acno, pwd, amt)

        .subscribe((result1: any) => {

          if (result1) {
            alert(result1.message)
          }
        },
          (result1) => {
            alert(result1.error.message)
          }
        )


    } else {
      alert("invalid entry")
    }
  }

  // logout 

  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUser")

    this.router.navigateByUrl("")


  }

  // delect function

  deleteFunction() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')
  }

  onCancel() {
    this.acno = ""
  }

  onDelete(event: any) {

    // calling onDelete in database

    this.ds.onDelete(event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          this.router.navigateByUrl('')
        }
      },
        (result: any) => {
          alert(result.error.message)
        }
      )
  }

}
