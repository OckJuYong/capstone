package com.capstone.capstone_design.config;

import com.capstone.capstone_design.domain.admin.repository.AdminRepository;
import com.capstone.capstone_design.domain.owner.repository.OwnerRepository;
import com.capstone.capstone_design.domain.user.model.Users;
import com.capstone.capstone_design.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;
    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Users, Owner, Admin 테이블에서 순차적으로 찾기
        return userRepository.findByEmailWithTaste(email)
            .map(user -> (UserDetails) new UserDetailsImpl(user))
            .or(() -> ownerRepository.findByEmail(email)
                .map(owner -> (UserDetails) new OwnerDetailsImpl(owner)))
            .or(() -> adminRepository.findByEmail(email)
                .map(admin -> (UserDetails) new AdminDetailsImpl(admin)))
            .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));
    }
}
