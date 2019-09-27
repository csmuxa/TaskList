import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../core/models/task.model';
import {TaskService} from '../core/services/task.service';
import {Subscription} from 'rxjs';
import {TaskDto} from '../core/models/taskDto.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  selectedTask: Task;
  errorMessage: string;
  private fetchTaskSubscription: Subscription;
  private createTaskSubscription: Subscription;
  private deleteTaskSubscription: Subscription;
  isEdit = false;
  newTaskDescription: string;
  newTaskCompleted: boolean;
  private editTaskSubscription: Subscription;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.fetchTaskSubscription = this.taskService.fetchTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      error => {
        this.errorMessage = error.message;
      });
  }

  onCreateTask() {
    const taskDto: TaskDto = new TaskDto();
    if (this.newTaskDescription.trim() === '') {
      return;
    }
    taskDto.description = this.newTaskDescription.trim();
    taskDto.completed = this.newTaskCompleted;
    this.createTaskSubscription = this.taskService.createTask(taskDto).subscribe(
      (createdTask) => {
        this.tasks.push(createdTask);
      }, error => {
        this.errorMessage = error.error.message;
      }, () => {
        this.cleanForm();
      }
    );
  }

  onDelete(targetTask: Task) {
    const taskIndex = this.tasks.findIndex((task) => targetTask.id === task.id);
    this.deleteTaskSubscription = this.taskService.deleteTask(targetTask.id).subscribe(
      () => {
        this.tasks.splice(taskIndex, 1);
      }
    );
  }

  onEdit(targetTask: Task) {
    this.isEdit = true;
    this.newTaskDescription = targetTask.description;
    this.newTaskCompleted = targetTask.completed;
    this.selectedTask = targetTask;
    this.errorMessage = '';
  }

  onEditSave() {
    const taskDto: TaskDto = new TaskDto();
    taskDto.completed = this.newTaskCompleted;
    taskDto.description = this.newTaskDescription;
    this.editTaskSubscription = this.taskService.updateTask(this.selectedTask.id, taskDto).subscribe(
      (updatedTask) => {
        const taskIndex = this.tasks.findIndex((task) => this.selectedTask.id === task.id);
        this.tasks[taskIndex] = updatedTask;
      }, error => {
        this.errorMessage = error.error.message;
      }, () => {
        this.cleanForm();
      }
    );
  }

  onCancelEdit() {
    this.cleanForm();
  }

  private cleanForm() {
    this.isEdit = false;
    this.selectedTask = null;
    this.newTaskDescription = '';
    this.newTaskCompleted = false;
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.fetchTaskSubscription.unsubscribe();
    this.createTaskSubscription.unsubscribe();
    this.deleteTaskSubscription.unsubscribe();
    this.editTaskSubscription.unsubscribe();
  }

}
