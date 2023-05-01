import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import {tap} from "rxjs/operators";

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

let mockData: Todo[] = [
  { id: 0, task: 'Implement loading - frontend only', priority: 1 },
  { id: 1, task: 'Implement search - frontend only', priority: 2 },
  { id: 2, task: 'Implement delete on click - frontend only', priority: 1 },
  { id: 3, task: 'Replace mock service by integrating backend', priority: 3 },
];

function removeFromMockData(id: number) {
  mockData = mockData.filter(todo => todo.id !== id);
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoSubject = new BehaviorSubject<Todo[]>(mockData);
  private readonly apiBaseUrl = 'http://localhost:8099/api/todos';
  private todos: Todo[] = [];

  constructor(private readonly http: HttpClient) {
    this.fetchTodos();
  }

  getAll(): Observable<Todo[]> {
    return this.todoSubject.asObservable();
  }

  remove(id: number): Observable<void> {
    const url = `${this.apiBaseUrl}/remove/${id}`;
    return this.http.delete<void>(url).pipe(
        tap(() => {
          const index = this.todos.findIndex(todo => todo.id === id);
          if (index > -1) {
            this.todos.splice(index, 1);
            this.todoSubject.next(this.todos);
          }
        })
    );
  }

  private fetchTodos(): void {
    const url = `${this.apiBaseUrl}/getAll`;
    this.http.get<Todo[]>(url).subscribe(todos => {
      this.todos = todos;
      this.todoSubject.next(this.todos);
    });
  }
}
