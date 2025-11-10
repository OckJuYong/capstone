package com.capstone.capstone_design.domain.review.controller;


import com.capstone.capstone_design.domain.review.dto.ReviewCreateRequestDto;
import com.capstone.capstone_design.domain.review.dto.ReviewListResponseDto;
import com.capstone.capstone_design.domain.review.dto.ReviewUpdateRequestDto;
import com.capstone.capstone_design.domain.review.service.ReviewService;
import com.capstone.capstone_design.domain.user.service.UserService;
import java.net.URI;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "리뷰 API")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;


    // 리뷰작성
    @PostMapping("/restaurants/{restaurantId}/reviews")
    @Operation(summary = "리뷰 생성")
    public ResponseEntity<Void> createReview(
        @PathVariable Long restaurantId,
        @RequestBody ReviewCreateRequestDto request
    ) {
        Long userId = userService.getAuthenticatedUserId();

        Long reviewId = reviewService.createReview(userId, restaurantId, request);

        return ResponseEntity.created(URI.create("/api/v1/reviews/" + reviewId)).build();
    }

    // 리뷰 수정
    @PutMapping("/reviews/{reviewId}")
    @Operation(summary = "리뷰 수정")
    public ResponseEntity<Void> updateReview(
        @PathVariable Long reviewId,
        @RequestBody ReviewUpdateRequestDto request
    ) {
        Long userId = userService.getAuthenticatedUserId();
        reviewService.updateReview(reviewId, userId, request);
        return ResponseEntity.ok().build();
    }

    //리뷰 조회
    @GetMapping("/restaurants/{restaurantId}/reviews")
    @Operation(summary = "리뷰 조회")
    public ResponseEntity<List<ReviewListResponseDto>> getReviewsByRestaurant(
        @PathVariable Long restaurantId) {
        return ResponseEntity.ok(reviewService.findReviewsByRestaurant(restaurantId));
    }

    //리뷰 삭제
    @DeleteMapping("/reviews/{reviewId}")
    @Operation(summary = "리뷰 삭제")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        Long userId = userService.getAuthenticatedUserId();

        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.noContent().build();
    }
}