package com.example.HRMS.service;

import com.example.HRMS.entity.User;

public interface UserService {
    User updateUserRole(Long id, String role);
    User createUser(String username, String password, String role);
}