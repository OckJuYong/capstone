// dd 스타일의 결제 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { orderService } from '../../services';

export default function PaymentNew({ route, navigation }) {
  const { cartItems = [], restaurant = {}, deliveryOption = 'delivery' } = route.params || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  // 기본 주문 정보 (실제로는 route params에서 받아와야 함)
  const orderInfo = {
    restaurantName: restaurant.name || "메종 크림 파스타",
    items: cartItems.length > 0 ? cartItems : [
      { name: "크림 파스타", quantity: 1, price: 15000 },
      { name: "토마토 파스타", quantity: 1, price: 14000 },
    ],
    deliveryFee: 3000,
    couponDiscount: couponApplied ? 2000 : 0,
  };

  const subtotal = orderInfo.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + orderInfo.deliveryFee - orderInfo.couponDiscount;

  const paymentMethods = [
    { id: 'card', name: '신용/체크카드', icon: '💳' },
    { id: 'kakao', name: '카카오페이', icon: '💛' },
    { id: 'toss', name: '토스페이', icon: '💙' },
    { id: 'phone', name: '휴대폰 결제', icon: '📱' },
  ];

  const handlePayment = () => {
    Alert.alert(
      "결제 확인",
      `${total.toLocaleString()}원을 결제하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "결제하기",
          onPress: async () => {
            try {
              console.log('💳 주문 생성 중...');
              setLoading(true);

              // 주문 타입 변환: delivery → DELIVERY, pickup → TAKEAWAY
              const orderTypeMap = {
                'delivery': 'DELIVERY',
                'pickup': 'TAKEAWAY',
              };

              // 주문 데이터 구성
              const orderData = {
                orderType: orderTypeMap[deliveryOption] || 'DELIVERY',
                orderMenus: orderInfo.items.map(item => ({
                  menuId: item.id || item.menuId,
                  quantity: item.quantity,
                })),
                couponId: couponApplied ? 1 : null,
              };

              // orderService.createOrder() 호출
              const createdOrder = await orderService.createOrder(orderData);

              console.log('✅ 주문 생성 완료:', createdOrder);

              setLoading(false);

              Alert.alert(
                "결제 완료",
                "주문이 완료되었습니다!",
                [
                  {
                    text: "확인",
                    onPress: () => {
                      // 주문 내역 화면으로 이동
                      navigation.navigate('MyPage', { screen: 'History' });
                    }
                  }
                ]
              );

            } catch (error) {
              console.error('❌ 주문 생성 실패:', error);
              setLoading(false);
              Alert.alert('오류', '주문 처리에 실패했습니다. 다시 시도해주세요.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>결제</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 주문 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주문 정보</Text>
          <View style={styles.orderCard}>
            <Text style={styles.restaurantName}>{orderInfo.restaurantName}</Text>
            
            {orderInfo.items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>수량: {item.quantity}개</Text>
                </View>
                <Text style={styles.itemPrice}>
                  {(item.price * item.quantity).toLocaleString()}원
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 결제 수단 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 수단</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  paymentMethod === method.id && styles.paymentMethodSelected
                ]}
                onPress={() => setPaymentMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <Text style={styles.methodIcon}>{method.icon}</Text>
                  <Text style={styles.methodName}>{method.name}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  paymentMethod === method.id && styles.radioButtonSelected
                ]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 쿠폰 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>할인 혜택</Text>
          <TouchableOpacity 
            style={styles.couponCard}
            onPress={() => setCouponApplied(!couponApplied)}
          >
            <View style={styles.couponLeft}>
              <Text style={styles.couponIcon}>🎫</Text>
              <View>
                <Text style={styles.couponTitle}>쿠폰 사용</Text>
                <Text style={styles.couponDesc}>
                  {couponApplied ? '2,000원 할인 쿠폰 적용됨' : '사용 가능한 쿠폰이 있습니다'}
                </Text>
              </View>
            </View>
            <Text style={styles.couponArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 결제 금액 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 금액</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>주문 금액</Text>
              <Text style={styles.priceValue}>{subtotal.toLocaleString()}원</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>배달팁</Text>
              <Text style={styles.priceValue}>{orderInfo.deliveryFee.toLocaleString()}원</Text>
            </View>
            {orderInfo.couponDiscount > 0 && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>쿠폰 할인</Text>
                <Text style={[styles.priceValue, styles.discountText]}>
                  -{orderInfo.couponDiscount.toLocaleString()}원
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>총 결제 금액</Text>
              <Text style={styles.totalValue}>{total.toLocaleString()}원</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 결제 버튼 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, loading && styles.paymentButtonDisabled]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.paymentButtonText}>
              {total.toLocaleString()}원 결제하기
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  paymentMethods: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  paymentMethodSelected: {
    backgroundColor: '#f3f4f6',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  methodName: {
    fontSize: 16,
    color: '#111827',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  radioButtonSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#8b5cf6',
  },
  couponCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  couponIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  couponDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  couponArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  priceCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  discountText: {
    color: '#ef4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  paymentButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  paymentButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.7,
  },
});