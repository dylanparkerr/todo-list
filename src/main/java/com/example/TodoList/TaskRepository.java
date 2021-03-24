package com.example.TodoList;

import org.springframework.data.repository.CrudRepository;

// This class takes advantage of the methods provided CrudRepository
// Acts as an interface between Java and SQL
public interface TaskRepository extends CrudRepository<Task,Integer> {

}
