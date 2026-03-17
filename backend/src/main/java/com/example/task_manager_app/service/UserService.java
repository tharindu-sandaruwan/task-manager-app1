package com.example.task_manager_app.service;

import com.example.task_manager_app.controller.RequestDTO.UserRequestDTO;
import com.example.task_manager_app.model.User;

import java.util.List;

public interface UserService {

    User create (UserRequestDTO userRequestDTO);

    List<User> findAll();

}
