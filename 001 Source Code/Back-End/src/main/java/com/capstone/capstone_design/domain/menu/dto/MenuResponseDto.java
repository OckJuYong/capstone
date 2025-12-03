package com.capstone.capstone_design.domain.menu.dto;

import com.capstone.capstone_design.domain.menu.model.Menu;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "메뉴 응답 DTO")
public class MenuResponseDto {

    @Schema(description = "메뉴 ID", example = "1")
    private Long id;

    @Schema(description = "메뉴 이름", example = "김치찌개")
    private String name;

    @Schema(description = "메뉴 가격", example = "8000")
    private Integer price;

    @Schema(description = "식당 이름", example = "맛있는 식당")
    private String restaurantName;

    public static MenuResponseDto from(Menu menu) {
        return MenuResponseDto.builder()
                .id(menu.getId())
                .name(menu.getName())
                .price(menu.getPrice())
                .restaurantName(menu.getRestaurant().getName())
                .build();
    }
}