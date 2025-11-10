package com.capstone.capstone_design.domain.review.dto;

import com.capstone.capstone_design.domain.review.model.Review;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "리뷰 응답 DTO")
public class ReviewResponseDto {

    @Schema(description = "리뷰 ID", example = "1")
    private Long reviewId;

    @Schema(description = "리뷰 내용", example = "정말 맛있었습니다!")
    private String content;

    @Schema(description = "작성자 닉네임", example = "닉네임")
    private String authorNickname;

    @Schema(description = "메뉴 ID", example = "5")
    private Long menuId;

    @Schema(description = "메뉴 이름", example = "김치찌개")
    private String menuName;

    @Schema(description = "식당 ID", example = "10")
    private Long restaurantId;

    @Schema(description = "식당 이름", example = "맛있는 식당")
    private String restaurantName;

    public static ReviewResponseDto from(Review review) {
        return ReviewResponseDto.builder()
                .reviewId(review.getId())
                .content(review.getContent())
                .authorNickname(review.getUsers().getNickname())
                .menuId(review.getMenu() != null ? review.getMenu().getId() : null)
                .menuName(review.getMenu() != null ? review.getMenu().getName() : null)
                .restaurantId(review.getRestaurant().getId())
                .restaurantName(review.getRestaurant().getName())
                .build();
    }
}
