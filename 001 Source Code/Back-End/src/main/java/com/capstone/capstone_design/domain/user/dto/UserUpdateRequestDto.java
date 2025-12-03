package com.capstone.capstone_design.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequestDto {
    private String nickname;
    private String address;
    private String phoneNumber;
}
