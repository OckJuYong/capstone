package com.capstone.capstone_design.domain.review.dto;

import com.capstone.capstone_design.domain.review.model.Review;
import lombok.Getter;

@Getter
public class ReviewListResponseDto {

    private final Long reviewId;
    private final String content;
    private final String authorNickname;

    public ReviewListResponseDto(Review review) {
        this.reviewId = review.getId();
        this.content = review.getContent();
        this.authorNickname = review.getUsers().getNickname();
    }
}