package com.capstone.capstone_design.domain.restaurant.dto;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RestaurantListResponseDto {
    private Long restaurantId;
    private String restaurantName;
    private String restaurantAddress;

    public static RestaurantListResponseDto from(Restaurant restaurant) {
        return new RestaurantListResponseDto(
            restaurant.getId(),
            restaurant.getName(),
            restaurant.getAddress()
        );
    }
}
