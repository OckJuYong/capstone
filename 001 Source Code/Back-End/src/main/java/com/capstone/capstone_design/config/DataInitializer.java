package com.capstone.capstone_design.config;

import com.capstone.capstone_design.domain.admin.model.Admin;
import com.capstone.capstone_design.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile({"local","prod"})
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Admin 계정이 없으면 생성
        if (adminRepository.findByEmail("admin@mobisync.com").isEmpty()) {
            Admin admin = Admin.builder()
                    .email("admin@mobisync.com")
                    .password(passwordEncoder.encode("admin1234"))
                    .name("Admin User")
                    .nickname("admin")
                    .build();
            adminRepository.save(admin);
            System.out.println(" Admin 계정 생성 완료: admin@mobisync.com");
        }
    }
}
