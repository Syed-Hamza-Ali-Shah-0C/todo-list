import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input id="search" type="text" [(ngModel)]="searchTerm" (input)="filterTodos()" />
      <app-progress-bar *ngIf="!loaded"></app-progress-bar>
      <app-todo-item *ngFor="let todo of filteredTodos" [item]="todo" (click)="todoItem.onDelete()" #todoItem></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  loaded = false;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchTerm = '';

  constructor(todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.todos$.subscribe((todos) => {
      this.todos = todos;
      this.filteredTodos = this.todos;
      this.loaded = true;
    });
  }

  filterTodos() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredTodos = this.todos.filter(todo =>
        todo.task.toLowerCase().includes(searchTerm)
    );
  }
}
