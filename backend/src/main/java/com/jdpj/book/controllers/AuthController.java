package com.jdpj.book.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdpj.book.dao.UserRepository;
import com.jdpj.book.dto.LoginRequest;
import com.jdpj.book.dto.UserResponse;
import com.jdpj.book.models.User;
import com.jdpj.book.services.UserService;

@RestController // REST controller that handles HTTP requests
@RequestMapping("/api/auth") // The base path for all routes in this controller (backend)
public class AuthController {

    // Autowire for user related operations
    @Autowired
    private UserService userService;

    // Autowire for accessing the user data in the database
    @Autowired
    private UserRepository userRepository;

    // Autowire for the password encoder that encrypts passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    // PostMapping endpoint for registering a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Calls the UserService to save the user data into the database
        userService.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // PostMapping endpoint for user login
    @PostMapping("/signin")
    public ResponseEntity<UserResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        // Finds the user by email, if the user doesn't exist then throw an exception
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Compares the password from the request with the database stored password
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Returns the user details if the passwords match
            return ResponseEntity.ok(new UserResponse(
                    user.getId(),
                    user.getUserName(),
                    user.getEmail()
            ));
        }

        // Respond with unauthorized status if the passwords don't match
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}

