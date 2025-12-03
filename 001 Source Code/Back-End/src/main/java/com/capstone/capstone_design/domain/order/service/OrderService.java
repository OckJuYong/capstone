package com.capstone.capstone_design.domain.order.service;

import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import com.capstone.capstone_design.domain.coupon.repository.UserCouponRepository;
import com.capstone.capstone_design.domain.menu.model.Menu;
import com.capstone.capstone_design.domain.menu.repository.MenuRepository;
import com.capstone.capstone_design.domain.order.dto.OrderCreateRequestDto;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.order.model.Order;
import com.capstone.capstone_design.domain.order.model.OrderMenu;
import com.capstone.capstone_design.domain.order.model.OrderStatus;
import com.capstone.capstone_design.domain.order.repository.OrderRepository;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuRepository menuRepository;
    private final UserService userService;
    private final UserCouponRepository userCouponRepository;

    // 주문 생성
    @Transactional
    public void createOrder(OrderCreateRequestDto requestDto) {
        Users user = userService.getAuthenticatedUser();

        // 총 금액 계산
        long totalPrice = 0;
        Restaurant orderRestaurant = null;

        for (OrderCreateRequestDto.OrderMenuItemDto item : requestDto.getOrderMenus()) {
            Menu menu = menuRepository.findById(item.getMenuId())
                    .orElseThrow(() -> new NoSuchElementException("해당 ID의 메뉴를 찾을 수 없습니다."));
            totalPrice += menu.getPrice() * item.getQuantity();

            // 주문의 식당 확인 (모든 메뉴가 같은 식당이어야 함)
            if (orderRestaurant == null) {
                orderRestaurant = menu.getRestaurant();
            } else if (!orderRestaurant.getId().equals(menu.getRestaurant().getId())) {
                throw new IllegalArgumentException("모든 메뉴는 같은 식당의 메뉴여야 합니다.");
            }
        }

        // 쿠폰 적용
        UserCoupon appliedCoupon = null;
        if (requestDto.getCouponId() != null) {
            appliedCoupon = userCouponRepository.findById(requestDto.getCouponId())
                    .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));

            // 본인 쿠폰인지 확인
            if (!appliedCoupon.getUsers().getId().equals(user.getId())) {
                throw new SecurityException("본인의 쿠폰만 사용할 수 있습니다.");
            }

            // 쿠폰 사용 가능 여부 확인
            if (!appliedCoupon.canUse()) {
                throw new IllegalStateException("사용할 수 없는 쿠폰입니다.");
            }

            // 쿠폰 적용 범위 확인
            Restaurant couponRestaurant = appliedCoupon.getCoupon().getRestaurant();
            if (couponRestaurant != null && !couponRestaurant.getId().equals(orderRestaurant.getId())) {
                throw new IllegalArgumentException("해당 식당에서 사용할 수 없는 쿠폰입니다.");
            }

            // 할인 금액 적용
            long discountAmount = appliedCoupon.getCoupon().getDiscountAmount();
            totalPrice = Math.max(0, totalPrice - discountAmount);  // 음수 방지
        }

        // 주문 생성
        Order order = Order.builder()
                .users(user)
                .totalPrice(totalPrice)
                .status(OrderStatus.PENDING)
                .type(requestDto.getOrderType())
                .createdAt(LocalDateTime.now())
                .build();

        // 주문 메뉴 추가
        for (OrderCreateRequestDto.OrderMenuItemDto item : requestDto.getOrderMenus()) {
            Menu menu = menuRepository.findById(item.getMenuId())
                    .orElseThrow(() -> new NoSuchElementException("해당 ID의 메뉴를 찾을 수 없습니다."));

            OrderMenu orderMenu = OrderMenu.builder()
                    .menu(menu)
                    .quantity(item.getQuantity())
                    .build();

            order.addOrderMenu(orderMenu);
        }

        Order savedOrder = orderRepository.save(order);

        // 쿠폰 사용 처리
        if (appliedCoupon != null) {
            appliedCoupon.use(savedOrder);
        }
    }

    // 내 주문 목록 조회
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getMyOrders() {
        Users user = userService.getAuthenticatedUser();
        return orderRepository.findByUsersIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(OrderResponseDto::from)
                .collect(Collectors.toList());
    }

    // 주문 상세 조회
    @Transactional(readOnly = true)
    public OrderResponseDto getOrderById(Long orderId) {
        Users user = userService.getAuthenticatedUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));

        // 본인 주문인지 확인
        if (!order.getUsers().getId().equals(user.getId())) {
            throw new SecurityException("본인의 주문만 조회할 수 있습니다.");
        }

        return OrderResponseDto.from(order);
    }

    // 주문 취소
    @Transactional
    public void cancelOrder(Long orderId) {
        Users user = userService.getAuthenticatedUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 주문을 찾을 수 없습니다."));

        // 본인 주문인지 확인
        if (!order.getUsers().getId().equals(user.getId())) {
            throw new SecurityException("본인의 주문만 취소할 수 있습니다.");
        }

        order.cancel();

        // 쿠폰 복구 (주문 취소 시)
        userCouponRepository.findByUsedInOrderId(orderId)
                .ifPresent(UserCoupon::restore);
    }
}
