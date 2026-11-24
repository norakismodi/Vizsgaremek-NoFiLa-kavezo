package com.vizsgaremek.backend.service;

import com.vizsgaremek.backend.dto.request.AddBagItemRequest;
import com.vizsgaremek.backend.dto.request.ApplyCouponRequest;
import com.vizsgaremek.backend.dto.request.UpdateBagItemRequest;
import com.vizsgaremek.backend.dto.response.BagItemResponse;
import com.vizsgaremek.backend.dto.response.BagResponse;
import com.vizsgaremek.backend.exception.BadRequestException;
import com.vizsgaremek.backend.exception.ResourceNotFoundException;
import com.vizsgaremek.backend.model.Bag;
import com.vizsgaremek.backend.model.BagItem;
import com.vizsgaremek.backend.model.Product;
import com.vizsgaremek.backend.repository.BagItemRepository;
import com.vizsgaremek.backend.repository.BagRepository;
import com.vizsgaremek.backend.repository.ProductRepository;
import com.vizsgaremek.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BagService {
    private final BagRepository bagRepository;
    private final BagItemRepository bagItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // A felhasználó kosarát adja vissza, ha még nincs, létrehozza
    @Transactional
    public BagResponse getBag(Integer userId) {
        return toResponseDto(getOrCreateBag(userId));
    }

    @Transactional
    public BagResponse addItem(Integer userId, AddBagItemRequest request) {
        Bag bag = getOrCreateBag(userId);
        Product product = productRepository.findActiveById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen termék: " + request.getProductId()));

        BagItem item = bagItemRepository.findByBagIdAndProductId(bag.getId(), product.getId())
                .orElse(null);
        int newQuantity = request.getQuantity() + (item == null ? 0 : item.getQuantity());
        checkStock(product, newQuantity);

        if (item == null) {
            item = BagItem.builder()
                    .bagId(bag.getId())
                    .productId(product.getId())
                    .quantity(newQuantity)
                    .build();
        } else {
            item.setQuantity(newQuantity);
        }
        bagItemRepository.save(item);
        return toResponseDto(bag);
    }

    @Transactional
    public BagResponse updateItem(Integer userId, Integer itemId, UpdateBagItemRequest request) {
        Bag bag = getOrCreateBag(userId);
        BagItem item = findItemOfBag(bag, itemId);
        Product product = productRepository.findActiveById(item.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("A termék már nem elérhető: " + item.getProductId()));
        checkStock(product, request.getQuantity());

        item.setQuantity(request.getQuantity());
        bagItemRepository.save(item);
        return toResponseDto(bag);
    }

    @Transactional
    public BagResponse removeItem(Integer userId, Integer itemId) {
        Bag bag = getOrCreateBag(userId);
        BagItem item = findItemOfBag(bag, itemId);
        bagItemRepository.delete(item);
        return toResponseDto(bag);
    }

    @Transactional
    public BagResponse applyCoupon(Integer userId, ApplyCouponRequest request) {
        Bag bag = getOrCreateBag(userId);
        bag.setCouponCode(request.getCouponCode());
        bagRepository.save(bag);
        return toResponseDto(bag);
    }

    @Transactional
    public BagResponse removeCoupon(Integer userId) {
        Bag bag = getOrCreateBag(userId);
        bag.setCouponCode(null);
        bagRepository.save(bag);
        return toResponseDto(bag);
    }

    private Bag getOrCreateBag(Integer userId) {
        userRepository.findActiveById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen felhasználó: " + userId));
        return bagRepository.findFirstByUserId(userId)
                .orElseGet(() -> bagRepository.save(Bag.builder().userId(userId).build()));
    }

    private BagItem findItemOfBag(Bag bag, Integer itemId) {
        BagItem item = bagItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen kosártétel: " + itemId));
        if (!item.getBagId().equals(bag.getId())) {
            throw new ResourceNotFoundException("Nincs ilyen kosártétel: " + itemId);
        }
        return item;
    }

    private void checkStock(Product product, int quantity) {
        if (quantity > product.getStock()) {
            throw new BadRequestException("Nincs elég készlet: " + product.getName()
                    + " (elérhető: " + product.getStock() + ")");
        }
    }

    private BagResponse toResponseDto(Bag bag) {
        List<BagItem> items = bagItemRepository.findByBagId(bag.getId());

        List<BagItemResponse> itemResponses = items.stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Nincs ilyen termék: " + item.getProductId()));
                    return BagItemResponse.builder()
                            .id(item.getId())
                            .productId(product.getId())
                            .productName(product.getName())
                            .price(product.getPrice())
                            .quantity(item.getQuantity())
                            .subtotal(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                            .build();
                })
                .toList();

        BigDecimal total = itemResponses.stream()
                .map(BagItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return BagResponse.builder()
                .id(bag.getId())
                .userId(bag.getUserId())
                .couponCode(bag.getCouponCode())
                .items(itemResponses)
                .total(total)
                .build();
    }
}