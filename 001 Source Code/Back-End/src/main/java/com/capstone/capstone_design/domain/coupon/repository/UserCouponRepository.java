package com.capstone.capstone_design.domain.coupon.repository;

import com.capstone.capstone_design.domain.coupon.model.CouponStatus;
import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCouponRepository extends JpaRepository<UserCoupon, Long> {

    // 사용자의 쿠폰 목록 조회 (발급 시각 내림차순)
    List<UserCoupon> findByUsersIdOrderByIssuedAtDesc(Long userId);

    // 사용자의 사용 가능한 쿠폰 목록 조회
    List<UserCoupon> findByUsersIdAndStatus(Long userId, CouponStatus status);

    // 사용자가 특정 쿠폰 템플릿을 이미 받았는지 확인
    boolean existsByUsersIdAndCouponId(Long userId, Long couponId);

    // 특정 쿠폰 템플릿으로 발급된 모든 사용자 쿠폰 조회
    List<UserCoupon> findByCouponId(Long couponId);

    // 사용자의 특정 주문에 사용된 쿠폰 조회
    Optional<UserCoupon> findByUsedInOrderId(Long orderId);
}
