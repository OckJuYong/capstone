package com.capstone.capstone_design.domain.order.dto;

import com.capstone.capstone_design.domain.order.model.Order;
import com.capstone.capstone_design.domain.order.model.OrderStatus;
import com.capstone.capstone_design.domain.order.model.OrderType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "주문 내역 응답 DTO")
public class OrderResponseDto {

    @Schema(description = "주문 ID", example = "1")
    private Long orderId;

    @Schema(description = "총 금액", example = "25000")
    private Long totalPrice;

    @Schema(description = "주문 상태", example = "COMPLETED")
    private OrderStatus status;

    @Schema(description = "주문 타입", example = "DELIVERY")
    private OrderType type;

    @Schema(description = "주문 생성 시간", example = "2025-01-15T14:30:00")
    private LocalDateTime createdAt;

    @Schema(description = "주문한 메뉴 목록")
    private List<OrderMenuDto> orderMenus;

    public static OrderResponseDto from(Order order) {
        return OrderResponseDto.builder()
                .orderId(order.getId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .type(order.getType())
                .createdAt(order.getCreatedAt())
                .orderMenus(order.getOrderMenus().stream()
                        .map(OrderMenuDto::from)
                        .collect(Collectors.toList()))
                .build();
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @Schema(description = "주문 메뉴 정보")
    public static class OrderMenuDto {

        @Schema(description = "메뉴 ID", example = "5")
        private Long menuId;

        @Schema(description = "메뉴 이름", example = "김치찌개")
        private String menuName;

        @Schema(description = "메뉴 가격", example = "8000")
        private Integer menuPrice;

        @Schema(description = "수량", example = "2")
        private Integer quantity;

        public static OrderMenuDto from(com.capstone.capstone_design.domain.order.model.OrderMenu orderMenu) {
            return OrderMenuDto.builder()
                    .menuId(orderMenu.getMenu().getId())
                    .menuName(orderMenu.getMenu().getName())
                    .menuPrice(orderMenu.getMenu().getPrice())
                    .quantity(orderMenu.getQuantity())
                    .build();
        }
    }
}
