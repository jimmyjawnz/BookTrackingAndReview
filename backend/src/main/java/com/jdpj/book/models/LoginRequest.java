package com.jdpj.book.models;

public class LoginRequest {
    private String userName;
    private String password;

    // Constructors
    public LoginRequest() {}
    public LoginRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    // Getters and setters
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}