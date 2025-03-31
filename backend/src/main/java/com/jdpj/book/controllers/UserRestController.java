package com.jdpj.book.controllers;

import com.jdpj.book.models.User;
import com.jdpj.book.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        userService = userService;
    }

    // expose "/users" and return a list of users
    @GetMapping("/users")
    public List<User> findAll() {
        return userService.findAll();
    }

    // add mapping for GET /users/{userId}
    @GetMapping("/users/{userId}")
    public User getuser(@PathVariable int userId) {

        User user = userService.findById(userId);

        if (user == null) {
            throw new RuntimeException("User id not found - " + userId);
        }

        return user;
    }

    // add mapping for POST /users - add new user
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {

        user.setId(0);

        return userService.save(user);
    }

    // add mapping for PUT /users - update existing user
    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {

        return userService.save(user);
    }

    // add mapping for DELETE /users/{userId} - delete user
    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId) {

        User dbUser = userService.findById(userId);

        if (dbUser == null) {
            throw new RuntimeException("user id not found - " + userId);
        }

        userService.deleteById(userId);

        return "Deleted user id - " + userId;
    }

}
