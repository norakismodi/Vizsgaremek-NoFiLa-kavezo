package com.vizsgaremek.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBagItemRequest {

    @NotNull(message = "A mennyiség kötelező")
    @Min(value = 1, message = "A mennyiség legalább 1 legyen")
    private Integer quantity;
}