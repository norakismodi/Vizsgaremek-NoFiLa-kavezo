package com.vizsgaremek.backend.repository;

import com.vizsgaremek.backend.model.BagItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BagItemRepository extends JpaRepository<BagItem, Integer> {
    List<BagItem> findByBagId(Integer bagId);

    Optional<BagItem> findByBagIdAndProductId(Integer bagId, Integer productId);
}