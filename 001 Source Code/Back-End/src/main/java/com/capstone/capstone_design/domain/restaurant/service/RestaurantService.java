package com.capstone.capstone_design.domain.restaurant.service;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.restaurant.dto.RestaurantDetailResponseDto;
import com.capstone.capstone_design.domain.restaurant.dto.RestaurantListResponseDto;
import com.capstone.capstone_design.domain.menu.dto.MenuResponseDto;

import com.capstone.capstone_design.domain.restaurant.repository.RestaurantRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;


    // 식당 목록 조회
    @Transactional(readOnly = true)

    public List<RestaurantListResponseDto> getRestaurantList() {


        List<Restaurant> restaurants = restaurantRepository.findAll();

        return restaurants.stream()
            .map(restaurant -> new RestaurantListResponseDto(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getAddress()))
            .collect(Collectors.toList());
    }

    // 특정 식당 상세 조회
    @Transactional(readOnly = true)

    public RestaurantDetailResponseDto getRestaurantDetails(Long restaurantId){


        Restaurant restaurant = restaurantRepository.findById(restaurantId)
            .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));


        return RestaurantDetailResponseDto.builder()

            .restaurantId(restaurant.getId())
            .name(restaurant.getName())
            .address(restaurant.getAddress())
            .number(restaurant.getNumber())
            .time(restaurant.getTime())
            .introduce(restaurant.getIntroduce())
            .build();
    }

    // 특정 식당의 메뉴 목록 조회
    @Transactional(readOnly = true)
    public List<MenuResponseDto> getRestaurantMenus(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findByIdWithMenus(restaurantId)
            .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));

        return restaurant.getMenus().stream()
            .map(MenuResponseDto::from)
            .collect(Collectors.toList());
    }
}