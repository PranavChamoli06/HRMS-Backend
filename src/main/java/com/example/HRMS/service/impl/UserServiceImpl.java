package com.example.HRMS.service.impl;

import com.example.HRMS.entity.Role;
import com.example.HRMS.entity.User;
import com.example.HRMS.repository.UserRepository;
import com.example.HRMS.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User updateUserRole(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 Critical: Enum conversion
        user.setRole(Role.valueOf(role.toUpperCase()));

        return userRepository.save(user);
    }

    public User createUser(String username, String password, String role) {

        User user = new User();

        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        // 🔥 FIX: convert String → Enum
        user.setRole(Role.valueOf(role.toUpperCase()));

        return userRepository.save(user);
    }
}