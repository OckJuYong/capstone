package com.capstone.capstone_design.domain.user.controller;

import com.capstone.capstone_design.domain.user.dto.MenuRecommendation;
import com.capstone.capstone_design.domain.user.service.MenuRecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "메뉴 추천 API", description = "사용자 선호도 기반 메뉴 추천 기능")
public class RecommendationController {

    private final MenuRecommendationService menuRecommendationService;

    // 개인화된 식당 추천 GET부분(Qdrant)
    @GetMapping("/me/recommendations")
    @Operation(summary = "메뉴 추천 요청", description = "현재 로그인한 사용자의 맛 선호도를 기반으로 추천 메뉴 목록을 반환합니다.")
    @ApiResponse(responseCode = "200", description = "추천 메뉴 목록 반환 성공",
            content = @Content(mediaType = "application/json",array = @ArraySchema(schema = @Schema(implementation = MenuRecommendation.class))))
    public ResponseEntity<List<MenuRecommendation>> getMyRecommendations() {
        return ResponseEntity.ok(menuRecommendationService.getRecommendationsForCurrentUser());
    }

}