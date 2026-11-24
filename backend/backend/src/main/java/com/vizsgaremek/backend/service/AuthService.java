package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.dto.request.LoginRequest;
import com.vizsgaremek.backend.dto.response.UserResponse;
import com.vizsgaremek.backend.exception.UnauthorizedException;
import com.vizsgaremek.backend.model.Login;
import com.vizsgaremek.backend.model.User;
import com.vizsgaremek.backend.repository.LoginRepository;
import com.vizsgaremek.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final LoginRepository loginRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findActiveByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Hibás e-mail cím vagy jelszó"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Hibás e-mail cím vagy jelszó");
        }

        loginRepository.save(Login.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .emlekezzRam(Boolean.TRUE.equals(request.getEmlekezzRam()))
                .build());

        return userService.toResponseDto(user);
    }
}