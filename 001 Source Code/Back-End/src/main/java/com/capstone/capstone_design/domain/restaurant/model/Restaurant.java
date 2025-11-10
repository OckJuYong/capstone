package com.capstone.capstone_design.domain.restaurant.model;


import com.capstone.capstone_design.domain.coupon.model.Coupon;
import com.capstone.capstone_design.domain.dibs.model.Dibs;
import com.capstone.capstone_design.domain.menu.model.Menu;
import com.capstone.capstone_design.domain.owner.model.Owner;
import com.capstone.capstone_design.domain.review.model.Review;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private Owner owner;

    @Column(name = "restaurant_name", nullable = false)
    private String name;

    @Column(name = "restaurant_address", nullable = false)
    private String address;

    @Column(name = "restaurant_number")
    private String number;

    @Column(name = "restaurant_time")
    private String time;

    @Column(name = "restaurant_introduce")
    private String introduce;

    @Builder.Default // 빌더 패턴 사용 시 List를 null이 아닌 빈 리스트로 초기화
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Menu> menus = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Dibs> dibs = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Coupon> coupons = new ArrayList<>();

}
