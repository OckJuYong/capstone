package com.capstone.capstone_design.domain.coupon.repository;

import com.capstone.capstone_design.domain.coupon.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    // 활성화된 쿠폰 목록 조회 (발급 가능한 쿠폰)
    @Query("SELECT c FROM Coupon c WHERE c.isActive = true AND c.issuedCount < c.totalQuantity")
    List<Coupon> findAvailableCoupons();

    // 특정 식당의 쿠폰 조회
    List<Coupon> findByRestaurantId(Long restaurantId);

    // 전체 가맹점 쿠폰 조회 (restaurant가 null인 쿠폰)
    List<Coupon> findByRestaurantIsNull();

    // 쿠폰 코드로 조회
    Optional<Coupon> findByCode(String code);

    // 활성화된 모든 쿠폰 조회 (관리자용)
    List<Coupon> findByIsActiveTrue();
}
