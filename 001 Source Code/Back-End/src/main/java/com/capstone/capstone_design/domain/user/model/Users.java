package com.capstone.capstone_design.domain.user.model;

import com.capstone.capstone_design.domain.dibs.model.Dibs;
import com.capstone.capstone_design.domain.order.model.Order;
import com.capstone.capstone_design.domain.review.model.Review;
import com.capstone.capstone_design.domain.user.dto.SignupRequestDto;
import com.capstone.capstone_design.domain.user.dto.UserUpdateRequestDto;
import com.capstone.capstone_design.domain.user.model.UserTaste;
import com.capstone.capstone_design.domain.coupon.model.UserCoupon;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    @Column(name = "users_name")
    private String name;

    private String password;
    private String email;
    private String nickname;
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
    private UserTaste userTaste;

    @Builder.Default
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<Dibs> dibsList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<UserCoupon> userCoupons = new ArrayList<>();

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserTaste(UserTaste userTaste) {
        this.userTaste = userTaste;
    }

    public void update(UserUpdateRequestDto request) {
        this.nickname = request.getNickname();
        this.address = request.getAddress();
        this.phoneNumber = request.getPhoneNumber();
    }


//    public static Users from(SignupRequestDto dto) {
//        Users user = new Users();
//        user.name = dto.getName();
//        user.email = dto.getEmail();
//        user.password = dto.getPassword();
//        user.nickname = dto.getNickname();
//        user.address = dto.getAddress();
//        user.phoneNumber = dto.getPhoneNumber();
//        return user;
//    }
}