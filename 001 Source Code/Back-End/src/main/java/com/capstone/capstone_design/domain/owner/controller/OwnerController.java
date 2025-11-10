package com.capstone.capstone_design.domain.owner.controller;

import com.capstone.capstone_design.domain.menu.dto.MenuCreateRequestDto;
import com.capstone.capstone_design.domain.menu.dto.MenuResponseDto;
import com.capstone.capstone_design.domain.menu.dto.MenuUpdateRequestDto;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.owner.dto.OwnerResponseDto;
import com.capstone.capstone_design.domain.owner.service.OwnerService;
import com.capstone.capstone_design.domain.restaurant.dto.RestaurantListResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
@Tag(name = "사장님 관리 API")
public class OwnerController {

    private final OwnerService ownerService;

    // 사장님 정보 조회
    @GetMapping("/me")
    @Operation(summary = "사장님 정보 조회")
    public ResponseEntity<OwnerResponseDto> getMyInfo() {
        return ResponseEntity.ok(ownerService.getMyInfo());
    }

    // 본인 식당 목록 조회
    @GetMapping("/me/restaurants")
    @Operation(summary = "본인 식당 목록 조회")
    public ResponseEntity<List<RestaurantListResponseDto>> getMyRestaurants() {
        return ResponseEntity.ok(ownerService.getMyRestaurants());
    }

    // 특정 식당의 메뉴 목록 조회
    @GetMapping("/restaurants/{restaurantId}/menus")
    @Operation(summary = "특정 식당의 메뉴 목록 조회")
    public ResponseEntity<List<MenuResponseDto>> getMenusByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(ownerService.getMenusByRestaurant(restaurantId));
    }

    // 메뉴 생성
    @PostMapping("/menus")
    @Operation(summary = "메뉴 생성")
    public ResponseEntity<Void> createMenu(@RequestBody MenuCreateRequestDto requestDto) {
        ownerService.createMenu(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 메뉴 수정
    @PutMapping("/menus/{menuId}")
    @Operation(summary = "메뉴 수정")
    public ResponseEntity<Void> updateMenu(
            @PathVariable Long menuId,
            @RequestBody MenuUpdateRequestDto requestDto) {
        ownerService.updateMenu(menuId, requestDto);
        return ResponseEntity.ok().build();
    }

    // 메뉴 삭제
    @DeleteMapping("/menus/{menuId}")
    @Operation(summary = "메뉴 삭제")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long menuId) {
        ownerService.deleteMenu(menuId);
        return ResponseEntity.noContent().build();
    }

    // ===== 주문 관리 =====

    // 특정 식당의 주문 목록 조회
    @GetMapping("/restaurants/{restaurantId}/orders")
    @Operation(summary = "특정 식당의 주문 목록 조회")
    public ResponseEntity<List<OrderResponseDto>> getRestaurantOrders(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(ownerService.getRestaurantOrders(restaurantId));
    }

    // 주문 접수
    @PutMapping("/orders/{orderId}/accept")
    @Operation(summary = "주문 접수")
    public ResponseEntity<Void> acceptOrder(@PathVariable Long orderId) {
        ownerService.acceptOrder(orderId);
        return ResponseEntity.ok().build();
    }

    // 주문 완료
    @PutMapping("/orders/{orderId}/complete")
    @Operation(summary = "주문 완료")
    public ResponseEntity<Void> completeOrder(@PathVariable Long orderId) {
        ownerService.completeOrder(orderId);
        return ResponseEntity.ok().build();
    }

    // 주문 거절
    @PutMapping("/orders/{orderId}/reject")
    @Operation(summary = "주문 거절")
    public ResponseEntity<Void> rejectOrder(@PathVariable Long orderId) {
        ownerService.rejectOrder(orderId);
        return ResponseEntity.ok().build();
    }
}