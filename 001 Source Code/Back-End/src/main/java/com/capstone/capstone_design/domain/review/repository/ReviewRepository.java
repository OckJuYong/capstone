package com.capstone.capstone_design.domain.review.repository;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.review.model.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Restaurant의 Review를 찾아 List로 반환
    @Query("SELECT r FROM Review r " +
           "LEFT JOIN FETCH r.users " +
           "LEFT JOIN FETCH r.menu " +
           "LEFT JOIN FETCH r.restaurant " +
           "WHERE r.restaurant = :restaurant")
    List<Review> findAllByRestaurant(@Param("restaurant") Restaurant restaurant);


}
