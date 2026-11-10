import { Component, input, output } from '@angular/core';
import { FilterType } from '../../models/task.model';

@Component({
  selector: 'app-task-filter',
  imports: [],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  // which filter is selected right now (to highlight the button)
  current = input<FilterType>('all');

  // tell the parent which filter was chosen
  filterChanged = output<FilterType>();

  choose(filter: FilterType) {
    this.filterChanged.emit(filter);
  }
}
