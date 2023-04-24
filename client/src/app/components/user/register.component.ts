import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { RelayService } from 'src/app/relay.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  form !: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private taskSvc : TaskService, private relaySvc : RelayService) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  register() {
    const data = this.form.value as User
    console.info('>>> user: ', data)

    // send to svc to post to SB
    this.taskSvc.createUser(data)
      .then(response => {
        console.log(response)   // get the postId back from SB
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
      name : this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email : this.fb.control('', [Validators.required, Validators.email]),
      password : this.fb.control('', [Validators.required, Validators.minLength(5)])
    })
  }
}
