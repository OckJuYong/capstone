package com.capstone.capstone_design.domain.coupon.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "쿠폰 수정 요청 DTO")
public class CouponUpdateRequestDto {

    @Schema(description = "쿠폰 이름", example = "신규회원 7000원 할인")
    private String name;

    @Schema(description = "할인 금액", example = "7000")
    private Long discountAmount;

    @Schema(description = "총 발급 가능 수량 (늘릴 수만 있음)", example = "150")
    private Integer totalQuantity;

    @Schema(description = "유효 시작일 (선택)", example = "2025-01-01T00:00:00")
    private LocalDateTime validFrom;

    @Schema(description = "유효 종료일 (선택)", example = "2025-12-31T23:59:59")
    private LocalDateTime validUntil;
}
