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

  user:any
  acno:any

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

  date:any

  constructor(private ds: DataService, private fb: FormBuilder, private router:Router) { 
    this.user=this.ds.currentUser
    this.date=new Date()

  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno")) {
      alert("plz login")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amt = this.depositForm.value.amt

    if (this.depositForm.valid) {


      // call deposit in data service
      const result = this.ds.deposit(acno, pwd, amt)

      if (result) {
        alert(amt + "sucessfully deposited.. And current balance" + result)
      }


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
      const result1 = this.ds.withdraw(acno, pwd, amt)

      if (result1) {
        alert(amt + "sucessfully withdraw.. your current balance is" + result1)
      }
    } else {
      alert("invalid entry")
    }
  }

  // logout 

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUser")

    this.router.navigateByUrl("")


  }

  // delect function

  deleteFunction(){
    this.acno=JSON.parse (localStorage.getItem("currentAcno")||'')
  }

  onCancel(){
    this.acno=""
  }

  onDelete(event:any){
    alert("delect account"+event)
  }

}
