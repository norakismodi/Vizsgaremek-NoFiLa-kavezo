package com.vizsgaremek.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyCouponRequest {

    @NotBlank(message = "A kuponkód kötelező")
    @Size(max = 50, message = "A kuponkód legfeljebb 50 karakter lehet")
    private String couponCode;
}