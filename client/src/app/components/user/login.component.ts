import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { User } from 'src/app/models';
import { RelayService } from 'src/app/relay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup

  constructor(private fb: FormBuilder, private taskSvc : TaskService, private router: Router, private relaySvc : RelayService) {}

  ngOnInit(): void {
    this.loginForm = this.createForm()
  }

  login() {
    const data = this.loginForm.value as User
    console.info('>>> user: ', data)

    // send to svc to post to SB
    this.taskSvc.verifyUser(data)
      .then(response => {
        console.log(">>> VERIFY USER \n", response)
        if (response.email == data.email) {
          this.relaySvc.currentUser = response
          this.router.navigate(['/tasks']);
        }
      }).catch(err => {
        console.error(">>>>> error verifying user", err)
      })

  }

  // initialise form
  createForm() : FormGroup {
    return this.fb.group({
      email : this.fb.control('', [Validators.required, Validators.email]),
      password : this.fb.control('', [Validators.required])
    })
  }  
}
