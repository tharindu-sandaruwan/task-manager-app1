package com.example.task_manager_app.controller;

import com.example.task_manager_app.controller.RequestDTO.TaskRequestDTO;
import com.example.task_manager_app.controller.ResponseDTO.ApiResponseDTO;
import com.example.task_manager_app.controller.ResponseDTO.TaskResponseDTO;
import com.example.task_manager_app.model.Status;
import com.example.task_manager_app.model.Task;
import com.example.task_manager_app.service.TaskService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;



@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping(value = "/tasks")
    public ResponseEntity<ApiResponseDTO> create(@Valid @RequestBody TaskRequestDTO taskRequestDTO){
        Task task = taskService.createTask(taskRequestDTO);

        return ResponseEntity.status(201)
                .body(new ApiResponseDTO("Task created successfully", task));
    }

    @GetMapping(value = "/tasks")
    public List<TaskResponseDTO> getAll(){
        List <TaskResponseDTO> taskResponseDTOS=new ArrayList<>();
        List<Task> tasks=taskService.findAll();

        for(Task task:tasks){
            TaskResponseDTO taskResponseDTO=new TaskResponseDTO();
            taskResponseDTO.setId(task.getId());
            taskResponseDTO.setTitle(task.getTitle());
            taskResponseDTO.setDescription(task.getDescription());
            taskResponseDTO.setStatus(task.getStatus());
            taskResponseDTO.setPriority(task.getPriority());
            taskResponseDTO.setDueDate(task.getDueDate());
            taskResponseDTO.setAssigneeEmail(task.getAssigneeEmail());
            taskResponseDTO.setCompletedAt(task.getCompletedAt());

            taskResponseDTOS.add(taskResponseDTO);
        }
        return taskResponseDTOS;
    }

    @GetMapping("/tasks/status/{status}")
    public ResponseEntity<List<Task>> filterByStatus(@PathVariable Status status){

        return ResponseEntity.ok(taskService.findByStatus(status));
    }
    @GetMapping("/tasks/assignee/{email}")
    public ResponseEntity<List<TaskResponseDTO>> filterByAssignee(@PathVariable String email){

        List<Task> tasks = taskService.findByAssignee(email);
        List<TaskResponseDTO> response = new ArrayList<>();

        for(Task task : tasks){
            TaskResponseDTO dto = new TaskResponseDTO();
            dto.setId(task.getId());
            dto.setTitle(task.getTitle());
            dto.setDescription(task.getDescription());
            dto.setStatus(task.getStatus());
            dto.setPriority(task.getPriority());
            dto.setDueDate(task.getDueDate());
            dto.setAssigneeEmail(task.getAssigneeEmail());
            dto.setCompletedAt(task.getCompletedAt());

            response.add(dto);
        }

        return ResponseEntity.ok(response);
    }
    @GetMapping("/tasks/sort/dueDate")
    public ResponseEntity<List<Task>> sortByDueDate(){

        return ResponseEntity.ok(taskService.sortByDueDate());
    }
    @GetMapping("/tasks/sort/priority")
    public ResponseEntity<List<Task>> sortByPriority(){

        return ResponseEntity.ok(taskService.sortByPriority());
    }

    @PutMapping("/tasks/{task-id}")
    public void updateById(@PathVariable ("task-id") long id, @RequestBody TaskRequestDTO taskRequestDTO){
        taskService.updatask(id,taskRequestDTO);
    }

    @DeleteMapping (value = "/tasks/{task-id}")
    public ResponseEntity<ApiResponseDTO> deleteById(@PathVariable ("task-id") long id){
        taskService.deleteTask(id);
        return ResponseEntity.ok(
                new ApiResponseDTO("Task deleted successfully", null));
    }

    @PatchMapping("/tasks/{id}/complete")
    public ResponseEntity<ApiResponseDTO> markComplete(@PathVariable Long id){

        Task task = taskService.markComplete(id);

        return ResponseEntity.ok(
                new ApiResponseDTO("Task marked as completed", task));
    }



}
