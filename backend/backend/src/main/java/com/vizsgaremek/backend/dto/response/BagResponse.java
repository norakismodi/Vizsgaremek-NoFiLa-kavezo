package com.vizsgaremek.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BagResponse {
    private Integer id;
    private Integer userId;
    private String couponCode;
    private List<BagItemResponse> items;
    private BigDecimal total;
}