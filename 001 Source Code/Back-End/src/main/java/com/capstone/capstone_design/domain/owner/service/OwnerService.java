package com.capstone.capstone_design.domain.owner.service;

import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import com.capstone.capstone_design.domain.coupon.repository.UserCouponRepository;
import com.capstone.capstone_design.domain.menu.dto.MenuCreateRequestDto;
import com.capstone.capstone_design.domain.menu.dto.MenuResponseDto;
import com.capstone.capstone_design.domain.menu.dto.MenuUpdateRequestDto;
import com.capstone.capstone_design.domain.menu.model.Menu;
import com.capstone.capstone_design.domain.menu.repository.MenuRepository;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.order.model.Order;
import com.capstone.capstone_design.domain.order.repository.OrderRepository;
import com.capstone.capstone_design.domain.owner.dto.OwnerResponseDto;
import com.capstone.capstone_design.domain.owner.model.Owner;
import com.capstone.capstone_design.domain.owner.repository.OwnerRepository;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OwnerService {

    private final OwnerRepository ownerRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final OrderRepository orderRepository;
    private final UserCouponRepository userCouponRepository;

    // 인증된 사장님 조회
    public Owner getAuthenticatedOwner() {
        Long ownerId = getAuthenticatedOwnerId();
        return ownerRepository.findById(ownerId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사장님입니다."));
    }

    // 인증된 사장님 ID 조회
    public Long getAuthenticatedOwnerId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new SecurityException("인증 정보가 없습니다.");
        }

        String ownerEmail = authentication.getName();

        return ownerRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new NoSuchElementException("DB에서 해당 이메일의 사장님을 찾을 수 없습니다: " + ownerEmail))
                .getId();
    }

    // 사장님 정보 조회
    @Transactional(readOnly = true)
    public OwnerResponseDto getMyInfo() {
        Owner owner = getAuthenticatedOwner();
        return OwnerResponseDto.from(owner);
    }

    // 본인 식당 목록 조회
    @Transactional(readOnly = true)
    public List<com.capstone.capstone_design.domain.restaurant.dto.RestaurantListResponseDto> getMyRestaurants() {
        Owner owner = getAuthenticatedOwner();
        return owner.getRestaurants().stream()
                .map(com.capstone.capstone_design.domain.restaurant.dto.RestaurantListResponseDto::from)
                .collect(java.util.stream.Collectors.toList());
    }

    // 메뉴 생성
    @Transactional
    public void createMenu(MenuCreateRequestDto requestDto) {
        Owner owner = getAuthenticatedOwner();
        Restaurant restaurant = restaurantRepository.findById(requestDto.getRestaurantId())
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));
        if (!restaurant.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("본인 소유의 식당에만 메뉴를 추가할 수 있습니다.");
        }

        Menu menu = Menu.builder()
                .name(requestDto.getName())
                .price(requestDto.getPrice())
                .restaurant(restaurant)
                .build();

        menuRepository.save(menu);
    }

    // 특정 식당의 메뉴 목록 조회
    @Transactional(readOnly = true)
    public List<MenuResponseDto> getMenusByRestaurant(Long restaurantId) {
        Owner owner = getAuthenticatedOwner();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));
        if (!restaurant.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("본인 소유의 식당 메뉴만 조회할 수 있습니다.");
        }

        return restaurant.getMenus().stream()
                .map(MenuResponseDto::from)
                .collect(Collectors.toList());
    }

    // 메뉴 수정
    @Transactional
    public void updateMenu(Long menuId, MenuUpdateRequestDto requestDto) {
        Owner owner = getAuthenticatedOwner();
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 메뉴를 찾을 수 없습니다."));
        if (!menu.getRestaurant().getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("본인 소유의 식당 메뉴만 수정할 수 있습니다.");
        }

        menu.update(requestDto.getName(), requestDto.getPrice());
    }

    // 메뉴 삭제
    @Transactional
    public void deleteMenu(Long menuId) {
        Owner owner = getAuthenticatedOwner();
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 메뉴를 찾을 수 없습니다."));
        if (!menu.getRestaurant().getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("본인 소유의 식당 메뉴만 삭제할 수 있습니다.");
        }

        menuRepository.delete(menu);
    }

    // ===== 주문 관리 =====

    // 특정 식당의 주문 목록 조회
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getRestaurantOrders(Long restaurantId) {
        Owner owner = getAuthenticatedOwner();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 식당을 찾을 수 없습니다."));
        if (!restaurant.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("본인 소유의 식당 주문만 조회할 수 있습니다.");
        }

        return orderRepository.findByRestaurantId(restaurantId).stream()
                .map(OrderResponseDto::from)
                .collect(Collectors.toList());
    }

    // 주문 접수
    @Transactional
    public void acceptOrder(Long orderId) {
        verifyOrderOwnership(orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));
        order.accept();
    }

    // 주문 완료
    @Transactional
    public void completeOrder(Long orderId) {
        verifyOrderOwnership(orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));
        order.complete();
    }

    // 주문 거절
    @Transactional
    public void rejectOrder(Long orderId) {
        verifyOrderOwnership(orderId);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));
        order.reject();
        userCouponRepository.findByUsedInOrderId(orderId)
                .ifPresent(UserCoupon::restore);
    }

    // 주문 소유권 검증 헬퍼 메서드
    private void verifyOrderOwnership(Long orderId) {
        Owner owner = getAuthenticatedOwner();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));
        boolean isOwner = order.getOrderMenus().stream()
                .allMatch(om -> om.getMenu().getRestaurant().getOwner().getId().equals(owner.getId()));
        if (!isOwner) {
            throw new SecurityException("본인 소유의 식당 주문만 관리할 수 있습니다.");
        }
    }
}
