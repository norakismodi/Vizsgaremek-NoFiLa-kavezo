package com.vizsgaremek.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bag_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BagItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kosar_id", nullable = false)
    private Integer bagId;

    @Column(name = "termek_id", nullable = false)
    private Integer productId;

    @Column(name = "mennyiseg", nullable = false)
    private Integer quantity;
}