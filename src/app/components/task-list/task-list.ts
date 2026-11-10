import { Component, input, output } from '@angular/core';
import { FilterType, Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  // data from parent
  tasks = input<Task[]>([]);
  filter = input<FilterType>('all');

  // events to parent (we send the task id)
  taskCompleted = output<number>();
  taskDeleted = output<number>();

  onComplete(id: number) {
    this.taskCompleted.emit(id);
  }

  onDelete(id: number) {
    this.taskDeleted.emit(id);
  }
}
