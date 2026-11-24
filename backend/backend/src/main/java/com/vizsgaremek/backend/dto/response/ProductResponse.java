package com.vizsgaremek.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;
    private Integer categoryId;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Integer stock;
}