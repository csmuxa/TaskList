package com.task.controllers;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.task.entities.Task;
import com.task.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("tasks")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TaskController {

    @Autowired
    TaskService taskService;


    @GetMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    public Task getTask(@PathVariable long id) {
        return taskService.getTask(id);
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping( produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping(path = "/{id}",produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    public Task updateTask(@RequestBody Task task,@PathVariable long id){
        Task updatedTask=taskService.updateTask(id,task);
        return updatedTask;
    }

    @DeleteMapping(path = "/{id}",produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity deteleTask(@PathVariable long id){
        taskService.deleteTask(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
