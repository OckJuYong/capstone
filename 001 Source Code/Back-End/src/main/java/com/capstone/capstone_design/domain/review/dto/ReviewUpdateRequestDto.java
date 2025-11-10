package com.capstone.capstone_design.domain.review.dto;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewUpdateRequestDto {
    private String content;
    private BigDecimal spicy;
    private BigDecimal umami;
    private BigDecimal sour;
    private BigDecimal sweet;
    private BigDecimal salty;
    private BigDecimal bitter;
}