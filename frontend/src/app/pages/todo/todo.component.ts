import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [];
  newTitle = '';
  newDesc = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
  }

  addTodo() {
    if (!this.newTitle.trim()) return;

    this.todoService
      .createTodo({
        title: this.newTitle,
        description: this.newDesc,
        completed: false,
      })
      .subscribe(() => {
        this.newTitle = '';
        this.newDesc = '';
        this.fetchTodos();
      });
  }

  toggle(todo: Todo) {
    this.todoService
      .updateTodo(todo.id, { completed: !todo.completed })
      .subscribe(() => this.fetchTodos());
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.fetchTodos());
  }
}
