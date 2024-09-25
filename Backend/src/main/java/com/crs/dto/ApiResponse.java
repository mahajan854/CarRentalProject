package com.crs.dto;

public class ApiResponse {
    public Long id;
    public boolean status;
    public String message;

    public ApiResponse() {
        status = false;
        message = "";
        id=0L;
    }

    public ApiResponse(boolean status, String message) {
        this.status = status;
        this.message = message;
    }
     public ApiResponse(boolean status, String message,Long id) {
        this.status = status;
        this.message = message;
        this.id=id;
    }

}
