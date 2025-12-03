package com.capstone.capstone_design.domain.coupon.dto;

import com.capstone.capstone_design.domain.coupon.model.CouponStatus;
import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "사용자 쿠폰 응답 DTO")
public class UserCouponResponseDto {

    @Schema(description = "발급된 쿠폰 ID", example = "1")
    private Long id;

    @Schema(description = "쿠폰 템플릿 ID", example = "5")
    private Long couponId;

    @Schema(description = "쿠폰 이름", example = "신규회원 5000원 할인")
    private String couponName;

    @Schema(description = "할인 금액", example = "5000")
    private Long discountAmount;

    @Schema(description = "쿠폰 상태", example = "ACTIVE")
    private CouponStatus status;

    @Schema(description = "식당 ID (null이면 전체 가맹점)", example = "10")
    private Long restaurantId;

    @Schema(description = "식당 이름", example = "네네치킨")
    private String restaurantName;

    @Schema(description = "발급 일시", example = "2025-01-15T10:00:00")
    private LocalDateTime issuedAt;

    @Schema(description = "사용 일시", example = "2025-01-20T14:30:00")
    private LocalDateTime usedAt;

    @Schema(description = "사용된 주문 ID", example = "123")
    private Long usedInOrderId;

    @Schema(description = "유효 종료일", example = "2025-12-31T23:59:59")
    private LocalDateTime validUntil;

    @Schema(description = "사용 가능 여부", example = "true")
    private Boolean canUse;

    public static UserCouponResponseDto from(UserCoupon userCoupon) {
        return UserCouponResponseDto.builder()
                .id(userCoupon.getId())
                .couponId(userCoupon.getCoupon().getId())
                .couponName(userCoupon.getCoupon().getName())
                .discountAmount(userCoupon.getCoupon().getDiscountAmount())
                .status(userCoupon.getStatus())
                .restaurantId(userCoupon.getCoupon().getRestaurant() != null
                        ? userCoupon.getCoupon().getRestaurant().getId()
                        : null)
                .restaurantName(userCoupon.getCoupon().getRestaurant() != null
                        ? userCoupon.getCoupon().getRestaurant().getName()
                        : null)
                .issuedAt(userCoupon.getIssuedAt())
                .usedAt(userCoupon.getUsedAt())
                .usedInOrderId(userCoupon.getUsedInOrder() != null
                        ? userCoupon.getUsedInOrder().getId()
                        : null)
                .validUntil(userCoupon.getCoupon().getValidUntil())
                .canUse(userCoupon.canUse())
                .build();
    }
}
