package com.capstone.capstone_design.domain.restaurant.repository;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByName(String name);

    @Query("SELECT r FROM Restaurant r " +
           "LEFT JOIN FETCH r.menus " +
           "WHERE r.id = :id")
    Optional<Restaurant> findByIdWithMenus(@Param("id") Long id);
}
