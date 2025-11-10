package com.capstone.capstone_design.domain.order.model;

import com.capstone.capstone_design.domain.user.model.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @Column(name = "total_price")
    private Long totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_type")
    private OrderType type;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderMenu> orderMenus = new ArrayList<>();

    // 주문 항목 추가
    public void addOrderMenu(OrderMenu orderMenu) {
        this.orderMenus.add(orderMenu);
        orderMenu.setOrder(this);
    }

    // 주문 상태 변경
    public void updateStatus(OrderStatus newStatus) {
        this.status = newStatus;
    }

    // 주문 취소 (사용자)
    public void cancel() {
        if (this.status != OrderStatus.PENDING) {
            throw new IllegalStateException("대기 중인 주문만 취소할 수 있습니다.");
        }
        this.status = OrderStatus.CANCELLED;
    }

    // 주문 접수 (사장님)
    public void accept() {
        if (this.status != OrderStatus.PENDING) {
            throw new IllegalStateException("대기 중인 주문만 접수할 수 있습니다.");
        }
        this.status = OrderStatus.PROCESSING;
    }

    // 주문 완료 (사장님)
    public void complete() {
        if (this.status != OrderStatus.PROCESSING) {
            throw new IllegalStateException("처리 중인 주문만 완료할 수 있습니다.");
        }
        this.status = OrderStatus.COMPLETED;
    }

    // 주문 거절 (사장님)
    public void reject() {
        if (this.status != OrderStatus.PENDING) {
            throw new IllegalStateException("대기 중인 주문만 거절할 수 있습니다.");
        }
        this.status = OrderStatus.CANCELLED;
    }
}