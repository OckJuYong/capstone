package com.capstone.capstone_design.domain.menu.model;

import com.capstone.capstone_design.domain.user.model.Users;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "menu_taste")
public class MenuTaste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_taste_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")

    private Users users;

    @Column(name = "menu_spicy")
    private BigDecimal spicy;

    @Column(name = "menu_umami")
    private BigDecimal umami;

    @Column(name = "menu_sour")
    private BigDecimal sour;

    @Column(name = "menu_sweet")
    private BigDecimal sweet;

    @Column(name = "menu_salty")
    private BigDecimal salty;

    @Column(name = "menu_bitter")
    private BigDecimal bitter;
}