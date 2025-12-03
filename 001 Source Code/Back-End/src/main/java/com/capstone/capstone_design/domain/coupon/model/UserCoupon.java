package com.capstone.capstone_design.domain.coupon.model;

import com.capstone.capstone_design.domain.order.model.Order;
import com.capstone.capstone_design.domain.user.model.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//사용자한테 발급된 쿠폰임
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users_coupon")
public class UserCoupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_coupon_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id", nullable = false)
    private Coupon coupon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private Users users;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CouponStatus status;

    @Column(name = "issued_at", nullable = false)
    private LocalDateTime issuedAt;

    @Column(name = "used_at")
    private LocalDateTime usedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order usedInOrder;

    // 쿠폰 사용 가능 여부 체크
    public boolean canUse() {
        if (status != CouponStatus.ACTIVE) {
            return false;
        }

        LocalDateTime validUntil = coupon.getValidUntil();
        if (validUntil != null && LocalDateTime.now().isAfter(validUntil)) {
            return false;
        }

        return true;
    }

    // 쿠폰 사용
    public void use(Order order) {
        if (!canUse()) {
            throw new IllegalStateException("사용할 수 없는 쿠폰입니다.");
        }
        this.status = CouponStatus.USED;
        this.usedAt = LocalDateTime.now();
        this.usedInOrder = order;
    }

    // 쿠폰 만료 처리
    public void expire() {
        if (status == CouponStatus.ACTIVE) {
            this.status = CouponStatus.EXPIRED;
        }
    }

    // 쿠폰 복구 (주문 취소 시)
    public void restore() {
        if (status == CouponStatus.USED) {
            this.status = CouponStatus.ACTIVE;
            this.usedAt = null;
            this.usedInOrder = null;
        }
    }
}