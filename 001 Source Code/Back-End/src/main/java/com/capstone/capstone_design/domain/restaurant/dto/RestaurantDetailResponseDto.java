package com.capstone.capstone_design.domain.restaurant.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RestaurantDetailResponseDto {

    private final Long restaurantId;
    private final String name;
    private final String address;
    private final String number;
    private final String time;
    private final String introduce;

    @Builder
    public RestaurantDetailResponseDto(Long restaurantId, String name, String address, String number, String time, String introduce){
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this. number = number;
        this. time = time;
        this. introduce = introduce;
    }
}
