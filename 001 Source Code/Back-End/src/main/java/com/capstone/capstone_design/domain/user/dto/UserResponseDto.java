package com.capstone.capstone_design.domain.user.dto;

import com.capstone.capstone_design.domain.user.model.Users;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String nickname;
    private String address;
    private String phoneNumber;
    private UserTasteDto userTaste;

    @Builder
    public UserResponseDto(Long id, String name, String email, String nickname, String address, String phoneNumber, UserTasteDto userTaste) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.userTaste = userTaste;
    }

    public static UserResponseDto from(Users user) {
        return UserResponseDto.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .nickname(user.getNickname())
            .address(user.getAddress())
            .phoneNumber(user.getPhoneNumber())
            .userTaste(UserTasteDto.fromEntity(user.getUserTaste()))
            .build();
    }
}