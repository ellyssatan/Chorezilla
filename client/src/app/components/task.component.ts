import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models';
import { RelayService } from '../relay.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  constructor(private relaySvc : RelayService) {}

  @Input()
  task: Task | null = null;

  @Output()
  edit = new EventEmitter<Task>();

}
