package com.capstone.capstone_design.domain.user.controller;

import com.capstone.capstone_design.domain.user.dto.LoginRequestDto;
import com.capstone.capstone_design.domain.user.dto.SignupRequestDto;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
@Tag(name = "로그인/회원가입 API")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto requestDto) {
        return authService.signup(requestDto);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto requestDto) {
        return authService.login(requestDto);
    }



    /*
    /signup : 사용자 생성 POST
    /login : 로그인 POST
     */
}
