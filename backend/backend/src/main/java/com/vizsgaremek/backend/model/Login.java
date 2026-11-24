package com.vizsgaremek.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "login")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "emlekezz_ram", nullable = false, columnDefinition = "TINYINT")
    private Boolean emlekezzRam;
}