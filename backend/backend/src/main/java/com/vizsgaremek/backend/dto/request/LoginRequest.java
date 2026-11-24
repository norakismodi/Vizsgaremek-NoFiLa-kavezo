package com.vizsgaremek.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email must be filled.")
    @Email(message = "Nem érvényes email formátum")
    private String email;

    @NotBlank(message = "Password must be filled.")
    private String password;

    private Boolean emlekezzRam;
}