package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.dto.request.CreateProductRequest;
import com.vizsgaremek.backend.dto.request.UpdateProductRequest;
import com.vizsgaremek.backend.dto.response.ProductResponse;
import com.vizsgaremek.backend.exception.BadRequestException;
import com.vizsgaremek.backend.exception.ResourceNotFoundException;
import com.vizsgaremek.backend.model.Product;
import com.vizsgaremek.backend.repository.CategoryRepository;
import com.vizsgaremek.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        checkCategory(request.getCategoryId());
        if (productRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Ez a slug már foglalt: " + request.getSlug());
        }

        Product product = Product.builder()
                .categoryId(request.getCategoryId())
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .stock(request.getStock())
                .isDeleted(false)
                .build();
        return toResponseDto(productRepository.save(product));
    }

    // categoryId megadása esetén csak az adott kategória termékei
    public List<ProductResponse> getAll(Integer categoryId) {
        List<Product> products = categoryId == null
                ? productRepository.findAllActive()
                : productRepository.findActiveByCategoryId(categoryId);
        return products.stream().map(this::toResponseDto).toList();
    }

    public ProductResponse getById(Integer id) {
        Product product = productRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen termék: " + id));
        return toResponseDto(product);
    }

    @Transactional
    public ProductResponse updateProduct(Integer id, UpdateProductRequest request) {
        Product product = productRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen termék: " + id));
        checkCategory(request.getCategoryId());
        if (!product.getSlug().equals(request.getSlug()) && productRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Ez a slug már foglalt: " + request.getSlug());
        }

        product.setCategoryId(request.getCategoryId());
        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setStock(request.getStock());
        return toResponseDto(productRepository.save(product));
    }

    @Transactional
    public void softDelete(Integer id) {
        Product product = productRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen termék: " + id));
        product.setIsDeleted(true);
        product.setDeletedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    private void checkCategory(Integer categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Nincs ilyen kategória: " + categoryId);
        }
    }

    private ProductResponse toResponseDto(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .categoryId(product.getCategoryId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .stock(product.getStock())
                .build();
    }
}