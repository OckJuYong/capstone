package com.capstone.capstone_design.domain.admin.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RestaurantCreateRequestDto {
    private String name;
    private String address;
    private String number;
    private String time;
    private String introduce;
    private Long ownerId;
}
