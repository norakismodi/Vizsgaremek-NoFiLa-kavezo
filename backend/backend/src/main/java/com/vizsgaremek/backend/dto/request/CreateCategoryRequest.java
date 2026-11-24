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
public class CreateCategoryRequest {

    @NotBlank(message = "A név kötelező")
    @Size(max = 50, message = "A név legfeljebb 50 karakter lehet")
    private String name;

    @NotBlank(message = "A slug kötelező")
    @Size(max = 50, message = "A slug legfeljebb 50 karakter lehet")
    private String slug;
}