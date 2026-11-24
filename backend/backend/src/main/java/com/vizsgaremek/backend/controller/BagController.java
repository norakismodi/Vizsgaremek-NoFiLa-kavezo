package com.vizsgaremek.backend.controller;

import com.vizsgaremek.backend.dto.request.AddBagItemRequest;
import com.vizsgaremek.backend.dto.request.ApplyCouponRequest;
import com.vizsgaremek.backend.dto.request.UpdateBagItemRequest;
import com.vizsgaremek.backend.dto.response.BagResponse;
import com.vizsgaremek.backend.service.BagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bags/{userId}")
@RequiredArgsConstructor
public class BagController {
    private final BagService bagService;

    @GetMapping
    public ResponseEntity<BagResponse> getBag(@PathVariable Integer userId) {
        return ResponseEntity.ok(bagService.getBag(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<BagResponse> addItem(@PathVariable Integer userId, @Valid @RequestBody AddBagItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bagService.addItem(userId, request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<BagResponse> updateItem(@PathVariable Integer userId, @PathVariable Integer itemId,
                                                  @Valid @RequestBody UpdateBagItemRequest request) {
        return ResponseEntity.ok(bagService.updateItem(userId, itemId, request));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<BagResponse> removeItem(@PathVariable Integer userId, @PathVariable Integer itemId) {
        return ResponseEntity.ok(bagService.removeItem(userId, itemId));
    }

    @PutMapping("/coupon")
    public ResponseEntity<BagResponse> applyCoupon(@PathVariable Integer userId, @Valid @RequestBody ApplyCouponRequest request) {
        return ResponseEntity.ok(bagService.applyCoupon(userId, request));
    }

    @DeleteMapping("/coupon")
    public ResponseEntity<BagResponse> removeCoupon(@PathVariable Integer userId) {
        return ResponseEntity.ok(bagService.removeCoupon(userId));
    }
}