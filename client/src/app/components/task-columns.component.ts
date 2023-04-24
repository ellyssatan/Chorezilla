import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Task, User } from '../models';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, async } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailComponent, MailResult } from './email-dialog.component';
import { RelayService } from '../relay.service';

@Component({
  selector: 'app-task-columns',
  templateUrl: './task-columns.component.html',
  styleUrls: ['./task-columns.component.css']
})
export class TaskColumnsComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialog : MatDialog, private store : AngularFirestore, private taskSvc : TaskService, private relaySvc : RelayService) {}

  // defines an Observable of tasks that are in the 'todo' list
  todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

  tasks: Task[] = [];
  retrievedTasks !: Promise<Task[]>;
  webToken !: string;
  emailForm !: FormGroup
  user = this.relaySvc.currentUser

  ngOnInit(): void {
    this.emailForm = this.createForm()
    this.user = this.relaySvc.currentUser
  }
  
  createForm() : FormGroup {
    return this.fb.group({
      email : this.fb.control('', [Validators.required, Validators.email])
    })
  }

  // create new task method
  newTask(): void {
    // opens a MatDialog with the TaskDialogComponent
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '350px',
      data: {
        task: {
          username : this.relaySvc.currentUser.name
        },
      },
    });

    // subscribes to the afterClosed event of the dialog
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      // if no result is returned, exit the function
      if (!result) {
        return;
      }
      // adds the new task to the 'todo' list in the Firestore database
      this.store.collection('todo').add(result.task);
    });
  }

  // edit task method
  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    // open the MatDialog
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '350px',
      data: {
        task,
        // allows user to delete
        enableDelete: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      // if no result is returned, exit the function
      if (!result) {
        return;
      }
      if (result.delete) {
        // delete from firestore db
        this.store.collection(list).doc(task.id).delete();
      } else {
        // update task in firestore db
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]|null>): void {
    // if the task is dropped in the same container, exit the function
    if (event.previousContainer === event.container) {
      return;
    }
    // if either container has no data, exit the function
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    // gets the task that was dropped
    const item = event.previousContainer.data[event.previousIndex];
    // runs a Firestore transaction to move the task from one list to another
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        // deletes the task from the previous container
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        // adds the task to the new container
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });

    // moves the task in the Angular component
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  // send email method
  sendMail(list : 'done' | 'todo' | 'inProgress'): void {
    // opens a MatDialog with the TaskDialogComponent
    const dialogRef = this.dialog.open(EmailComponent, {
      width: '300px',
      data: {
        title: list,
        mail: {},
      },
    });

    // subscribes to the afterClosed event of the dialog
    // send button
    dialogRef.afterClosed().subscribe((result: MailResult) => {

      // if no result is returned, exit the function
      if (!result) {
        return;
      } else

      var email = result.mail.email;
      console.log(">>>>> ", email);
      
      this.taskSvc.mailTasks(this.tasks, list, email)

      var message;
      if (list === 'todo'){
        message = `Chorezilla's Manifesto (Todo List) has been sent to ${email}!`;
      }
      else if (list === 'inProgress'){
        message = `Chorezilla's Work in Progress (In Progress List) has been sent to ${email}!`;
      }
      else {
        message = `Chorezilla's Champion Checklist (Completed List) has been sent to ${email}!`;
      }
      
      if (email != null) {
        this.taskSvc.sendNotification(message, this.relaySvc.webToken);
      }
    });
  }

  getTasksList(list : 'done' | 'todo' | 'inProgress') : Promise<any> {
    return new Promise((resolve) => {
        console.log("in getTasksList, moving to resolve....")
        resolve(
          this.store.collection<Task>(list).valueChanges().subscribe((tasks: Task[]) => {
            this.tasks = tasks;
            console.log("from getTasksList", this.tasks)
          }))
      })
  }
}



