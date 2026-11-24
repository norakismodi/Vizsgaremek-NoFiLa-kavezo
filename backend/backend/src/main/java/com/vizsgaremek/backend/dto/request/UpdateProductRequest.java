package com.vizsgaremek.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {

    @NotNull(message = "A kategória azonosítója kötelező")
    private Integer categoryId;

    @NotBlank(message = "A név kötelező")
    @Size(max = 50, message = "A név legfeljebb 50 karakter lehet")
    private String name;

    @NotBlank(message = "A slug kötelező")
    @Size(max = 50, message = "A slug legfeljebb 50 karakter lehet")
    private String slug;

    @NotBlank(message = "A leírás kötelező")
    @Size(max = 100, message = "A leírás legfeljebb 100 karakter lehet")
    private String description;

    @NotNull(message = "Az ár kötelező")
    @DecimalMin(value = "0", message = "Az ár nem lehet negatív")
    private BigDecimal price;

    @NotBlank(message = "A kép URL kötelező")
    @Size(max = 100, message = "A kép URL legfeljebb 100 karakter lehet")
    private String imageUrl;

    @NotNull(message = "A készlet kötelező")
    @Min(value = 0, message = "A készlet nem lehet negatív")
    private Integer stock;
}