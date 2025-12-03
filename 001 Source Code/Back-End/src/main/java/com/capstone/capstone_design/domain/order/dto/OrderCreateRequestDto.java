package com.capstone.capstone_design.domain.order.dto;

import com.capstone.capstone_design.domain.order.model.OrderType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "주문 생성 요청 DTO")
public class OrderCreateRequestDto {

    @Schema(description = "주문 타입", example = "DELIVERY")
    private OrderType orderType;

    @Schema(description = "주문 메뉴 목록")
    private List<OrderMenuItemDto> orderMenus;

    @Schema(description = "사용할 쿠폰 ID (선택)", example = "5")
    private Long couponId;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "주문 메뉴 항목")
    public static class OrderMenuItemDto {

        @Schema(description = "메뉴 ID", example = "5")
        private Long menuId;

        @Schema(description = "수량", example = "2")
        private Integer quantity;
    }
}
