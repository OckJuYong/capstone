package com.capstone.capstone_design.domain.dibs.controller;

import com.capstone.capstone_design.domain.dibs.service.DibsService;
import com.capstone.capstone_design.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dibs")
@RequiredArgsConstructor
@Tag(name = "찜 API")
public class DibsController {

    private final DibsService dibsService;
    private final UserService userService;

    // 식당 찜 하기
    @PostMapping("/restaurants/{restaurantId}")
    @Operation(summary = "식당 찜 생성")
    public ResponseEntity<Void> createDibs(@PathVariable Long restaurantId) throws IllegalAccessException {
        Long userId = userService.getAuthenticatedUserId();

        dibsService.createDibs(userId, restaurantId);
        return ResponseEntity.ok().build();
    }

    // 식당 찜 취소하기
    @DeleteMapping("/restaurants/{restaurantId}")
    @Operation(summary = "식당 찜 삭제")
    public ResponseEntity<Void> deleteDibs(@PathVariable Long restaurantId) {
        Long userId = userService.getAuthenticatedUserId();

        dibsService.deleteDibs(userId, restaurantId);
        return ResponseEntity.ok().build();
    }
}
