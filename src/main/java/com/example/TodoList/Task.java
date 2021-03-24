package com.example.TodoList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

// @Entity tag tells Java Persistence API(JPA) that this is an entity class
// JPA assists with object relational mapping, or converting between Java objects and SQL records
@Entity
public class Task {

    // @Id tells JPA that this is the unique key
    // this primary key needs to be marked with AUTO_INCREMENT in SQL for @GeneratedValue to work
    @Id
    @GeneratedValue
    private int task_id;
    private String task_desc;
    private boolean task_comp;

    // no param constructor
    public Task() { }

    // full param constructor
    public Task(int task_id, String task_desc, boolean task_comp) {
        this.task_id = task_id;
        this.task_desc = task_desc;
        this.task_comp = task_comp;
    }

    // getters and setters
    public int getTask_id() {
        return task_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public String getTask_desc() {
        return task_desc;
    }

    public void setTask_desc(String task_desc) {
        this.task_desc = task_desc;
    }

    public boolean isTask_comp() {
        return task_comp;
    }

    public void setTask_comp(boolean task_comp) {
        this.task_comp = task_comp;
    }
}
