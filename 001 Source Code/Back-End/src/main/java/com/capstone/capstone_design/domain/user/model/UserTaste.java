package com.capstone.capstone_design.domain.user.model;

import com.capstone.capstone_design.domain.user.dto.UserTasteDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users_taste")
public class UserTaste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_taste_id")
    private Long id;

    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @Column(name = "users_spicy")
    private BigDecimal spicy;

    @Column(name = "users_umami")
    private BigDecimal umami;

    @Column(name = "users_sour")
    private BigDecimal sour;

    @Column(name = "users_sweet")
    private BigDecimal sweet;

    @Column(name = "users_salty")
    private BigDecimal salty;

    @Column(name = "users_bitter")
    private BigDecimal bitter;

    public static UserTaste from(UserTasteDto dto, Users user) {
        UserTaste taste = new UserTaste();
        taste.setSpicy(dto.getSpicy());
        taste.setUmami(dto.getUmami());
        taste.setSour(dto.getSour());
        taste.setSweet(dto.getSweet());
        taste.setSalty(dto.getSalty());
        taste.setBitter(dto.getBitter());
        taste.setUsers(user); // Users 엔티티와 연관 설정
        return taste;
    }
}