package com.capstone.capstone_design.domain.menu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "메뉴 생성 요청 DTO")
public class MenuCreateRequestDto {

    @Schema(description = "메뉴 이름", example = "김치찌개")
    private String name;

    @Schema(description = "메뉴 가격", example = "8000")
    private Integer price;

    @Schema(description = "식당 ID", example = "1")
    private Long restaurantId;
}
