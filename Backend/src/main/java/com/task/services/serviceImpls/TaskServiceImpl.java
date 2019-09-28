package com.task.services.serviceImpls;

import com.task.Exceptions.TaskException;
import com.task.entities.Task;
import com.task.repositories.TaskRepository;
import com.task.services.TaskService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTask(long id) {
        if (taskRepository.findById(id) == null) throw new TaskException("Task not found");
        Task task = taskRepository.getOne(id);
        return task;
    }

    @Override
    public Task updateTask(long id, Task task) {
        Task existingTask = taskRepository.findById(id);
        if (existingTask == null) throw new TaskException("Task not found");
        if (taskRepository.findByDescription(task.getDescription()) != null &&
                !existingTask.getDescription().equals(task.getDescription()))
            throw new TaskException("Task already exists");
        if(task.getDescription()==null || task.getDescription().trim().equals(""))throw new TaskException("Field is empty");
        existingTask.setCompleted(task.isCompleted());
        existingTask.setDescription(task.getDescription());
        taskRepository.save(existingTask);
        return existingTask;

    }

    public Task createTask(Task task) {
        if (taskRepository.findByDescription(task.getDescription()) != null)
            throw new TaskException("Task already exists");
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(long id) {
        Task existingTask = taskRepository.findById(id);
        if (existingTask == null) throw new TaskException("Task not found");
        taskRepository.delete(existingTask);
    }
}

