package com.capstone.capstone_design.domain.coupon.controller;

import com.capstone.capstone_design.domain.coupon.dto.CouponResponseDto;
import com.capstone.capstone_design.domain.coupon.dto.UserCouponResponseDto;
import com.capstone.capstone_design.domain.coupon.service.UserCouponService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/coupons")
@RequiredArgsConstructor
@Tag(name = "쿠폰 API (사용자)")
public class CouponController {

    private final UserCouponService userCouponService;

    // 받을 수 있는 쿠폰 목록 조회
    @GetMapping("/available")
    @Operation(summary = "받을 수 있는 쿠폰 목록 조회", description = "현재 발급 가능한 쿠폰 목록을 조회합니다.")
    public ResponseEntity<List<CouponResponseDto>> getAvailableCoupons() {
        return ResponseEntity.ok(userCouponService.getAvailableCoupons());
    }

    // 쿠폰 받기 (선착순)
    @PostMapping("/{couponId}/claim")
    @Operation(summary = "쿠폰 받기", description = "선착순으로 쿠폰을 발급받습니다. 중복 발급 불가.")
    public ResponseEntity<UserCouponResponseDto> claimCoupon(@PathVariable Long couponId) {
        UserCouponResponseDto response = userCouponService.claimCoupon(couponId);
        return ResponseEntity.ok(response);
    }

    // 내 쿠폰 목록 조회
    @GetMapping("/me")
    @Operation(summary = "내 쿠폰 목록 조회", description = "발급받은 모든 쿠폰을 조회합니다.")
    public ResponseEntity<List<UserCouponResponseDto>> getMyCoupons() {
        return ResponseEntity.ok(userCouponService.getMyCoupons());
    }

    // 사용 가능한 내 쿠폰 목록 조회
    @GetMapping("/me/active")
    @Operation(summary = "사용 가능한 내 쿠폰 목록 조회", description = "사용 가능한 쿠폰만 조회합니다.")
    public ResponseEntity<List<UserCouponResponseDto>> getMyActiveCoupons() {
        return ResponseEntity.ok(userCouponService.getMyActiveCoupons());
    }

    // 쿠폰 상세 조회
    @GetMapping("/me/{userCouponId}")
    @Operation(summary = "내 쿠폰 상세 조회")
    public ResponseEntity<UserCouponResponseDto> getUserCouponById(@PathVariable Long userCouponId) {
        return ResponseEntity.ok(userCouponService.getUserCouponById(userCouponId));
    }
}
