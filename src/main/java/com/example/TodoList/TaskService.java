package com.example.TodoList;

// Spring imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// Java imports
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// @Service tells Spring Boot the this is a business service
// effectively makes this class a singleton and injects the dependency accordingly
@Service
public class TaskService {

    @Autowired // Spring dependency injection
    private TaskRepository taskRepository; // interface between Java and SQL

    /*
        Methods called by API endpoints
    */

    // all tasks
    public List<Task> getAllTasks(){
        List<Task> tasks = new ArrayList<>();
        taskRepository.findAll().forEach(tasks::add);
        return tasks;
    }

    // particular task
    public Optional<Task> getTask(int id){
        return taskRepository.findById(id);
    }

    // add new task
    public void addTask(Task task){
        taskRepository.save(task);
    }

    // update task
    public void updateTask(int id, Task task){
        taskRepository.save(task);
    }

    //delete task
    public void deleteTask(int id){
        taskRepository.deleteById(id);
    }




}
