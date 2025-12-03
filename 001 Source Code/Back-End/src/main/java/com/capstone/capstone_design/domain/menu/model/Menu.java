package com.capstone.capstone_design.domain.menu.model;

import com.capstone.capstone_design.domain.order.model.OrderMenu;
import com.capstone.capstone_design.domain.restaurant.model.Restaurant;
import com.capstone.capstone_design.domain.review.model.Review;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
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
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    @Column(name = "menu_name", nullable = false)
    private String name;

    @Column(name = "menu_price", nullable = false)
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;


    @Builder.Default
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<OrderMenu> orderMenus = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<MenuTaste> menuTastes = new ArrayList<>();

    public void update(String name, Integer price) {
        this.name = name;
        this.price = price;
    }
}