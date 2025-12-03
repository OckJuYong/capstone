package com.capstone.capstone_design.config;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CSRF(Cross-Site Request Forgery) 보호 비활성화
            .csrf(AbstractHttpConfigurer::disable).cors(Customizer.withDefaults())

            // HTTP Basic 인증 및 Form Login 비활성화
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)

            // H2 콘솔 허용
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))

            // 세션을 사용하지 않는 Stateless 서버로 설정
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 경로별 접근 권한 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/signup", "/api/v1/login").permitAll()
                .requestMatchers("/api/v1/owner/signup", "/api/v1/owner/login").permitAll()
                .requestMatchers("/api/v1/admin/login").permitAll()
                .requestMatchers("/api/v1/restaurants/**", "/api/v1/notices/**").permitAll()
                // Swagger 및 H2 Console
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                // 역할 기반 접근 제어
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/owner/**").hasRole("OWNER")
                .requestMatchers("/api/v1/users/**").hasRole("USER")
                // 나머지는 인증 필요
                .anyRequest().authenticated()
            )

            //  JWT 필터를 기본 필터 앞에 배치
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}