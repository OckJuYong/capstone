package com.capstone.capstone_design.domain.coupon.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "쿠폰 생성 요청 DTO")
public class CouponCreateRequestDto {

    @Schema(description = "쿠폰 이름", example = "5000원 할인")
    private String name;

    @Schema(description = "쿠폰 코드 (선택)", example = "NARUTO25")
    private String code;

    @Schema(description = "할인 금액", example = "5000")
    private Long discountAmount;

    @Schema(description = "총 발급 가능 수량", example = "100")
    private Integer totalQuantity;

    @Schema(description = "식당 ID (null이면 전체 가맹점 쿠폰)", example = "10")
    private Long restaurantId;

    @Schema(description = "유효 시작일 (선택)", example = "2025-01-01T00:00:00")
    private LocalDateTime validFrom;

    @Schema(description = "유효 종료일 (선택)", example = "2025-12-31T23:59:59")
    private LocalDateTime validUntil;
}
