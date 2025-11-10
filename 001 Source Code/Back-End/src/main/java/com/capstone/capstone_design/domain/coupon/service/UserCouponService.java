package com.capstone.capstone_design.domain.coupon.service;

import com.capstone.capstone_design.domain.coupon.dto.CouponResponseDto;
import com.capstone.capstone_design.domain.coupon.dto.UserCouponResponseDto;
import com.capstone.capstone_design.domain.coupon.model.Coupon;
import com.capstone.capstone_design.domain.coupon.model.CouponStatus;
import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import com.capstone.capstone_design.domain.coupon.repository.CouponRepository;
import com.capstone.capstone_design.domain.coupon.repository.UserCouponRepository;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

//사용자용임
@Service
@RequiredArgsConstructor
public class UserCouponService {

    private final CouponRepository couponRepository;
    private final UserCouponRepository userCouponRepository;
    private final UserService userService;

    // 사용 가능한 쿠폰 목록 조회 (사용자용)
    @Transactional(readOnly = true)
    public List<CouponResponseDto> getAvailableCoupons() {
        return couponRepository.findAvailableCoupons().stream()
                .map(CouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 쿠폰 발급 받기
    @Transactional
    public UserCouponResponseDto claimCoupon(Long couponId) {
        Users user = userService.getAuthenticatedUser();

        // 중복 발급 체크
        if (userCouponRepository.existsByUsersIdAndCouponId(user.getId(), couponId)) {
            throw new IllegalStateException("이미 발급받은 쿠폰입니다.");
        }

        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));

        try {
            coupon.incrementIssuedCount();

            UserCoupon userCoupon = UserCoupon.builder()
                    .coupon(coupon)
                    .users(user)
                    .status(CouponStatus.ACTIVE)
                    .issuedAt(LocalDateTime.now())
                    .build();

            UserCoupon savedUserCoupon = userCouponRepository.save(userCoupon);
            return UserCouponResponseDto.from(savedUserCoupon);

        } catch (ObjectOptimisticLockingFailureException e) {
            throw new IllegalStateException("쿠폰이 모두 소진되었습니다. 다시 시도해주세요.");
        }
    }

    // 내 쿠폰 목록 조회
    @Transactional(readOnly = true)
    public List<UserCouponResponseDto> getMyCoupons() {
        Users user = userService.getAuthenticatedUser();
        return userCouponRepository.findByUsersIdOrderByIssuedAtDesc(user.getId()).stream()
                .map(UserCouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 사용 가능한 내 쿠폰 목록 조회
    @Transactional(readOnly = true)
    public List<UserCouponResponseDto> getMyActiveCoupons() {
        Users user = userService.getAuthenticatedUser();
        return userCouponRepository.findByUsersIdAndStatus(user.getId(), CouponStatus.ACTIVE).stream()
                .filter(UserCoupon::canUse)  // 만료되지 않은 쿠폰만
                .map(UserCouponResponseDto::from)
                .collect(Collectors.toList());
    }

    // 특정 쿠폰 상세 조회
    @Transactional(readOnly = true)
    public UserCouponResponseDto getUserCouponById(Long userCouponId) {
        Users user = userService.getAuthenticatedUser();
        UserCoupon userCoupon = userCouponRepository.findById(userCouponId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 쿠폰을 찾을 수 없습니다."));

        // 본인 쿠폰인지 확인
        if (!userCoupon.getUsers().getId().equals(user.getId())) {
            throw new SecurityException("본인의 쿠폰만 조회할 수 있습니다.");
        }

        return UserCouponResponseDto.from(userCoupon);
    }
}
