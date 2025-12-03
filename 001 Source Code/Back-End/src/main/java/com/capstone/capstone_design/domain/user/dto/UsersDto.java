package com.capstone.capstone_design.domain.user.dto;

import java.math.BigDecimal;

import com.capstone.capstone_design.domain.user.model.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UsersDto {
    private Long id;
    private String name;
    private String email;
    private String nickname;
    private String address;
    private String phoneNumber;

    private UserTasteDto userTaste;

    public UsersDto(Long id, String name, String email, String nickname, String address, String phoneNumber, UserTasteDto userTaste) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.userTaste = userTaste;
    }

    public static UsersDto fromEntity(Users entity) {
        if (entity == null) return null;
        return new UsersDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getNickname(),
                entity.getAddress(),
                entity.getPhoneNumber(),
                UserTasteDto.fromEntity(entity.getUserTaste())
        );
    }
}
