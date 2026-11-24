package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.dto.request.CreateUserRequest;
import com.vizsgaremek.backend.dto.request.UpdateUserRequest;
import com.vizsgaremek.backend.dto.response.UserResponse;
import com.vizsgaremek.backend.exception.BadRequestException;
import com.vizsgaremek.backend.exception.EmailAlreadyExistsException;
import com.vizsgaremek.backend.exception.ResourceNotFoundException;
import com.vizsgaremek.backend.model.Role;
import com.vizsgaremek.backend.model.User;
import com.vizsgaremek.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsActiveByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Ez az e-mail cím már foglalt: " + request.getEmail());
        }
        if (userRepository.existsActiveByUsername(request.getUsername())) {
            throw new BadRequestException("Ez a felhasználónév már foglalt: " + request.getUsername());
        }

        User user = User.builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.user)
                .isDeleted(false)
                .build();

        return toResponseDto(userRepository.save(user));
    }

    public List<UserResponse> getAll() {
        return userRepository.findAllActive().stream()
                .map(this::toResponseDto)
                .toList();
    }

    public UserResponse getById(Integer id) {
        User user = userRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen felhasználó: " + id));
        return toResponseDto(user);
    }

    @Transactional
    public UserResponse updateUser(Integer id, UpdateUserRequest request) {
        User user = userRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen felhasználó: " + id));

        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsActiveByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Ez az e-mail cím már foglalt: " + request.getEmail());
        }
        if (!user.getUsername().equals(request.getUsername()) && userRepository.existsActiveByUsername(request.getUsername())) {
            throw new BadRequestException("Ez a felhasználónév már foglalt: " + request.getUsername());
        }

        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        return toResponseDto(userRepository.save(user));
    }

    @Transactional
    public void softDelete(Integer id) {
        User user = userRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen felhasználó: " + id));
        user.setIsDeleted(true);
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public UserResponse toResponseDto(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}