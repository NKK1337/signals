import { Component, computed, effect, signal } from '@angular/core';
import { FilterType, Task } from './models/task.model';
import { TaskList } from './components/task-list/task-list';
import { TaskStats } from './components/task-stats/task-stats';
import { TaskFilter } from './components/task-filter/task-filter';

@Component({
  selector: 'app-root',
  imports: [TaskList, TaskStats, TaskFilter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // signals
  tasks = signal<Task[]>(this.loadTasks());
  filter = signal<FilterType>('all');
  searchTerm = signal('');

  // computed values
  filteredTasks = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const filter = this.filter();

    return this.tasks().filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      const matchesSearch = task.title.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  });

  total = computed(() => this.tasks().length);
  completedCount = computed(() => this.tasks().filter((t) => t.completed).length);
  activeCount = computed(() => this.tasks().filter((t) => !t.completed).length);
  completionPercentage = computed(() => {
    if (this.total() === 0) {
      return 0;
    }
    return Math.round((this.completedCount() / this.total()) * 100);
  });

  constructor() {
    // runs every time tasks change
    effect(() => {
      const list = this.tasks();
      console.log('Tasks count:', list.length);
      localStorage.setItem('tasks', JSON.stringify(list));
    });
  }

  loadTasks(): Task[] {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  }

  addTask(input: HTMLInputElement) {
    const title = input.value.trim();
    if (!title) {
      return;
    }

    const newTask: Task = { id: Date.now(), title: title, completed: false };
    this.tasks.update((list) => [...list, newTask]);
    input.value = '';
  }

  toggleTask(id: number) {
    this.tasks.update((list) =>
      list.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  deleteTask(id: number) {
    this.tasks.update((list) => list.filter((task) => task.id !== id));
  }

  clearAll() {
    this.tasks.set([]);
  }

  changeFilter(filter: FilterType) {
    this.filter.set(filter);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
