package com.jdpj.book.dto;

public class UserResponse {

    private int id;
    private String userName;
    private String email;

    // Constructor
    public UserResponse(int id, String userName, String email) {
        this.id = id;
        this.userName = userName;
        this.email = email;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }
}

