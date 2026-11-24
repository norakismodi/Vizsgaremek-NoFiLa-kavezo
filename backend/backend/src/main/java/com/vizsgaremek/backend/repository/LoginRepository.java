package com.vizsgaremek.backend.repository;

import com.vizsgaremek.backend.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Integer> {
}