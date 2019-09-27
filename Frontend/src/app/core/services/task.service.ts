import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TaskDto} from '../models/taskDto.model';


@Injectable({providedIn: 'root'})
export class TaskService {

  private URL = 'http://localhost:8080/tasks/';

  constructor(private http: HttpClient) {
  }

  createTask(taskDto: TaskDto): Observable<Task> {
    return this.http.post(this.URL, taskDto).pipe(
      map((createdTask: Task) => createdTask)
    );
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get(`${this.URL}/${taskId}`).pipe(
      map((task: Task) => task)
    );
  }

  updateTask(taskId: number, taskDto: TaskDto): Observable<Task> {
    return this.http.put(`${this.URL}/${taskId}`, taskDto).pipe(
      map((updatedTask: Task) => updatedTask)
    );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${taskId}`);
  }

  fetchTasks(): Observable<Task[]> {
    return this.http.get(this.URL).pipe(
      map((tasks: Task[]) => tasks)
    );
  }
}

