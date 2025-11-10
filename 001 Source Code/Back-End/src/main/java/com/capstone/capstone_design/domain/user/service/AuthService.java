package com.capstone.capstone_design.domain.user.service;

import com.capstone.capstone_design.config.JwtUtil;
import com.capstone.capstone_design.domain.user.dto.LoginRequestDto;
import com.capstone.capstone_design.domain.user.dto.SignupRequestDto;
import com.capstone.capstone_design.domain.user.dto.UsersDto;
import com.capstone.capstone_design.domain.user.model.UserTaste;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입
    @Transactional
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto request) {
        if (userRepository.findByEmailWithTaste(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Users newUser = Users.builder()
            .email(request.getEmail())
            .password(encodedPassword)
            .name(request.getName())
            .nickname(request.getNickname())
            .address(request.getAddress())
            .phoneNumber(request.getPhoneNumber())
            .build();

        if (request.getUserTaste() != null) {
            UserTaste taste = UserTaste.from(request.getUserTaste(), newUser);
            newUser.setUserTaste(taste);
        }

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 성공적으로 완료되었습니다.");
    }

    //로그인
    @Transactional
    public ResponseEntity<?> login(LoginRequestDto request) {
        Users user = userRepository.findByEmailWithTaste(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        String accessToken = jwtUtil.createAccessToken(user.getEmail());

        return ResponseEntity.ok(accessToken);
    }
}
