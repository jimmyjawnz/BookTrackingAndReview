package com.jdpj.book.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jdpj.book.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Custom method to retrieve a user and their data by their email
    Optional<User> findByEmail(String email);
}
