package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.dto.request.CreateCategoryRequest;
import com.vizsgaremek.backend.dto.response.CategoryResponse;
import com.vizsgaremek.backend.exception.BadRequestException;
import com.vizsgaremek.backend.exception.ResourceNotFoundException;
import com.vizsgaremek.backend.model.Category;
import com.vizsgaremek.backend.repository.CategoryRepository;
import com.vizsgaremek.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Ez a slug már foglalt: " + request.getSlug());
        }
        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .build();
        return toResponseDto(categoryRepository.save(category));
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponseDto)
                .toList();
    }

    public CategoryResponse getById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen kategória: " + id));
        return toResponseDto(category);
    }

    @Transactional
    public CategoryResponse updateCategory(Integer id, CreateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen kategória: " + id));
        if (!category.getSlug().equals(request.getSlug()) && categoryRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Ez a slug már foglalt: " + request.getSlug());
        }
        category.setName(request.getName());
        category.setSlug(request.getSlug());
        return toResponseDto(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen kategória: " + id));
        if (productRepository.existsByCategoryId(id)) {
            throw new BadRequestException("A kategória nem törölhető, mert tartoznak hozzá termékek");
        }
        categoryRepository.delete(category);
    }

    private CategoryResponse toResponseDto(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .build();
    }
}