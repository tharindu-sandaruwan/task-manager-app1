package com.example.task_manager_app.controller;

import com.example.task_manager_app.controller.RequestDTO.UserRequestDTO;
import com.example.task_manager_app.controller.ResponseDTO.ApiResponseDTO;
import com.example.task_manager_app.controller.ResponseDTO.UserResponseDTO;
import com.example.task_manager_app.model.User;
import com.example.task_manager_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/users")
    public ResponseEntity<ApiResponseDTO> create(@RequestBody UserRequestDTO userRequestDTO){

        User user=userService.create(userRequestDTO);
        return ResponseEntity.status(201)
                .body(new ApiResponseDTO("User created successfully", user));
    }

    @GetMapping(value = "/users")
    public List<UserResponseDTO> getAll(){
        List<UserResponseDTO> userResponseDTO=new ArrayList<>();
        List<User> users=userService.findAll();
        for(User user:users){
            UserResponseDTO userResponseDTOs=new UserResponseDTO();
            userResponseDTOs.setId(user.getId());
            userResponseDTOs.setUsername(user.getUsername());
            userResponseDTOs.setEmail(user.getEmail());
            userResponseDTOs.setPassword(user.getPassword());
            userResponseDTO.add(userResponseDTOs);
        }
        return userResponseDTO;
    }

}
