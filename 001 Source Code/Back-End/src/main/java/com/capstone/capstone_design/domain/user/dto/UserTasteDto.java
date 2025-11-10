package com.capstone.capstone_design.domain.user.dto;

import java.math.BigDecimal;

import com.capstone.capstone_design.domain.user.model.UserTaste;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class UserTasteDto {
    private BigDecimal spicy;
    private BigDecimal umami;
    private BigDecimal sour;
    private BigDecimal sweet;
    private BigDecimal salty;
    private BigDecimal bitter;

    public UserTasteDto(BigDecimal spicy, BigDecimal umami, BigDecimal sour, BigDecimal sweet, BigDecimal salty, BigDecimal bitter) {
        this.spicy = spicy;
        this.umami = umami;
        this.sour = sour;
        this.sweet = sweet;
        this.salty = salty;
        this.bitter = bitter;
    }

    public static UserTasteDto fromEntity(UserTaste entity) {
        if (entity == null) return null;
        return new UserTasteDto(
                entity.getSpicy(),
                entity.getUmami(),
                entity.getSour(),
                entity.getSweet(),
                entity.getSalty(),
                entity.getBitter()
        );
    }
}

