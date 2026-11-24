package com.vizsgaremek.backend.repository;

import com.vizsgaremek.backend.model.Bag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BagRepository extends JpaRepository<Bag, Integer> {
    Optional<Bag> findFirstByUserId(Integer userId);
}