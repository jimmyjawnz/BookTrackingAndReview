package com.jdpj.book.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jdpj.book.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
