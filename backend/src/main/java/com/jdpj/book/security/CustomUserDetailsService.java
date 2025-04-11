package com.jdpj.book.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jdpj.book.dao.UserRepository;
import com.jdpj.book.models.User;

@Service // Marked as a Spring service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Loads user specific data by email (used as the username in this case)
    // Used during authentication to verify a user
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Attempts to find the user in the database by their email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Uses the user's username and hashed password to return the userdetails object
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")) // Default Spring Security role
        );
    }
}
