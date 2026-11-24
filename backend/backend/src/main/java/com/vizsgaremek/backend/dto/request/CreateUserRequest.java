package com.vizsgaremek.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "Username must be filled.")
    @Size(max = 50)
    private String username;

    @NotBlank(message = "First name must be filled.")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "Last name must be filled.")
    @Size(max = 50)
    private String lastName;

    @NotBlank(message = "Email must be filled.")
    @Email(message = "Nem érvényes email formátum")
    @Size(max = 255)
    private String email;

    @NotBlank(message = "Password must be filled.")
    @Size(min = 6, max = 255, message = "Password must contain at least 6 characters.")
    private String password;
}