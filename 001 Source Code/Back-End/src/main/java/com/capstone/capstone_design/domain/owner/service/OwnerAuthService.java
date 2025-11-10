package com.capstone.capstone_design.domain.owner.service;

import com.capstone.capstone_design.config.JwtUtil;
import com.capstone.capstone_design.domain.owner.dto.OwnerLoginRequestDto;
import com.capstone.capstone_design.domain.owner.dto.OwnerSignupRequestDto;
import com.capstone.capstone_design.domain.owner.model.Owner;
import com.capstone.capstone_design.domain.owner.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OwnerAuthService {

    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입
    @Transactional
    public ResponseEntity<?> signup(OwnerSignupRequestDto request) {
        if (ownerRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Owner newOwner = Owner.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .name(request.getName())
                .build();

        ownerRepository.save(newOwner);
        return ResponseEntity.status(HttpStatus.CREATED).body("사장님 회원가입이 성공적으로 완료되었습니다.");
    }

    // 로그인
    @Transactional
    public ResponseEntity<?> login(OwnerLoginRequestDto request) {
        Owner owner = ownerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), owner.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        String accessToken = jwtUtil.createAccessToken(owner.getEmail());

        return ResponseEntity.ok(accessToken);
    }
}
