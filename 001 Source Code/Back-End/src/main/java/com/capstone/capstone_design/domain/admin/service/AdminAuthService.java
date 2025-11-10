package com.capstone.capstone_design.domain.admin.service;

import com.capstone.capstone_design.config.JwtUtil;
import com.capstone.capstone_design.domain.admin.dto.AdminLoginRequestDto;
import com.capstone.capstone_design.domain.admin.model.Admin;
import com.capstone.capstone_design.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 로그인
    @Transactional
    public ResponseEntity<?> login(AdminLoginRequestDto request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        String accessToken = jwtUtil.createAccessToken(admin.getEmail());

        return ResponseEntity.ok(accessToken);
    }
}
