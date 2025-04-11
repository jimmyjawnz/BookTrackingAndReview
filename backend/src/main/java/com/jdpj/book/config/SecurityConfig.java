package com.jdpj.book.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.jdpj.book.security.CustomUserDetailsService;

// SecurityConfig class will define how authentication and authorization are handled
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Injects the custom user details service that loads user data during login
    @Autowired
    private CustomUserDetailsService userDetailsService;

    // Injects the password encoder used to hash plain-text passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Defines the security filter chain, setting up security rules for HTTP requests
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults()) // Enable CORS with default settings
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/register", "/signin", "/css/**", "/js/**", "/images/**").permitAll()
                        .requestMatchers("/").authenticated()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/signin") // Optional: custom login page
                        .defaultSuccessUrl("/", true) // Redirect after successful login
                        .permitAll()
                )
                .build(); // Build the security filter chain
    }

    // Expose the AuthenticationManager bean which provides manual authentication 
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
