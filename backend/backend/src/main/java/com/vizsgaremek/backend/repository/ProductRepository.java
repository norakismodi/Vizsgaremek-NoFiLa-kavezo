package com.vizsgaremek.backend.repository;

import com.vizsgaremek.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsBySlug(String slug);

    boolean existsByCategoryId(Integer categoryId);

    @Query("SELECT p FROM Product p WHERE p.isDeleted = false OR p.isDeleted IS NULL")
    List<Product> findAllActive();

    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryId AND (p.isDeleted = false OR p.isDeleted IS NULL)")
    List<Product> findActiveByCategoryId(@Param("categoryId") Integer categoryId);

    @Query("SELECT p FROM Product p WHERE p.id = :id AND (p.isDeleted = false OR p.isDeleted IS NULL)")
    Optional<Product> findActiveById(@Param("id") Integer id);
}