package com.jdpj.book.dto;

// DTO to send user information such as id, username, and email
public class UserResponse {

    private int id;
    private String userName;
    private String email;

    // Constructor initializes all fields of UserResponse
    public UserResponse(int id, String userName, String email) {
        this.id = id;
        this.userName = userName;
        this.email = email;
    }

    // Getters for user id, username, and email
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

