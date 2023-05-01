import {Component, Input} from '@angular/core';
import {Todo, TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  template: `
      <div class="task-indicator">
        {{ item.task }}
      </div>
      <div class="priority-indicator" [style.background-color]="color">
        {{ item.priority }}
      </div>
  `,
  styleUrls: ['todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() item!: Todo;
  constructor(private todoService: TodoService) {}

  get color() {
    switch (this.item.priority) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
    }
  }
  onDelete() {
    this.todoService.remove(this.item.id).subscribe(() => {
    });
  }
}
