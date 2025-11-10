package com.capstone.capstone_design.domain.coupon.dto;

import com.capstone.capstone_design.domain.coupon.model.Coupon;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "쿠폰 응답 DTO")
public class CouponResponseDto {

    @Schema(description = "쿠폰 ID", example = "1")
    private Long id;

    @Schema(description = "쿠폰 이름", example = "5000원 할인")
    private String name;

    @Schema(description = "쿠폰 코드", example = "NARUTO")
    private String code;

    @Schema(description = "할인 금액", example = "5000")
    private Long discountAmount;

    @Schema(description = "총 발급 가능 수량", example = "100")
    private Integer totalQuantity;

    @Schema(description = "현재 발급된 수량", example = "37")
    private Integer issuedCount;

    @Schema(description = "남은 수량", example = "63")
    private Integer remainingCount;

    @Schema(description = "식당 ID (null이면 전체 가맹점)", example = "10")
    private Long restaurantId;

    @Schema(description = "식당 이름", example = "네네치킨")
    private String restaurantName;

    @Schema(description = "유효 시작일", example = "2025-01-01T00:00:00")
    private LocalDateTime validFrom;

    @Schema(description = "유효 종료일", example = "2025-12-31T23:59:59")
    private LocalDateTime validUntil;

    @Schema(description = "활성화 여부", example = "true")
    private Boolean isActive;

    @Schema(description = "생성 일시", example = "2025-01-01T10:00:00")
    private LocalDateTime createdAt;

    public static CouponResponseDto from(Coupon coupon) {
        return CouponResponseDto.builder()
                .id(coupon.getId())
                .name(coupon.getName())
                .code(coupon.getCode())
                .discountAmount(coupon.getDiscountAmount())
                .totalQuantity(coupon.getTotalQuantity())
                .issuedCount(coupon.getIssuedCount())
                .remainingCount(coupon.getTotalQuantity() - coupon.getIssuedCount())
                .restaurantId(coupon.getRestaurant() != null ? coupon.getRestaurant().getId() : null)
                .restaurantName(coupon.getRestaurant() != null ? coupon.getRestaurant().getName() : null)
                .validFrom(coupon.getValidFrom())
                .validUntil(coupon.getValidUntil())
                .isActive(coupon.getIsActive())
                .createdAt(coupon.getCreatedAt())
                .build();
    }
}
