package com.capstone.capstone_design.domain.user.controller;

import com.capstone.capstone_design.domain.coupon.dto.UserCouponResponseDto;
import com.capstone.capstone_design.domain.dibs.dto.DibsResponseDto;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.review.dto.ReviewResponseDto;
import com.capstone.capstone_design.domain.user.dto.UserResponseDto;
import com.capstone.capstone_design.domain.user.dto.UserTasteDto;
import com.capstone.capstone_design.domain.user.dto.UserUpdateRequestDto;
import com.capstone.capstone_design.domain.user.service.MenuRecommendationService;
import com.capstone.capstone_design.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "유저 관련 API")
public class UserController {
    private final UserService userService;
    private final MenuRecommendationService menuRecommendationService;

    @GetMapping("/me")
    @Operation(summary = "유저 정보 조회")
    public ResponseEntity<UserResponseDto> getMeInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @PutMapping("/me")
    @Operation(summary = "유저 정보 수정")
    public ResponseEntity<Void> updateMyInfo(@RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        userService.updateMyInfo(userUpdateRequestDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me")
    @Operation(summary = "유저 정보 삭제")
    public ResponseEntity<Void> deleteMyAccount() {
        userService.deleteMyAccount();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/tastes")
    @Operation(summary = "유저 맛 정보 조회")
    public ResponseEntity<UserTasteDto> getMyTastes() {
        return ResponseEntity.ok(userService.getMyTastes());
    }

    @PutMapping("/me/tastes")
    @Operation(summary = "유저 맛 정보 수정")
    public ResponseEntity<Void> updateMyTastes(@RequestBody UserTasteDto tasteRequestDto) {
        userService.updateMyTastes(tasteRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me/dibs")
    @Operation(summary = "유저 찜 목록 조회")
    public ResponseEntity<List<DibsResponseDto>> getMyDibs() {
        return ResponseEntity.ok(userService.getMyDibs());
    }

    @GetMapping("/me/orders")
    @Operation(summary = "유저 주문 목록 조회")
    public ResponseEntity<List<OrderResponseDto>> getMyOrders() {
        return ResponseEntity.ok(userService.getMyOrders());
    }

    @GetMapping("/me/reviews")
    @Operation(summary = "유저 리뷰 목록 조회")
    public ResponseEntity<List<ReviewResponseDto>> getMyReviews() {
        return ResponseEntity.ok(userService.getMyReviews());
    }

    @GetMapping("/me/coupons")
    @Operation(summary = "유저 쿠폰 목록 조회")
    public ResponseEntity<List<UserCouponResponseDto>> getMyCoupons() {
        return ResponseEntity.ok(userService.getMyCoupons());
    }

}
