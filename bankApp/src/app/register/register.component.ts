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

  // myImage:string="assets/register.jpg";


  // register modal

  registerform = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
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

      this.db.register(uname, acno, pwd)

        .subscribe((result: any) => {

          if (result) {
            alert(result.message)
            this.router.navigateByUrl("")

          }
        },
          (result) => {
            alert(result.error.message)
          }
        )


    } else {
      alert("invalid form")
    }

  }
}
