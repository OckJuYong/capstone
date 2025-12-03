package com.capstone.capstone_design.domain.admin.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "관리자 로그인 요청 DTO")
public class AdminLoginRequestDto {

    @Schema(description = "관리자 이메일", example = "admin@test.com")
    private String email;

    @Schema(description = "비밀번호", example = "admin1234")
    private String password;
}