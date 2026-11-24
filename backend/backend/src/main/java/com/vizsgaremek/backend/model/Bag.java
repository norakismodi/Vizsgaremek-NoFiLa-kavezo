package com.vizsgaremek.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bag")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "kuponkod", length = 50)
    private String couponCode;

    @Column(name = "created", insertable = false, updatable = false)
    private LocalDateTime created;
}