package com.vizsgaremek.backend.repository;

import com.vizsgaremek.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.email = :email AND (u.isDeleted = false OR u.isDeleted IS NULL)")
    Optional<User> findActiveByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.id = :id AND (u.isDeleted = false OR u.isDeleted IS NULL)")
    Optional<User> findActiveById(@Param("id") Integer id);

    @Query("SELECT u FROM User u WHERE u.isDeleted = false OR u.isDeleted IS NULL")
    List<User> findAllActive();

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email AND (u.isDeleted = false OR u.isDeleted IS NULL)")
    boolean existsActiveByEmail(@Param("email") String email);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.username = :username AND (u.isDeleted = false OR u.isDeleted IS NULL)")
    boolean existsActiveByUsername(@Param("username") String username);
}