import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mail } from '../models';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailComponent {

  title:string = '';
  
  private backupTask: Partial<Mail> = { ...this.data.mail };

  constructor(
    public dialogRef: MatDialogRef<EmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MailData
  ) {}

  cancel(): void {
    this.data.mail.email = this.backupTask.email;
    this.dialogRef.close(this.data);
  }
}

export interface MailData {
  mail: Partial<Mail>;
  enableDelete: boolean;
}

export interface MailResult {
  mail: Mail;
  delete?: boolean;
}