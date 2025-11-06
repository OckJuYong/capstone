// dd 스타일을 적용한 완전한 홈 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { restaurantService } from '../../services';
import { getImageUrl } from '../../constants/images';

export default function HomeUpdated({ navigation }) {
  const [activeTrendingFilter, setActiveTrendingFilter] = useState('nearby');
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [trendingRestaurants, setTrendingRestaurants] = useState([]);

  // dd와 동일한 데이터
  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      console.log('🏪 식당 목록 로딩 중...');
      setLoading(true);

      // restaurantService.getRestaurants() 호출
      const data = await restaurantService.getRestaurants();

      console.log(`✅ ${data.length}개 식당 로드 완료`);

      setRestaurants(data);

      // 추천 식당 (상위 10개)
      const recommended = data.slice(0, 10).map(restaurant => ({
        ...restaurant,
        id: restaurant.restaurantId,
        name: restaurant.restaurantName,
        category: "식당",
        rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)), // 소수점 1자리
        image: getImageUrl(restaurant.image || restaurant.imageUrl, 'medium'),
        tags: ["맛있음", "추천"],
        matchPercentage: Math.floor(85 + Math.random() * 15),
      }));
      setRecommendedRestaurants(recommended);

      // 트렌딩 식당 (다음 10개)
      const trending = data.slice(10, 20).map(restaurant => ({
        ...restaurant,
        id: restaurant.restaurantId,
        name: restaurant.restaurantName,
        category: "식당",
        rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)), // 소수점 1자리
        reviews: Math.floor(50 + Math.random() * 150),
        distance: `${(Math.random() * 3 + 0.5).toFixed(1)}km`,
        deliveryTime: "20-30분",
        image: getImageUrl(restaurant.image || restaurant.imageUrl, 'small'),
      }));
      setTrendingRestaurants(trending);

    } catch (error) {
      console.error('❌ 식당 목록 로딩 실패:', error);
      Alert.alert('오류', '식당 목록을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const foodCategories = [
    { id: "korean", name: "한식", icon: "🍚" },
    { id: "chinese", name: "중식", icon: "🥢" },
    { id: "japanese", name: "일식", icon: "🍣" },
    { id: "western", name: "양식", icon: "🍝" },
    { id: "cafe", name: "카페", icon: "☕" },
    { id: "chicken", name: "치킨", icon: "🍗" },
    { id: "pizza", name: "피자", icon: "🍕" },
    { id: "fastfood", name: "패스트푸드", icon: "🍔" },
  ];

  const trendingFilters = [
    { key: 'nearby', label: '근처 맛집' },
    { key: 'popular', label: '인기 맛집' },
    { key: 'new', label: '신규 맛집' },
  ];

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>FoodApp</Text>
              <Text style={styles.headerSubtitle}>맛있는 음식을 찾아보세요</Text>
            </View>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>식당 목록을 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* dd 스타일 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>FoodApp</Text>
            <Text style={styles.headerSubtitle}>맛있는 음식을 찾아보세요</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* dd: 상단 인사말 섹션 */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>안녕하세요, 사용자님!</Text>
          <Text style={styles.greetingSubText}>오늘은 어떤 메뉴를 추천해 드릴까요?</Text>
        </View>

        {/* dd: Quick Access Buttons */}
        <View style={styles.section}>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('Random')}
            >
              <Text style={styles.quickAccessIcon}>🎲</Text>
              <Text style={styles.quickAccessText}>랜덤추천</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('TasteMemories')}
            >
              <Text style={styles.quickAccessIcon}>❤️</Text>
              <Text style={styles.quickAccessText}>맛의추억</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('House')}
            >
              <Text style={styles.quickAccessIcon}>⏰</Text>
              <Text style={styles.quickAccessText}>마감임박</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* dd: 카테고리 그리드 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <View style={styles.categoryGrid}>
            {foodCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Category', { category: category.id })}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* dd: 추천 메뉴 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 추천</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.recommendedScroll}
          >
            {recommendedRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.recommendedCard}
                onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
              >
                <View style={styles.recommendedImageContainer}>
                  <Image source={{ uri: restaurant.image }} style={styles.recommendedImage} />
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>{restaurant.matchPercentage}%</Text>
                  </View>
                </View>
                <View style={styles.recommendedInfo}>
                  <Text style={styles.recommendedName}>{restaurant.name}</Text>
                  <Text style={styles.recommendedCategory}>{restaurant.category}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.rating}>{restaurant.rating}</Text>
                  </View>
                  <View style={styles.tagsContainer}>
                    {restaurant.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* dd: 트렌딩 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>트렌딩</Text>
          
          {/* 필터 탭 */}
          <View style={styles.filterTabs}>
            {trendingFilters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  activeTrendingFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setActiveTrendingFilter(filter.key)}
              >
                <Text style={[
                  styles.filterTabText,
                  activeTrendingFilter === filter.key && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 트렌딩 리스트 */}
          <View style={styles.trendingList}>
            {trendingRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.trendingItem}
                onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
              >
                <Image source={{ uri: restaurant.image }} style={styles.trendingImage} />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingName}>{restaurant.name}</Text>
                  <Text style={styles.trendingCategory}>{restaurant.category}</Text>
                  <View style={styles.trendingMeta}>
                    <Text style={styles.trendingRating}>★ {restaurant.rating}</Text>
                    <Text style={styles.trendingDot}>•</Text>
                    <Text style={styles.trendingDetails}>리뷰 {restaurant.reviews}</Text>
                    <Text style={styles.trendingDot}>•</Text>
                    <Text style={styles.trendingDetails}>{restaurant.distance}</Text>
                  </View>
                  <Text style={styles.trendingTime}>{restaurant.deliveryTime}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  headerRight: {
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#f8f9ff',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  greetingSubText: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 20,
    marginHorizontal: 4,
  },
  quickAccessIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  recommendedScroll: {
    marginHorizontal: -4,
  },
  recommendedCard: {
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  recommendedImageContainer: {
    position: 'relative',
    height: 120,
  },
  recommendedImage: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  recommendedInfo: {
    padding: 12,
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recommendedCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    fontSize: 16,
    color: '#facc15',
  },
  rating: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#6b7280',
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterTabTextActive: {
    color: '#ffffff',
  },
  trendingList: {
    gap: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
  },
  trendingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trendingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  trendingCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trendingRating: {
    fontSize: 14,
    color: '#374151',
  },
  trendingDot: {
    fontSize: 14,
    color: '#d1d5db',
    marginHorizontal: 6,
  },
  trendingDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendingTime: {
    fontSize: 12,
    color: '#6b7280',
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