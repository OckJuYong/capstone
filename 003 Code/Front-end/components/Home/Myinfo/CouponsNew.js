// dd 스타일의 쿠폰함 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { couponService } from '../../../services';

export default function CouponsNew({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      console.log('🎫 쿠폰 목록 로딩 중...');
      setLoading(true);

      // couponService.getMyCoupons() 호출
      const couponsData = await couponService.getMyCoupons();

      console.log(`✅ ${couponsData.length}개 쿠폰 로드 완료`);

      // 백엔드 응답을 프론트엔드 형식으로 변환
      const formattedCoupons = couponsData.map(coupon => {
        console.log('🎫 쿠폰 데이터:', JSON.stringify(coupon, null, 2));

        const expiryDate = new Date(coupon.validUntil || coupon.expiry);
        const isExpired = expiryDate < new Date();
        const isUsed = coupon.status === 'USED' || coupon.isUsed || isExpired;

        // 할인 금액 포맷팅 (비정상적으로 큰 금액은 표시 수정)
        const discountAmount = coupon.discountAmount || 0;
        const discountText = discountAmount > 100000
          ? `${Math.floor(discountAmount / 10000).toLocaleString()}만원`
          : `${discountAmount.toLocaleString()}원`;

        return {
          id: coupon.id || coupon.userCouponId,
          name: coupon.couponName || coupon.name || '할인 쿠폰',
          discount: discountText,
          discountAmount: discountAmount,
          minOrder: coupon.minOrderAmount ? `${coupon.minOrderAmount.toLocaleString()}원 이상` : "제한 없음",
          expiry: expiryDate.toISOString().split('T')[0],
          isUsed: isUsed,
          // 추가 정보
          restaurantName: coupon.restaurantName || null,
          status: coupon.status || 'ACTIVE',
          canUse: coupon.canUse !== false && !isUsed,
        };
      });

      // 사용 가능한 쿠폰을 위로, 할인 금액 순으로 정렬
      formattedCoupons.sort((a, b) => {
        if (a.isUsed !== b.isUsed) return a.isUsed ? 1 : -1;
        return b.discountAmount - a.discountAmount;
      });

      setCoupons(formattedCoupons);

    } catch (error) {
      console.error('❌ 쿠폰 목록 로딩 실패:', error);
      Alert.alert('오류', '쿠폰 목록을 불러올 수 없습니다.');
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const availableCoupons = coupons.filter(c => !c.isUsed);

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>쿠폰함</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>쿠폰 목록을 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>쿠폰함</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 쿠폰 요약 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>🎫</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>보유 쿠폰</Text>
              <Text style={styles.summaryCount}>
                사용 가능한 쿠폰 {availableCoupons.length}장
              </Text>
            </View>
          </View>
        </View>

        {/* 쿠폰 목록 */}
        <View style={styles.couponsSection}>
          <Text style={styles.sectionTitle}>내 쿠폰</Text>
          
          <View style={styles.couponsList}>
            {coupons.map((coupon) => (
              <View 
                key={coupon.id} 
                style={[
                  styles.couponCard,
                  coupon.isUsed && styles.couponCardUsed
                ]}
              >
                <View style={styles.couponHeader}>
                  <View style={styles.couponBadge}>
                    <Text style={styles.couponBadgeText}>
                      {coupon.isUsed ? '사용완료' : '사용가능'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.couponContent}>
                  <Text style={[
                    styles.couponName,
                    coupon.isUsed && styles.couponNameUsed
                  ]}>
                    {coupon.name}
                  </Text>

                  <Text style={[
                    styles.couponDiscount,
                    coupon.isUsed && styles.couponDiscountUsed
                  ]}>
                    {coupon.discount} 할인
                  </Text>

                  {/* 사용처 (식당 이름) */}
                  {coupon.restaurantName && (
                    <View style={styles.restaurantInfo}>
                      <Text style={styles.restaurantIcon}>🏪</Text>
                      <Text style={[
                        styles.restaurantName,
                        coupon.isUsed && styles.restaurantNameUsed
                      ]}>
                        {coupon.restaurantName}
                      </Text>
                    </View>
                  )}

                  <View style={styles.couponDetails}>
                    <Text style={[
                      styles.couponCondition,
                      coupon.isUsed && styles.couponConditionUsed
                    ]}>
                      {coupon.minOrder} 주문 시
                    </Text>
                    <Text style={[
                      styles.couponExpiry,
                      coupon.isUsed && styles.couponExpiryUsed
                    ]}>
                      유효기간: ~{coupon.expiry}
                    </Text>
                  </View>
                </View>

                {!coupon.isUsed && (
                  <TouchableOpacity style={styles.useCouponButton}>
                    <Text style={styles.useCouponButtonText}>사용하기</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 쿠폰 사용 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>쿠폰 사용 안내</Text>
              <Text style={styles.infoText}>
                • 결제 시 자동으로 적용 가능한 쿠폰이 표시됩니다{'\n'}
                • 쿠폰은 유효기간 내에만 사용 가능합니다{'\n'}
                • 일부 상품은 쿠폰 사용이 제한될 수 있습니다{'\n'}
                • 쿠폰은 중복 사용이 불가능합니다
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  summarySection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryCard: {
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e879f9',
  },
  summaryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  couponsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  couponsList: {
    paddingHorizontal: 16,
  },
  couponCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  couponCardUsed: {
    backgroundColor: '#f9fafb',
    opacity: 0.7,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  couponBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  couponBadgeText: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  couponContent: {
    marginBottom: 12,
  },
  couponName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  couponNameUsed: {
    color: '#9ca3af',
  },
  couponDiscount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  couponDiscountUsed: {
    color: '#9ca3af',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  restaurantIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  restaurantName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  restaurantNameUsed: {
    color: '#9ca3af',
  },
  couponDetails: {
    gap: 4,
  },
  couponCondition: {
    fontSize: 14,
    color: '#6b7280',
  },
  couponConditionUsed: {
    color: '#9ca3af',
  },
  couponExpiry: {
    fontSize: 12,
    color: '#9ca3af',
  },
  couponExpiryUsed: {
    color: '#9ca3af',
  },
  useCouponButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  useCouponButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  infoSection: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
});