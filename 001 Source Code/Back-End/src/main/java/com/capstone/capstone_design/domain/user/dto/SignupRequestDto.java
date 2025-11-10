package com.capstone.capstone_design.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignupRequestDto {
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String address;
    private String phoneNumber;
    private UserTasteDto userTaste;
}
