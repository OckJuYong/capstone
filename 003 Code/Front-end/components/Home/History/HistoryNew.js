// dd 스타일의 주문내역 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { orderService } from '../../../services';

export default function HistoryNew({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      console.log('📦 주문 내역 로딩 중...');
      setLoading(true);

      // orderService.getMyOrders() 호출
      const ordersData = await orderService.getMyOrders();

      console.log(`✅ ${ordersData.length}개 주문 로드 완료`);

      // 백엔드 응답을 프론트엔드 형식으로 변환
      const formattedOrders = ordersData.map(order => {
        const orderDate = new Date(order.createdAt);

        // 주문 상태 한글 변환
        const statusMap = {
          'PENDING': '주문접수',
          'PROCESSING': '조리중',
          'COMPLETED': '배달완료',
          'CANCELLED': '주문취소',
        };

        return {
          id: order.orderId,
          restaurantName: order.orderMenus?.[0]?.restaurantName || '식당',
          date: orderDate.toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
          time: orderDate.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          items: (order.orderMenus || []).map(menu => ({
            name: menu.menuName,
            quantity: menu.quantity,
            price: menu.menuPrice,
            image: 'https://via.placeholder.com/80x80',
          })),
          total: order.totalPrice,
          status: statusMap[order.status] || order.status,
          originalStatus: order.status, // 원본 상태값 보관
          type: order.type, // DELIVERY, TAKEAWAY, DINE_IN
        };
      });

      setOrders(formattedOrders);

    } catch (error) {
      console.error('❌ 주문 내역 로딩 실패:', error);
      Alert.alert('오류', '주문 내역을 불러올 수 없습니다.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewWrite = (orderId) => {
    // 리뷰 쓰기 페이지로 이동
    console.log('리뷰 쓰기:', orderId);
  };

  const handleReorder = (order) => {
    // 재주문 기능
    console.log('재주문:', order.id);
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>주문내역</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>주문 내역을 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>주문내역</Text>
      </View>

      <ScrollView style={styles.content}>
        {orders.length > 0 ? (
          <View style={styles.ordersList}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* 주문 헤더 */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Text style={styles.restaurantName}>{order.restaurantName}</Text>
                    <Text style={styles.orderMeta}>
                      {order.date} {order.time} • {order.status}
                    </Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>

                {/* 주문 아이템들 */}
                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.reviewButton}
                        onPress={() => handleReviewWrite(order.id)}
                      >
                        <Text style={styles.reviewButtonText}>✏️ 리뷰쓰기</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* 주문 총액 */}
                <View style={styles.orderTotal}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>총 결제금액</Text>
                    <Text style={styles.totalAmount}>{order.total.toLocaleString()}원</Text>
                  </View>
                </View>

                {/* 액션 버튼들 */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.reorderButton}
                    onPress={() => handleReorder(order)}
                  >
                    <Text style={styles.reorderButtonText}>재주문</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.detailButton}
                    onPress={() => {}}
                  >
                    <Text style={styles.detailButtonText}>주문상세</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>주문 내역이 없습니다</Text>
            <Text style={styles.emptyDescription}>
              맛있는 음식을 주문해보세요!
            </Text>
            <TouchableOpacity 
              style={styles.orderNowButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.orderNowText}>주문하러 가기</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  orderHeaderLeft: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  orderMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '500',
  },
  orderItems: {
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6b7280',
  },
  reviewButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reviewButtonText: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  orderTotal: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  detailButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    minHeight: 400,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  orderNowButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  orderNowText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
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