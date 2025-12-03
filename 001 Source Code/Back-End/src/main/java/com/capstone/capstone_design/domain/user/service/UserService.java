package com.capstone.capstone_design.domain.user.service;

import com.capstone.capstone_design.domain.coupon.dto.UserCouponResponseDto;
import com.capstone.capstone_design.domain.dibs.dto.DibsResponseDto;
import com.capstone.capstone_design.domain.order.dto.OrderResponseDto;
import com.capstone.capstone_design.domain.review.dto.ReviewResponseDto;
import com.capstone.capstone_design.domain.user.dto.UserResponseDto;
import com.capstone.capstone_design.domain.user.dto.UserTasteDto;
import com.capstone.capstone_design.domain.user.dto.UserUpdateRequestDto;
import com.capstone.capstone_design.domain.user.model.UserTaste;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.repository.UserRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Users getAuthenticatedUser() {
        Long userId = getAuthenticatedUserId();
        return userRepository.findByIdWithTaste(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user"));
    }

    public Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new SecurityException("인증 정보가 없습니다.");
        }

        //사용자 이메일로 식별함
        String userEmail = authentication.getName();

        // 이메일을 사용해 DB에서 User를 찾아 ID를 반환
        return userRepository.findByEmailWithTaste(userEmail)
            .orElseThrow(() -> new NoSuchElementException("DB에서 해당 이메일의 유저를 찾을 수 없습니다: " + userEmail))
            .getId();
    }
    @Transactional(readOnly = true)
    public UserResponseDto getMyInfo(){
        Users user = getAuthenticatedUser();
        return UserResponseDto.from(user);
    }
    @Transactional
    public void updateMyInfo(UserUpdateRequestDto requestDto){
        Users user = getAuthenticatedUser();
        user.update(requestDto);
    }

    @Transactional
    public void deleteMyAccount(){
        Users user = getAuthenticatedUser();
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public UserTasteDto getMyTastes() {
        Users user = getAuthenticatedUser();
        UserTaste taste = user.getUserTaste();
        return new UserTasteDto(
                taste.getSpicy(),
                taste.getUmami(),
                taste.getSour(),
                taste.getSweet(),
                taste.getSalty(),
                taste.getBitter()
        );
    }

    @Transactional
    public void updateMyTastes(UserTasteDto dto){
        Users user = getAuthenticatedUser();
        UserTaste taste = user.getUserTaste();
        if (taste == null) {
            taste = UserTaste.from(dto, user);
            user.setUserTaste(taste);
        } else {
            taste.setSpicy(dto.getSpicy());
            taste.setUmami(dto.getUmami());
            taste.setSour(dto.getSour());
            taste.setSweet(dto.getSweet());
            taste.setSalty(dto.getSalty());
            taste.setBitter(dto.getBitter());
        }
    }

    @Transactional(readOnly = true)
    public List<DibsResponseDto> getMyDibs(){
        Long userId = getAuthenticatedUserId();
        Users user = userRepository.findByIdWithDibs(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user"));
        return user.getDibsList().stream()
                .map(DibsResponseDto::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDto> getMyOrders(){
        Long userId = getAuthenticatedUserId();
        Users user = userRepository.findByIdWithOrders(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user"));
        return user.getOrders().stream()
                .map(OrderResponseDto::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewResponseDto> getMyReviews(){
        Long userId = getAuthenticatedUserId();
        Users user = userRepository.findByIdWithReviews(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user"));
        return user.getReviews().stream()
                .map(ReviewResponseDto::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserCouponResponseDto> getMyCoupons(){
        Long userId = getAuthenticatedUserId();
        Users user = userRepository.findByIdWithCoupons(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user"));
        return user.getUserCoupons().stream()
                .map(UserCouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 쿠폰 발급 기능은 UserCouponService로 이동
}
