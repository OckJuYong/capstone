// dd 스타일의 음식점 상세 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { restaurantService, dibsService, reviewService } from '../../services';
import { getImageUrl, DEFAULT_MENU_IMAGE } from '../../constants/images';

export default function RestaurantDetailNew({ route, navigation }) {
  const { restaurant } = route.params || {};
  const restaurantId = restaurant?.id || restaurant?.restaurantId || 1;

  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    loadRestaurantData();
  }, [restaurantId]);

  const loadRestaurantData = async () => {
    try {
      console.log(`🏪 식당 상세 정보 로딩 중... (ID: ${restaurantId})`);
      setLoading(true);

      // 병렬로 데이터 가져오기
      const [detailData, menusData, reviewsData] = await Promise.all([
        restaurantService.getRestaurantDetail(restaurantId),
        restaurantService.getRestaurantMenus(restaurantId),
        restaurantService.getRestaurantReviews(restaurantId),
      ]);

      console.log('✅ 식당 상세 정보 로드 완료');
      console.log(`✅ ${menusData.length}개 메뉴 로드 완료`);
      console.log(`✅ ${reviewsData.length}개 리뷰 로드 완료`);

      // 식당 정보 설정
      setRestaurantInfo({
        ...detailData,
        id: detailData.restaurantId,
        name: detailData.restaurantName,
        category: "식당",
        rating: 4.5 + Math.random() * 0.5,
        reviews: reviewsData.length,
        distance: `${(Math.random() * 3 + 0.5).toFixed(1)}km`,
        deliveryFee: "3,000원",
        minOrder: "15,000원",
        deliveryTime: "25-35분",
        image: getImageUrl(detailData.image || detailData.imageUrl, 'large'),
        matchPercentage: Math.floor(85 + Math.random() * 15),
        description: `${detailData.restaurantName} 맛집입니다.`,
        hours: "11:00 - 22:00",
        phone: "02-1234-5678",
        address: detailData.restaurantAddress || "주소 정보 없음",
        tasteFactors: {
          spicy: Math.floor(Math.random() * 100),
          sweet: Math.floor(Math.random() * 100),
          salty: Math.floor(Math.random() * 100),
          sour: Math.floor(Math.random() * 100),
          bitter: Math.floor(Math.random() * 100),
          umami: Math.floor(Math.random() * 100),
        },
      });

      // 메뉴 정보 설정
      setMenuData(menusData.map((menu, index) => ({
        ...menu,
        id: menu.menuId,
        name: menu.menuName,
        description: menu.menuDescription || "맛있는 메뉴입니다",
        price: menu.menuPrice || 15000,
        image: menu.image || menu.imageUrl || DEFAULT_MENU_IMAGE,
        popular: index < 2, // 처음 2개를 인기 메뉴로
        matchPercentage: Math.floor(80 + Math.random() * 20),
        tasteFactors: {
          spicy: Math.floor(Math.random() * 100),
          sweet: Math.floor(Math.random() * 100),
          salty: Math.floor(Math.random() * 100),
          sour: Math.floor(Math.random() * 100),
          bitter: Math.floor(Math.random() * 100),
          umami: Math.floor(Math.random() * 100),
        },
      })));

      // 리뷰 정보 설정
      setReviewData(reviewsData.map(review => ({
        ...review,
        id: review.reviewId,
        user: "사용자",
        rating: 4 + Math.random(),
        comment: review.reviewContent || "맛있어요!",
        date: new Date(review.reviewCreatedAt || Date.now()).toLocaleDateString('ko-KR'),
      })));

    } catch (error) {
      console.error('❌ 식당 상세 정보 로딩 실패:', error);
      Alert.alert('오류', '식당 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'menu', label: '메뉴' },
    { key: 'info', label: '정보' },
    { key: 'review', label: '리뷰' },
  ];

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await dibsService.removeDibs(restaurantId);
        setIsFavorite(false);
        Alert.alert("찜 해제", "찜 목록에서 제거되었습니다.");
      } else {
        await dibsService.addDibs(restaurantId);
        setIsFavorite(true);
        Alert.alert("찜 추가", "찜 목록에 추가되었습니다.");
      }
    } catch (error) {
      console.error('❌ 찜 처리 실패:', error);
      Alert.alert('오류', '찜 처리에 실패했습니다.');
    }
  };

  const addToCart = (menuItem) => {
    Alert.alert(
      "장바구니 추가",
      `${menuItem.name}을(를) 장바구니에 추가하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        { 
          text: "추가", 
          onPress: () => {
            Alert.alert("완료", "장바구니에 추가되었습니다!");
          }
        }
      ]
    );
  };

  const goToCart = () => {
    navigation.navigate('Cart', { restaurantId: restaurantInfo.id });
  };

  // dd 스타일 맛 평가 바 렌더링 함수
  const renderTasteFactorBars = (tasteFactors = {}) => {
    const factors = [
      { key: "spicy", label: "매운맛", color: "#ef4444" },    // red-500
      { key: "sweet", label: "단맛", color: "#ec4899" },     // pink-500  
      { key: "salty", label: "짠맛", color: "#3b82f6" },    // blue-500
      { key: "sour", label: "신맛", color: "#eab308" },     // yellow-500
      { key: "bitter", label: "쓴맛", color: "#22c55e" },   // green-500
      { key: "umami", label: "감칠맛", color: "#8b5cf6" },   // purple-500
    ];

    return (
      <View style={styles.tasteFactorsGrid}>
        {factors.map((factor) => {
          const value = tasteFactors[factor.key] || 0;
          return (
            <View key={factor.key} style={styles.tasteFactorRow}>
              <Text style={styles.tasteLabel}>{factor.label}</Text>
              <View style={styles.tasteBarContainer}>
                <View 
                  style={[
                    styles.tasteBar,
                    { 
                      width: `${value}%`,
                      backgroundColor: factor.color 
                    }
                  ]}
                />
              </View>
              <Text style={styles.tastePercentage}>{value}%</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>★</Text>);
    }
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>☆</Text>);
    }
    return stars;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>인기 메뉴</Text>
            {menuData.filter(item => item.popular).map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <View style={styles.menuInfo}>
                  <View style={styles.menuHeader}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <View style={styles.menuBadges}>
                      {item.popular && <Text style={styles.popularBadge}>인기</Text>}
                      <Text style={styles.matchBadgeSmall}>내 입맛과 {item.matchPercentage}% 일치</Text>
                    </View>
                  </View>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                  <View style={styles.menuFooter}>
                    <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addButtonText}>담기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>전체 메뉴</Text>
            {menuData.map((item) => (
              <View key={item.id} style={styles.menuItemWrapper}>
                <View style={styles.menuItem}>
                  <Image source={{ uri: item.image }} style={styles.menuImage} />
                  <View style={styles.menuInfo}>
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuName}>{item.name}</Text>
                      <View style={styles.menuBadges}>
                        {item.popular && <Text style={styles.popularBadge}>인기</Text>}
                        <Text style={styles.matchBadgeSmall}>내 입맛과 {item.matchPercentage}% 일치</Text>
                      </View>
                    </View>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                    <View style={styles.menuFooter}>
                      <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.addButtonText}>담기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* dd: 메뉴별 맛 프로필 */}
                <View style={styles.menuTasteProfile}>
                  <Text style={styles.menuTasteTitle}>맛 프로필: {item.matchPercentage}% 일치</Text>
                  {renderTasteFactorBars(item.tasteFactors)}
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'info':
        return (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>매장 정보</Text>
              <Text style={styles.infoText}>📍 {restaurantInfo.address}</Text>
              <Text style={styles.infoText}>📞 {restaurantInfo.phone}</Text>
              <Text style={styles.infoText}>🕒 {restaurantInfo.hours}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>배달 정보</Text>
              <Text style={styles.infoText}>최소주문금액: {restaurantInfo.minOrder}</Text>
              <Text style={styles.infoText}>배달팁: {restaurantInfo.deliveryFee}</Text>
              <Text style={styles.infoText}>배달시간: {restaurantInfo.deliveryTime}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>매장 소개</Text>
              <Text style={styles.infoDescription}>{restaurantInfo.description}</Text>
            </View>
          </View>
        );
      
      case 'review':
        return (
          <View style={styles.tabContent}>
            <View style={styles.reviewSummary}>
              <Text style={styles.reviewTitle}>리뷰 ({restaurantInfo.reviews})</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(restaurantInfo.rating)}
                </View>
                <Text style={styles.ratingNumber}>{restaurantInfo.rating}</Text>
              </View>
            </View>
            
            {reviewData.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  // 로딩 중일 때
  if (loading || !restaurantInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>로딩 중...</Text>
          <View style={styles.favoriteButton} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>식당 정보를 불러오는 중...</Text>
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
        <Text style={styles.headerTitle}>{restaurantInfo.name}</Text>
        <TouchableOpacity 
          onPress={toggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 음식점 이미지 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurantInfo.image }} style={styles.restaurantImage} />
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{restaurantInfo.matchPercentage}%</Text>
          </View>
        </View>

        {/* 음식점 기본 정보 */}
        <View style={styles.basicInfo}>
          <View style={styles.nameAndMatchRow}>
            <Text style={styles.restaurantName}>{restaurantInfo.name}</Text>
            <View style={styles.matchPercentageBadge}>
              <Text style={styles.matchPercentageText}>내 입맛과 {restaurantInfo.matchPercentage}% 일치</Text>
            </View>
          </View>
          
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>{restaurantInfo.rating}</Text>
            </View>
            <Text style={styles.reviews}>리뷰 {restaurantInfo.reviews}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.distance}>{restaurantInfo.distance}</Text>
          </View>
          
          <View style={styles.categoryTags}>
            <Text style={styles.categoryTag}>{restaurantInfo.category}</Text>
          </View>
          
          <View style={styles.deliveryInfoGrid}>
            <View style={styles.deliveryInfoItem}>
              <Text style={styles.deliveryInfoLabel}>최소주문금액</Text>
              <Text style={styles.deliveryInfoValue}>{restaurantInfo.minOrder}</Text>
            </View>
            <View style={styles.deliveryInfoItem}>
              <Text style={styles.deliveryInfoLabel}>배달시간</Text>
              <Text style={styles.deliveryInfoValue}>{restaurantInfo.deliveryTime}</Text>
            </View>
            <View style={styles.deliveryInfoItem}>
              <Text style={styles.deliveryInfoLabel}>배달팁</Text>
              <Text style={styles.deliveryInfoValue}>{restaurantInfo.deliveryFee}</Text>
            </View>
          </View>
        </View>

        {/* dd: 입맛 일치도 섹션 */}
        <View style={styles.tasteMatchSection}>
          <Text style={styles.tasteMatchTitle}>내 입맛 일치도: {restaurantInfo.matchPercentage}%</Text>
          {renderTasteFactorBars(restaurantInfo.tasteFactors)}
        </View>

        {/* 탭 네비게이션 */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        {renderTabContent()}

        {/* 하단 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 하단 주문 버튼 */}
      <View style={styles.orderContainer}>
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={goToCart}
        >
          <Text style={styles.orderButtonText}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  basicInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  restaurantCategory: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  star: {
    fontSize: 16,
    color: '#facc15',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#6b7280',
  },
  dot: {
    fontSize: 14,
    color: '#d1d5db',
    marginHorizontal: 8,
  },
  distance: {
    fontSize: 14,
    color: '#6b7280',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#6b7280',
  },
  tasteMatchSection: {
    margin: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tasteMatchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  tasteFactorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tasteFactorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  tasteLabel: {
    fontSize: 12,
    color: '#6b7280',
    width: 48,
    textAlign: 'left',
  },
  tasteBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  tasteBar: {
    height: '100%',
    borderRadius: 6,
  },
  tastePercentage: {
    fontSize: 12,
    color: '#6b7280',
    width: 32,
    textAlign: 'right',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#8b5cf6',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    marginTop: 8,
  },
  menuItemWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  menuInfo: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  menuBadges: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  matchBadgeSmall: {
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  popularBadge: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  menuDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  menuTasteProfile: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    width: '100%',
  },
  menuTasteTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 24,
  },
  infoDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  reviewSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  reviewItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 80,
  },
  orderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
  },
  orderButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 18,
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