package com.capstone.capstone_design.domain.admin.model;

import com.capstone.capstone_design.domain.notice.model.Notice;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "admin")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id;

    @Column(name = "admin_name")
    private String name;

    @Column(name = "admin_nickname")
    private String nickname;

    @Column(name = "admin_password")
    private String password;

    @Column(name = "admin_email")
    private String email;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Notice> notices = new ArrayList<>();
}