package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.model.User;
import com.vizsgaremek.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("user");
        }
        return userRepository.save(user);
    }
}
