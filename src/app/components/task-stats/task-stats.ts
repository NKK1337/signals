import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.css',
})
export class TaskStats {
  total = input(0);
  completed = input(0);
  active = input(0);
  percentage = input(0);
}
