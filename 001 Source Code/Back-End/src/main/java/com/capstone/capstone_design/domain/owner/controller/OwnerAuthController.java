package com.capstone.capstone_design.domain.owner.controller;

import com.capstone.capstone_design.domain.owner.dto.OwnerLoginRequestDto;
import com.capstone.capstone_design.domain.owner.dto.OwnerSignupRequestDto;
import com.capstone.capstone_design.domain.owner.service.OwnerAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
@Tag(name = "사장님 인증 API")
public class OwnerAuthController {

    private final OwnerAuthService ownerAuthService;

    @PostMapping("/signup")
    @Operation(summary = "사장님 회원가입")
    public ResponseEntity<?> signup(@RequestBody OwnerSignupRequestDto requestDto) {
        return ownerAuthService.signup(requestDto);
    }

    @PostMapping("/login")
    @Operation(summary = "사장님 로그인")
    public ResponseEntity<?> login(@RequestBody OwnerLoginRequestDto requestDto) {
        return ownerAuthService.login(requestDto);
    }
}
