package com.example.task_manager_app.service.impl;

import com.example.task_manager_app.controller.RequestDTO.TaskRequestDTO;
import com.example.task_manager_app.exception.UserNameNotFoundException;
import com.example.task_manager_app.model.Priority;
import com.example.task_manager_app.model.Status;
import com.example.task_manager_app.model.Task;
import com.example.task_manager_app.model.User;
import com.example.task_manager_app.repository.TaskRepository;
import com.example.task_manager_app.repository.UserRepository;
import com.example.task_manager_app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Task createTask(TaskRequestDTO taskRequestDTO) {
         Task task=new Task();
         task.setTitle(taskRequestDTO.getTitle());
         task.setDescription(taskRequestDTO.getDescription());
         task.setStatus(Status.TODO);
         task.setPriority(taskRequestDTO.getPriority());
         task.setDueDate(taskRequestDTO.getDueDate());
        if(taskRequestDTO.getAssigneeEmail() != null){

            User user = userRepository.findByEmail(taskRequestDTO.getAssigneeEmail())
                    .orElseThrow(() -> new UserNameNotFoundException("User not found"));

            task.setAssigneeEmail(user.getEmail());
        }
         task.setCreatedAt(LocalDateTime.now());


         return taskRepository.save(task);

    }

    @Override
    public List<Task> findAll() {
        List<Task> taskList = taskRepository.findAll();
        return taskList;
    }

    @Override
    public List<Task> findByStatus(Status status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> findByAssignee(String email) {
        return taskRepository.findByAssigneeEmail(email);
    }

    @Override
    public List<Task> sortByDueDate() {
        return taskRepository.findAll(Sort.by(Sort.Direction.ASC,"dueDate"));
    }

    @Override
    public List<Task> sortByPriority() {
        return taskRepository.findAll(Sort.by(Sort.Direction.ASC,"priority"));
    }

    @Override
    public Task updatask(Long id, TaskRequestDTO taskRequestDTO) {
        Task task = taskRepository.findById(id).orElseThrow(()->new RuntimeException("Task Id" +id+ "not found"));

        task.setTitle(taskRequestDTO.getTitle());
        task.setDescription(taskRequestDTO.getDescription());
        task.setStatus(taskRequestDTO.getStatus());
        task.setPriority(taskRequestDTO.getPriority());
        task.setDueDate(taskRequestDTO.getDueDate());
        task.setAssigneeEmail(taskRequestDTO.getAssigneeEmail());
        task.setCreatedAt(taskRequestDTO.getCreatedAt());

        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task markComplete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setStatus(Status.DONE);
        task.setCompletedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }
}
