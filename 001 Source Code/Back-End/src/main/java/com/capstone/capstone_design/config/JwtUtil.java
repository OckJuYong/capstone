package com.capstone.capstone_design.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final Key key;
    private final Long accessTokenValidityInMilliseconds;

    // application.properties에서 설정한 값 가져오기
    public JwtUtil(
        @Value("${jwt.secret}") String secretKey,
        @Value("${jwt.access-token-validity-in-seconds}") Long accessTokenValidityInSeconds
    ) {
        byte[] keyBytes = secretKey.getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenValidityInMilliseconds = accessTokenValidityInSeconds * 1000;
    }

    // 이메일을 받아 Access Token을 생성
    public String createAccessToken(String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.accessTokenValidityInMilliseconds);

        return Jwts.builder()
            .setSubject(email) // 토큰의 주체 (누구의 토큰인지)
            .setIssuedAt(now) // 토큰 발급 시간
            .setExpiration(validity) // 토큰 만료 시간
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    // 토큰에서 사용자 이메일 추출
    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // 토큰 유효성 & 만료일자 확인
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}
