package com.task.services;


import com.task.entities.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    Task getTask(long id);
    Task updateTask(long id,Task task);
    Task createTask(Task task);
    void deleteTask(long id);
}
