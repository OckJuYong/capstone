package com.capstone.capstone_design.domain.review.service;

import com.capstone.capstone_design.domain.menu.model.Menu;
import com.capstone.capstone_design.domain.menu.repository.MenuRepository;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.restaurant.repository.RestaurantRepository;
import com.capstone.capstone_design.domain.review.dto.ReviewCreateRequestDto;
import com.capstone.capstone_design.domain.review.dto.ReviewListResponseDto;
import com.capstone.capstone_design.domain.review.dto.ReviewUpdateRequestDto;
import com.capstone.capstone_design.domain.review.model.Review;
import com.capstone.capstone_design.domain.review.model.ReviewTaste;
import com.capstone.capstone_design.domain.review.repository.ReviewRepository;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.repository.UserRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;

    //리뷰 작성
    @Transactional
    public Long createReview(Long userId, Long restaurantId, ReviewCreateRequestDto request) {
        Users user = userRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("유저를 찾을 수 없습니다."));
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
            .orElseThrow(() -> new NoSuchElementException("식당을 찾을 수 없습니다."));
        Menu menu = menuRepository.findById(request.getMenuId())
            .orElseThrow(() -> new NoSuchElementException("메뉴를 찾을 수 없습니다."));

        // 맛평가 객체 생성
        ReviewTaste reviewTaste = ReviewTaste.builder()
            .spicy(request.getSpicy())
            .umami(request.getUmami())
            .sour(request.getSour())
            .sweet(request.getSweet())
            .salty(request.getSalty())
            .bitter(request.getBitter())
            .build();

        Review newReview = Review.builder()
            .content(request.getContent())
            .users(user)
            .restaurant(restaurant)
            .menu(menu)
            .reviewTaste(reviewTaste)
            .build();

        reviewTaste.setReview(newReview);

        return reviewRepository.save(newReview).getId();

    }

    //리뷰 수정
    @Transactional
    public void updateReview(Long reviewId, Long userId, ReviewUpdateRequestDto request) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new NoSuchElementException("해당 리뷰를 찾을 수 없습니다."));
        if (!review.getUsers().getId().equals(userId)) {
            throw new SecurityException("리뷰를 수정할 권한이 없습니다.");
        }

        review.update(request.getContent());
        review.getReviewTaste().update(
            request.getSpicy(), request.getUmami(), request.getSour(),
            request.getSweet(), request.getSalty(), request.getBitter()
        );
    }

    //리뷰 조회
    @Transactional(readOnly = true)
    public List<ReviewListResponseDto> findReviewsByRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
            .orElseThrow(() -> new NoSuchElementException("해당 식당을 찾을 수 없습니다."));
        List<Review> reviews = reviewRepository.findAllByRestaurant(restaurant);

        return reviews.stream()
            .map(ReviewListResponseDto::new)
            .collect(Collectors.toList());
    }

    //리뷰 삭제
    @Transactional
    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new NoSuchElementException("해당 리뷰를 찾을 수 없습니다."));
        if (!review.getUsers().getId().equals(userId)) {
            throw new SecurityException("리뷰를 삭제할 권한이 없습니다.");
        }
        reviewRepository.delete(review);
    }
}
