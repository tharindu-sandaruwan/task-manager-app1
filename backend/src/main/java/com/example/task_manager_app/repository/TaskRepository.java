package com.example.task_manager_app.repository;

import com.example.task_manager_app.model.Status;
import com.example.task_manager_app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByStatus(Status status);
    List<Task> findByAssigneeEmail(String email);

}
