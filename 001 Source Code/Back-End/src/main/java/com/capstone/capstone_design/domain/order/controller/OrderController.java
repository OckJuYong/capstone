package com.capstone.capstone_design.domain.order.controller;

import com.capstone.capstone_design.domain.order.dto.OrderCreateRequestDto;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "주문 API (사용자)")
public class OrderController {

    private final OrderService orderService;

    // 주문 생성
    @PostMapping
    @Operation(summary = "주문 생성 (결제 완료 후 호출)", description = "프론트에서 결제 완료 후 장바구니 정보를 전송하여 주문을 생성합니다.")
    public ResponseEntity<Void> createOrder(@RequestBody OrderCreateRequestDto requestDto) {
        orderService.createOrder(requestDto);
        return ResponseEntity.ok().build();
    }

    // 내 주문 목록 조회
    @GetMapping("/me")
    @Operation(summary = "내 주문 목록 조회")
    public ResponseEntity<List<OrderResponseDto>> getMyOrders() {
        return ResponseEntity.ok(orderService.getMyOrders());
    }

    // 주문 상세 조회
    @GetMapping("/{orderId}")
    @Operation(summary = "주문 상세 조회")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    // 주문 취소
    @DeleteMapping("/{orderId}")
    @Operation(summary = "주문 취소")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
