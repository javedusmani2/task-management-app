import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log("Step1::::",tasks);
      this.tasks = tasks;
    });
  }

  createTask() {
    this.taskService.createTask({ title: this.newTaskTitle }).subscribe(task => {
      this.tasks.push(task);
      this.newTaskTitle = '';
    });
  }

  updateTask(task: any) {
    this.taskService.updateTask(task._id, { title: task.title, completed: task.completed }).subscribe();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== id);
    });
  }
}
