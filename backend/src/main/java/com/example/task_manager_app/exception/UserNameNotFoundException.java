package com.example.task_manager_app.exception;

public class UserNameNotFoundException extends RuntimeException{

    public UserNameNotFoundException(String message){
        super(message);
    }
}
