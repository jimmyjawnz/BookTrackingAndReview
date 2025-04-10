package com.jdpj.book.dto;

// DTO to capture login request data from the user
public class LoginRequest {
    private String email; 
    private String password; // The user's unhashed password input

    // Constructors to initialize the email and password fields
    public LoginRequest() {}
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and setters for both email and password
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}