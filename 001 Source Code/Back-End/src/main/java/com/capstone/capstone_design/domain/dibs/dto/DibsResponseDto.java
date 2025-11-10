package com.capstone.capstone_design.domain.dibs.dto;

import com.capstone.capstone_design.domain.dibs.model.Dibs;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "찜 목록 응답 DTO")
public class DibsResponseDto {

    @Schema(description = "찜 ID", example = "1")
    private Long dibsId;

    @Schema(description = "식당 ID", example = "10")
    private Long restaurantId;

    @Schema(description = "식당 이름", example = "맛있는 식당")
    private String restaurantName;

    @Schema(description = "식당 주소", example = "서울시 강남구 테헤란로 123")
    private String restaurantAddress;

    public static DibsResponseDto from(Dibs dibs) {
        return DibsResponseDto.builder()
                .dibsId(dibs.getId())
                .restaurantId(dibs.getRestaurant().getId())
                .restaurantName(dibs.getRestaurant().getName())
                .restaurantAddress(dibs.getRestaurant().getAddress())
                .build();
    }
}
