package com.capstone.capstone_design.domain.restaurant.controller;

import com.capstone.capstone_design.domain.restaurant.dto.RestaurantDetailResponseDto;
import com.capstone.capstone_design.domain.restaurant.dto.RestaurantListResponseDto;
import com.capstone.capstone_design.domain.restaurant.service.RestaurantService;
import com.capstone.capstone_design.domain.menu.dto.MenuResponseDto;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
@Tag(name = "음식점 API")
public class RestaurantController {
    private final RestaurantService restaurantService;

    //식당 목록 조회
    @GetMapping
    @Operation(summary = "식당 목록 조회")
    public ResponseEntity<List<RestaurantListResponseDto>> getRestaurantList() {
        List<RestaurantListResponseDto> restaurantList = restaurantService.getRestaurantList();
        return ResponseEntity.ok(restaurantList);
    }

    //특정 식당 상세 조회
    @GetMapping("/{restaurantId}")
    @Operation(summary = "특정 식당 상세 조회")
    public ResponseEntity<RestaurantDetailResponseDto> getRestaurantDetails(
        @PathVariable Long restaurantId){
        RestaurantDetailResponseDto responseDto = restaurantService.getRestaurantDetails(restaurantId);
        return ResponseEntity.ok(responseDto);
    }

    //특정 식당의 메뉴 목록 조회
    @GetMapping("/{restaurantId}/menus")
    @Operation(summary = "특정 식당의 메뉴 목록 조회")
    public ResponseEntity<List<MenuResponseDto>> getRestaurantMenus(
        @PathVariable Long restaurantId) {
        return ResponseEntity.ok(restaurantService.getRestaurantMenus(restaurantId));
    }
}
