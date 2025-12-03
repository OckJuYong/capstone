package com.capstone.capstone_design.domain.admin.controller;

import com.capstone.capstone_design.domain.admin.dto.AdminLoginRequestDto;
import com.capstone.capstone_design.domain.admin.service.AdminAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "관리자 인증 API")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    // 로그인
    @PostMapping("/login")
    @Operation(summary = "관리자 로그인", description = "관리자 이메일과 비밀번호로 로그인하여 JWT 토큰을 발급받습니다.")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequestDto request) {
        return adminAuthService.login(request);
    }
}
