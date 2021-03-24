package com.example.TodoList;

// Spring imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
// Java imports
import java.util.List;
import java.util.Optional;

// @RestController tells Spring this class directs actions depending on what endpoints are hit
// @RequestMapping before the class means any mappings in the class will assume this root
@RestController
@RequestMapping("/tasks")
public class TaskController {

    //class fields
    @Autowired // Spring dependency injection
    TaskService taskService;

    /*
        these methods define behaviors for certain HTTP methods sent to API endpoints
    */
    @GetMapping // get request to /tasks
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}") // get request to /tasks/$id
    public Optional<Task> getTask(@PathVariable int id){
        return taskService.getTask(id);
    }

    @PostMapping // post(create) request to /tasks
    public void addTask(@RequestBody Task task){
        taskService.addTask(task);
    }

    @PutMapping("/{id}") // put(update) request to /tasks/$id
    public void updateTask(@PathVariable int id, @RequestBody Task task){
        taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}") // delete request to /tasks/$id
    public void deleteTask(@PathVariable int id){
        taskService.deleteTask(id);
    }


}
