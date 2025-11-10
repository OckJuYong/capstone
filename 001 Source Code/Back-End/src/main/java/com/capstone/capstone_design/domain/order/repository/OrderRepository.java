package com.capstone.capstone_design.domain.order.repository;

import com.capstone.capstone_design.domain.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 특정 사용자의 주문 목록 조회
    @Query("SELECT o FROM Order o " +
           "LEFT JOIN FETCH o.orderMenus om " +
           "LEFT JOIN FETCH om.menu " +
           "WHERE o.users.id = :userId " +
           "ORDER BY o.createdAt DESC")
    List<Order> findByUsersIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    // 특정 식당의 주문 목록 조회 (메뉴를 통해)
    @Query("SELECT DISTINCT o FROM Order o " +
           "LEFT JOIN FETCH o.orderMenus om " +
           "LEFT JOIN FETCH om.menu m " +
           "WHERE m.restaurant.id = :restaurantId " +
           "ORDER BY o.createdAt DESC")
    List<Order> findByRestaurantId(@Param("restaurantId") Long restaurantId);
}
