package com.capstone.capstone_design.domain.owner.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "사장님 로그인 요청 DTO")
public class OwnerLoginRequestDto {

    @Schema(description = "이메일", example = "owner@example.com")
    private String email;

    @Schema(description = "비밀번호", example = "password123")
    private String password;
}
