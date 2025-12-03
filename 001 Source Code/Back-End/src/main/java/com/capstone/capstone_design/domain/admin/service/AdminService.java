package com.capstone.capstone_design.domain.admin.service;

import com.capstone.capstone_design.domain.admin.dto.RestaurantCreateRequestDto;
import com.capstone.capstone_design.domain.owner.model.Owner;
import com.capstone.capstone_design.domain.owner.repository.OwnerRepository;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.restaurant.repository.RestaurantRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final RestaurantRepository restaurantRepository;
    private final OwnerRepository ownerRepository;

    // 식당 추가
    @Transactional
    public void addRestaurant(RestaurantCreateRequestDto requestDto) {
        Owner owner = ownerRepository.findById(requestDto.getOwnerId())
            .orElseThrow(() -> new NoSuchElementException("해당 ID의 사장님을 찾을 수 없습니다."));

        Restaurant newRestaurant = Restaurant.builder()
            .name(requestDto.getName())
            .address(requestDto.getAddress())
            .number(requestDto.getNumber())
            .time(requestDto.getTime())
            .introduce(requestDto.getIntroduce())
            .owner(owner)
            .build();

        restaurantRepository.save(newRestaurant);
    }
}
