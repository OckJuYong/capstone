package com.capstone.capstone_design.domain.user.repository;

import com.capstone.capstone_design.domain.user.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    //Optional<Users> findByEmail(String email);

    @Query("SELECT u FROM Users u LEFT JOIN FETCH u.userTaste WHERE u.email = :email")
    Optional<Users> findByEmailWithTaste(@Param("email") String email);

    @Query("SELECT u FROM Users u LEFT JOIN FETCH u.userTaste WHERE u.id = :id")
    Optional<Users> findByIdWithTaste(@Param("id") Long id);

    @Query("SELECT u FROM Users u " +
           "LEFT JOIN FETCH u.dibsList d " +
           "LEFT JOIN FETCH d.restaurant " +
           "WHERE u.id = :id")
    Optional<Users> findByIdWithDibs(@Param("id") Long id);

    @Query("SELECT DISTINCT u FROM Users u " +
           "LEFT JOIN FETCH u.orders o " +
           "LEFT JOIN FETCH o.orderMenus om " +
           "LEFT JOIN FETCH om.menu " +
           "WHERE u.id = :id")
    Optional<Users> findByIdWithOrders(@Param("id") Long id);

    @Query("SELECT DISTINCT u FROM Users u " +
           "LEFT JOIN FETCH u.reviews r " +
           "LEFT JOIN FETCH r.users " +
           "LEFT JOIN FETCH r.menu " +
           "LEFT JOIN FETCH r.restaurant " +
           "WHERE u.id = :id")
    Optional<Users> findByIdWithReviews(@Param("id") Long id);

    @Query("SELECT DISTINCT u FROM Users u " +
           "LEFT JOIN FETCH u.userCoupons uc " +
           "LEFT JOIN FETCH uc.coupon c " +
           "LEFT JOIN FETCH c.restaurant " +
           "LEFT JOIN FETCH uc.usedInOrder " +
           "WHERE u.id = :id")
    Optional<Users> findByIdWithCoupons(@Param("id") Long id);
}
