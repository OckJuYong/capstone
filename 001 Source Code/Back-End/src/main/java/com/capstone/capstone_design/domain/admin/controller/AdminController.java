package com.capstone.capstone_design.domain.admin.controller;

import com.capstone.capstone_design.domain.admin.dto.RestaurantCreateRequestDto;
import com.capstone.capstone_design.domain.admin.service.AdminService;
import com.capstone.capstone_design.domain.coupon.dto.CouponCreateRequestDto;
import com.capstone.capstone_design.domain.coupon.dto.CouponResponseDto;
import com.capstone.capstone_design.domain.coupon.dto.CouponUpdateRequestDto;
import com.capstone.capstone_design.domain.coupon.service.CouponService;
import com.capstone.capstone_design.domain.notice.dto.NoticeCreateRequestDto;
import com.capstone.capstone_design.domain.notice.dto.NoticeUpdateRequestDto;
import com.capstone.capstone_design.domain.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "어드민 API")
public class AdminController {

    private final AdminService adminService;
    private final NoticeService noticeService;
    private final CouponService couponService;

    // 식당 추가
    @PostMapping("/restaurants")
    @Operation(summary = "식당 추가")
    public ResponseEntity<Void> addRestaurant(@RequestBody RestaurantCreateRequestDto requestDto){
        adminService.addRestaurant(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 공지사항 생성
    @PostMapping("/notices")
    @Operation(summary = "공지사항 생성")
    public ResponseEntity<Void> createNotice(@RequestBody NoticeCreateRequestDto requestDto){
        noticeService.createNotice(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 공지사항 수정
    @PutMapping("/notices/{noticeId}")
    @Operation(summary = "공지사항 수정")
    public ResponseEntity<Void> updateNotice(
            @PathVariable Long noticeId,
            @RequestBody NoticeUpdateRequestDto requestDto){
        noticeService.updateNotice(noticeId, requestDto);
        return ResponseEntity.ok().build();
    }

    // 공지사항 삭제
    @DeleteMapping("/notices/{noticeId}")
    @Operation(summary = "공지사항 삭제")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long noticeId){
        noticeService.deleteNotice(noticeId);
        return ResponseEntity.noContent().build();
    }

    // ===== 쿠폰 관리 =====

    // 쿠폰 생성
    @PostMapping("/coupons")
    @Operation(summary = "쿠폰 템플릿 생성")
    public ResponseEntity<CouponResponseDto> createCoupon(@RequestBody CouponCreateRequestDto requestDto) {
        CouponResponseDto response = couponService.createCoupon(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 쿠폰 목록 조회
    @GetMapping("/coupons")
    @Operation(summary = "쿠폰 목록 조회 (전체)")
    public ResponseEntity<List<CouponResponseDto>> getAllCoupons() {
        return ResponseEntity.ok(couponService.getAllCoupons());
    }

    // 쿠폰 상세 조회
    @GetMapping("/coupons/{couponId}")
    @Operation(summary = "쿠폰 상세 조회")
    public ResponseEntity<CouponResponseDto> getCouponById(@PathVariable Long couponId) {
        return ResponseEntity.ok(couponService.getCouponById(couponId));
    }

    // 쿠폰 수정
    @PutMapping("/coupons/{couponId}")
    @Operation(summary = "쿠폰 수정")
    public ResponseEntity<CouponResponseDto> updateCoupon(
            @PathVariable Long couponId,
            @RequestBody CouponUpdateRequestDto requestDto) {
        CouponResponseDto response = couponService.updateCoupon(couponId, requestDto);
        return ResponseEntity.ok(response);
    }

    // 쿠폰 비활성화
    @PutMapping("/coupons/{couponId}/deactivate")
    @Operation(summary = "쿠폰 비활성화")
    public ResponseEntity<Void> deactivateCoupon(@PathVariable Long couponId) {
        couponService.deactivateCoupon(couponId);
        return ResponseEntity.ok().build();
    }

    // 쿠폰 활성화
    @PutMapping("/coupons/{couponId}/activate")
    @Operation(summary = "쿠폰 활성화")
    public ResponseEntity<Void> activateCoupon(@PathVariable Long couponId) {
        couponService.activateCoupon(couponId);
        return ResponseEntity.ok().build();
    }

    // 쿠폰 삭제
    @DeleteMapping("/coupons/{couponId}")
    @Operation(summary = "쿠폰 삭제 (발급 전만 가능)")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long couponId) {
        couponService.deleteCoupon(couponId);
        return ResponseEntity.noContent().build();
    }
}
