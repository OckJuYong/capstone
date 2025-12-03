package com.capstone.capstone_design.domain.coupon.model;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//관리자가 생성하는거임
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Column(name = "coupon_name", nullable = false)
    private String name;

    @Column(name = "coupon_code")
    private String code;

    @Column(name = "discount_amount", nullable = false)
    private Long discountAmount;

    @Column(name = "total_quantity", nullable = false)
    private Integer totalQuantity;

    @Column(name = "issued_count", nullable = false)
    private Integer issuedCount;

    @Column(name = "valid_from")
    private LocalDateTime validFrom;

    @Column(name = "valid_until")
    private LocalDateTime validUntil;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Version
    private Long version;

    // 쿠폰 발급 가능 여부 체크
    public boolean canIssue() {
        return isActive
            && issuedCount < totalQuantity
            && (validFrom == null || LocalDateTime.now().isAfter(validFrom))
            && (validUntil == null || LocalDateTime.now().isBefore(validUntil));
    }

    // 발급 수량 증가
    public void incrementIssuedCount() {
        if (!canIssue()) {
            throw new IllegalStateException("쿠폰을 발급할 수 없습니다.");
        }
        this.issuedCount++;
    }

    // 쿠폰 수정
    public void update(String name, Long discountAmount, Integer totalQuantity,
                       LocalDateTime validFrom, LocalDateTime validUntil) {
        this.name = name;
        this.discountAmount = discountAmount;
        this.totalQuantity = totalQuantity;
        this.validFrom = validFrom;
        this.validUntil = validUntil;
    }

    // 쿠폰 비활성화
    public void deactivate() {
        this.isActive = false;
    }

    // 쿠폰 활성화
    public void activate() {
        this.isActive = true;
    }
}