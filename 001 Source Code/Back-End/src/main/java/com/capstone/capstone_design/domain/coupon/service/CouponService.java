package com.capstone.capstone_design.domain.coupon.service;

import com.capstone.capstone_design.domain.coupon.dto.CouponCreateRequestDto;
import com.capstone.capstone_design.domain.coupon.dto.CouponResponseDto;
import com.capstone.capstone_design.domain.coupon.dto.CouponUpdateRequestDto;
import com.capstone.capstone_design.domain.coupon.model.Coupon;
import com.capstone.capstone_design.domain.coupon.repository.CouponRepository;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

//관리자용임
@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final RestaurantRepository restaurantRepository;

    // 쿠폰 생성
    @Transactional
    public CouponResponseDto createCoupon(CouponCreateRequestDto requestDto) {
        Restaurant restaurant = null;
        if (requestDto.getRestaurantId() != null) {
            restaurant = restaurantRepository.findById(requestDto.getRestaurantId())
                    .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));
        }

        Coupon coupon = Coupon.builder()
                .name(requestDto.getName())
                .code(requestDto.getCode())
                .discountAmount(requestDto.getDiscountAmount())
                .totalQuantity(requestDto.getTotalQuantity())
                .issuedCount(0)
                .restaurant(restaurant)
                .validFrom(requestDto.getValidFrom())
                .validUntil(requestDto.getValidUntil())
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        Coupon savedCoupon = couponRepository.save(coupon);
        return CouponResponseDto.from(savedCoupon);
    }

    // 쿠폰 목록 조회
    @Transactional(readOnly = true)
    public List<CouponResponseDto> getAllCoupons() {
        return couponRepository.findAll().stream()
                .map(CouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 활성화된 쿠폰 목록 조회
    @Transactional(readOnly = true)
    public List<CouponResponseDto> getActiveCoupons() {
        return couponRepository.findByIsActiveTrue().stream()
                .map(CouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 쿠폰 상세 조회
    @Transactional(readOnly = true)
    public CouponResponseDto getCouponById(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));
        return CouponResponseDto.from(coupon);
    }

    // 쿠폰 수정
    @Transactional
    public CouponResponseDto updateCoupon(Long couponId, CouponUpdateRequestDto requestDto) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));

        // 발급된 수량보다 총 수량을 줄일 수 없음
        if (requestDto.getTotalQuantity() < coupon.getIssuedCount()) {
            throw new IllegalArgumentException(
                    String.format("총 수량은 이미 발급된 수량(%d)보다 작을 수 없습니다.", coupon.getIssuedCount())
            );
        }

        coupon.update(
                requestDto.getName(),
                requestDto.getDiscountAmount(),
                requestDto.getTotalQuantity(),
                requestDto.getValidFrom(),
                requestDto.getValidUntil()
        );

        return CouponResponseDto.from(coupon);
    }

    // 쿠폰 비활성화
    @Transactional
    public void deactivateCoupon(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));
        coupon.deactivate();
    }

    // 쿠폰 활성화
    @Transactional
    public void activateCoupon(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));
        coupon.activate();
    }

    // 쿠폰 삭제 (발급된 쿠폰이 없을 때만)
    @Transactional
    public void deleteCoupon(Long couponId) {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));

        if (coupon.getIssuedCount() > 0) {
            throw new IllegalStateException("이미 발급된 쿠폰은 삭제할 수 없습니다. 비활성화를 이용해주세요.");
        }

        couponRepository.delete(coupon);
    }
}
