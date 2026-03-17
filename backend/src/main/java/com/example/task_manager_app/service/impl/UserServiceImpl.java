package com.example.task_manager_app.service.impl;

import com.example.task_manager_app.controller.RequestDTO.UserRequestDTO;
import com.example.task_manager_app.model.User;
import com.example.task_manager_app.repository.UserRepository;
import com.example.task_manager_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User create(UserRequestDTO userRequestDTO) {

        Optional<User> userOptional=userRepository.findByUsername(userRequestDTO.getUsername());

        if(userOptional.isPresent()){
            throw new RuntimeException("User Already exist");
        }else {
            User user=new User();
            user.setUsername(userRequestDTO.getUsername());
            user.setEmail(userRequestDTO.getEmail());
            user.setPassword(userRequestDTO.getPassword());

           return userRepository.save(user);
        }

    }

    @Override
    public List<User> findAll() {
        List<User> users=userRepository.findAll();
        return users;
    }
}
