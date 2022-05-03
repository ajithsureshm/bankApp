import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  // register modal

  registerform = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private db: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  register() {
    // alert("clicked")

    var uname = this.registerform.value.uname
    var acno = this.registerform.value.acno
    var pwd = this.registerform.value.pwd

    console.log(this.registerform);

    if (this.registerform.valid) {

      const result = this.db.register(uname, acno, pwd)

      if (result) {

        alert("sucessfully registered")
        this.router.navigateByUrl("")

      } else {
        alert("account already exicts!!! plz log in")
      }
    }else{
      alert("invalid form")
    }

  }
}
