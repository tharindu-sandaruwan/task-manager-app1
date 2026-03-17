package com.example.task_manager_app.service;

import com.example.task_manager_app.controller.RequestDTO.TaskRequestDTO;
import com.example.task_manager_app.model.Status;
import com.example.task_manager_app.model.Task;

import java.util.List;

public interface TaskService {

    Task createTask(TaskRequestDTO taskRequestDTO);
    List<Task> findAll();
    List<Task> findByStatus(Status status);
    List<Task> findByAssignee(String email);
    List<Task> sortByDueDate();
    List<Task> sortByPriority();
    Task updatask(Long id, TaskRequestDTO taskRequestDTO);
    void deleteTask(Long id);
    Task markComplete(Long id);


}
