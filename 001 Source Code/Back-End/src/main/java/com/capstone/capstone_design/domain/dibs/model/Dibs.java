package com.capstone.capstone_design.domain.dibs.model;

import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.user.model.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter(AccessLevel.PACKAGE)
@NoArgsConstructor()
@Table(name = "dibs")
public class Dibs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dibs_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public Dibs(Users users, Restaurant restaurant) {
        this.users = users;
        this.restaurant = restaurant;
    }
}