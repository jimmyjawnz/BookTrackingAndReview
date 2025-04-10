package com.jdpj.book.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {

    public static void main(String[] args) {
        // Creates a new BCryptPasswordEncoder instance
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // The plain text password to hash
        String password = "Andrews";

        String hashedPassword = encoder.encode(password);

        // Print the hashed password
        System.out.println("Hashed password: " + hashedPassword);
    }
}
