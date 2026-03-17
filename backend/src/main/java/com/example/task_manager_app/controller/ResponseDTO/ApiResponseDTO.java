package com.example.task_manager_app.controller.ResponseDTO;

public class ApiResponseDTO {
    private String message;


    public ApiResponseDTO() {}

    public ApiResponseDTO(String message, Object data) {
        this.message = message;

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
