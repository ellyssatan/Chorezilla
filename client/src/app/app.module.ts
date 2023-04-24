import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TaskDialogComponent } from './components/task-dialog.component';
import { TaskComponent } from './components/task.component';
import { TaskColumnsComponent } from './components/task-columns.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environment';
import { TaskService } from './task.service';
import { EmailComponent } from './components/email-dialog.component';
import { NotificationComponent } from './components/notification.component';
import { RelayService } from './relay.service';

initializeApp(environment.firebase);

const appRoutes : Routes = [
	{ path: '',
    component: LoginComponent
  },
	{ path: 'new',
    component: RegisterComponent
  },
	{ path: 'tasks',
    component: TaskColumnsComponent
  },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, TaskComponent, TaskDialogComponent, TaskColumnsComponent, LoginComponent, RegisterComponent, EmailComponent, NotificationComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(appRoutes), HttpClientModule,
    MaterialModule, DragDropModule, MatDialogModule,FormsModule, ReactiveFormsModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [TaskService, RelayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
