// Review.java
package com.capstone.capstone_design.domain.review.model;

import com.capstone.capstone_design.domain.menu.model.Menu;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;

import com.capstone.capstone_design.domain.user.model.Users;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Column(name = "review_content")
    private String content;

    @OneToOne(mappedBy = "review", cascade = CascadeType.ALL)
    private ReviewTaste reviewTaste;

    // 리뷰 수정 메소드
    public void update(String content) {
        this.content = content;
    }
}