// dd 정확한 디자인으로 수정된 음식점 상세 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet, Alert } from 'react-native';

export default function RestaurantDetailFixed({ route, navigation }) {
  const { restaurant } = route.params || {};
  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);

  // 기본 음식점 정보
  const restaurantInfo = restaurant || {
    id: 1,
    name: "메종 크림 파스타",
    category: ["파스타", "이탈리안"],
    rating: 4.8,
    reviews: 109,
    distance: "1.8km",
    deliveryFee: "3,000원",
    minOrder: "15,000원",
    deliveryTime: "25-35분",
    image: "https://via.placeholder.com/400x200",
    matchPercentage: 92,
    description: "진짜 맛있는 크림파스타 전문점입니다.",
    hours: "10:00 - 22:00",
    phone: "02-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    tasteFactors: {
      spicy: 80, sweet: 30, salty: 60, sour: 20, bitter: 10, umami: 90,
    },
  };

  // 메뉴 데이터
  const menuData = [
    {
      id: 1, name: "크림 파스타", description: "풍부한 크림 소스와 신선한 해산물이 어우러진 파스타",
      price: 15000, image: "https://via.placeholder.com/100x100", popular: true, matchPercentage: 95,
      tasteFactors: { spicy: 20, sweet: 40, salty: 60, sour: 10, bitter: 5, umami: 95 },
    },
    {
      id: 2, name: "토마토 파스타", description: "상큼한 토마토 소스와 바질이 어우러진 파스타",
      price: 14000, image: "https://via.placeholder.com/100x100", popular: false, matchPercentage: 88,
      tasteFactors: { spicy: 40, sweet: 30, salty: 50, sour: 70, bitter: 10, umami: 85 },
    },
    {
      id: 3, name: "트러플 리조또", description: "향긋한 트러플 향이 가득한 크리미한 리조또",
      price: 18000, image: "https://via.placeholder.com/100x100", popular: true, matchPercentage: 90,
      tasteFactors: { spicy: 10, sweet: 20, salty: 65, sour: 5, bitter: 15, umami: 90 },
    },
  ];

  const tabs = [
    { key: 'menu', label: '메뉴' },
    { key: 'info', label: '정보' },
    { key: 'review', label: '리뷰' },
  ];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(isFavorite ? "찜 해제" : "찜 추가", isFavorite ? "찜 목록에서 제거되었습니다." : "찜 목록에 추가되었습니다.");
  };

  const addToCart = (menuItem) => {
    Alert.alert("장바구니 추가", `${menuItem.name}을(를) 장바구니에 추가하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      { text: "추가", onPress: () => Alert.alert("완료", "장바구니에 추가되었습니다!") }
    ]);
  };

  // dd 스타일 맛 평가 바
  const renderTasteFactorBars = (tasteFactors) => {
    const factors = [
      { key: "spicy", label: "매운맛", color: "#ef4444" },
      { key: "sweet", label: "단맛", color: "#ec4899" },
      { key: "salty", label: "짠맛", color: "#3b82f6" },
      { key: "sour", label: "신맛", color: "#eab308" },
      { key: "bitter", label: "쓴맛", color: "#22c55e" },
      { key: "umami", label: "감칠맛", color: "#8b5cf6" },
    ];

    return (
      <View style={styles.tasteGrid}>
        {factors.map((factor) => (
          <View key={factor.key} style={styles.tasteRow}>
            <Text style={styles.tasteLabel}>{factor.label}</Text>
            <View style={styles.tasteBarBg}>
              <View style={[styles.tasteBar, { width: `${tasteFactors[factor.key]}%`, backgroundColor: factor.color }]} />
            </View>
            <Text style={styles.tastePercent}>{tasteFactors[factor.key]}%</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <View style={styles.tabContent}>
            {menuData.map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuMain}>
                  <View style={styles.menuLeft}>
                    <View style={styles.menuNameRow}>
                      <Text style={styles.menuName}>{item.name}</Text>
                      <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
                    </View>
                    <Text style={styles.menuDesc}>{item.description}</Text>
                    <View style={styles.badgeRow}>
                      {item.popular && <Text style={styles.popularBadge}>인기</Text>}
                      <Text style={styles.matchBadge}>내 입맛과 {item.matchPercentage}% 일치</Text>
                    </View>
                  </View>
                  <View style={styles.menuRight}>
                    <Image source={{ uri: item.image }} style={styles.menuImg} />
                    <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                      <Text style={styles.addBtnText}>+ 담기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* dd: 맛 프로필 */}
                <View style={styles.tasteSection}>
                  <Text style={styles.tasteTitle}>맛 프로필: {item.matchPercentage}% 일치</Text>
                  {renderTasteFactorBars(item.tasteFactors)}
                </View>
              </View>
            ))}
          </View>
        );
      case 'info':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.infoTitle}>매장 정보</Text>
            <Text style={styles.infoText}>📍 {restaurantInfo.address}</Text>
            <Text style={styles.infoText}>📞 {restaurantInfo.phone}</Text>
            <Text style={styles.infoText}>🕒 {restaurantInfo.hours}</Text>
          </View>
        );
      case 'review':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.reviewTitle}>리뷰 ({restaurantInfo.reviews})</Text>
            <Text style={styles.infoText}>리뷰 내용이 표시됩니다.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurantInfo.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* 이미지 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurantInfo.image }} style={styles.mainImage} />
        </View>

        {/* 기본 정보 */}
        <View style={styles.basicInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.restaurantName}>{restaurantInfo.name}</Text>
            <View style={styles.matchBadgeMain}>
              <Text style={styles.matchBadgeMainText}>내 입맛과 {restaurantInfo.matchPercentage}% 일치</Text>
            </View>
          </View>
          
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{restaurantInfo.rating} ({restaurantInfo.reviews}) {restaurantInfo.distance}</Text>
          </View>
          
          <View style={styles.categoryRow}>
            {restaurantInfo.category.map((cat, index) => (
              <Text key={index} style={styles.categoryTag}>{cat}</Text>
            ))}
          </View>
          
          <View style={styles.deliveryGrid}>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>최소주문금액</Text>
              <Text style={styles.deliveryValue}>{restaurantInfo.minOrder}</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>배달시간</Text>
              <Text style={styles.deliveryValue}>{restaurantInfo.deliveryTime}</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>배달팁</Text>
              <Text style={styles.deliveryValue}>{restaurantInfo.deliveryFee}</Text>
            </View>
          </View>
        </View>

        {/* 전체 맛 일치도 */}
        <View style={styles.tasteMatchBox}>
          <Text style={styles.tasteMatchTitle}>내 입맛 일치도: {restaurantInfo.matchPercentage}%</Text>
          {renderTasteFactorBars(restaurantInfo.tasteFactors)}
        </View>

        {/* 탭 */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.orderBtn} onPress={() => navigation.navigate('Cart', { restaurantId: restaurantInfo.id })}>
          <Text style={styles.orderBtnText}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backIcon: { fontSize: 20, color: '#374151' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  favoriteIcon: { fontSize: 20 },
  
  imageContainer: { height: 192 },
  mainImage: { width: '100%', height: '100%' },
  
  basicInfo: { padding: 16 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  restaurantName: { fontSize: 20, fontWeight: 'bold', color: '#111827', flex: 1 },
  matchBadgeMain: { backgroundColor: '#ede9fe', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  matchBadgeMainText: { fontSize: 14, fontWeight: '500', color: '#7c3aed' },
  
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  star: { fontSize: 16, color: '#facc15' },
  rating: { fontSize: 14, color: '#6b7280', marginLeft: 4 },
  
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  categoryTag: { backgroundColor: '#ede9fe', color: '#7c3aed', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 12, marginRight: 4, marginBottom: 4 },
  
  deliveryGrid: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 16 },
  deliveryItem: { flex: 1, alignItems: 'center' },
  deliveryLabel: { fontSize: 12, color: '#6b7280' },
  deliveryValue: { fontSize: 14, fontWeight: '500', color: '#111827', marginTop: 4 },
  
  tasteMatchBox: { margin: 16, padding: 12, backgroundColor: '#f9fafb', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  tasteMatchTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 },
  
  tasteGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tasteRow: { flexDirection: 'row', alignItems: 'center', width: '48%', marginBottom: 8 },
  tasteLabel: { fontSize: 12, color: '#6b7280', width: 48 },
  tasteBarBg: { flex: 1, height: 12, backgroundColor: '#e5e7eb', borderRadius: 6, overflow: 'hidden', marginHorizontal: 6 },
  tasteBar: { height: '100%', borderRadius: 6 },
  tastePercent: { fontSize: 12, color: '#6b7280', width: 32, textAlign: 'right' },
  
  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#8b5cf6' },
  tabText: { fontSize: 16, color: '#6b7280' },
  activeTabText: { color: '#8b5cf6', fontWeight: '600' },
  
  tabContent: { padding: 16 },
  
  menuCard: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 16 },
  menuMain: { flexDirection: 'row' },
  menuLeft: { flex: 1 },
  menuNameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  menuName: { fontSize: 16, fontWeight: '600', color: '#111827', flex: 1 },
  menuPrice: { fontSize: 16, fontWeight: '600', color: '#111827' },
  menuDesc: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  
  badgeRow: { flexDirection: 'row', alignItems: 'center' },
  popularBadge: { backgroundColor: '#fef3c7', color: '#d97706', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, fontSize: 12, fontWeight: '500', marginRight: 8 },
  matchBadge: { backgroundColor: '#ede9fe', color: '#7c3aed', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, fontSize: 12, fontWeight: '500' },
  
  menuRight: { marginLeft: 16, alignItems: 'center' },
  menuImg: { width: 80, height: 80, borderRadius: 8, marginBottom: 8 },
  addBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#8b5cf6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, width: 80 },
  addBtnText: { color: '#8b5cf6', fontSize: 14, fontWeight: '500', textAlign: 'center' },
  
  tasteSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  tasteTitle: { fontSize: 12, fontWeight: '600', color: '#111827', marginBottom: 8 },
  
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  infoText: { fontSize: 16, color: '#374151', marginBottom: 8, lineHeight: 24 },
  reviewTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', padding: 16 },
  orderBtn: { backgroundColor: '#8b5cf6', borderRadius: 8, paddingVertical: 16, alignItems: 'center' },
  orderBtnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});