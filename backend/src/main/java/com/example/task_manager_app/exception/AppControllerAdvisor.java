package com.example.task_manager_app.exception;

import com.example.task_manager_app.controller.ResponseDTO.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppControllerAdvisor {


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({UserNameNotFoundException.class})
    public ErrorResponseDTO HandleException(Exception exception){
        ErrorResponseDTO errorResponse=new ErrorResponseDTO();
        errorResponse.setMessage(exception.getMessage());
        return errorResponse;
    }

}
