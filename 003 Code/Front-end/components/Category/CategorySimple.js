// 간단한 dd 스타일 카테고리 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { getCategoryImageUrl } from '../../constants/images';

export default function CategorySimple({ route, navigation }) {
  const { category } = route.params || { category: 'korean' };
  const [activeCategory, setActiveCategory] = useState(category);
  const [sortBy, setSortBy] = useState('popular');

  // 카테고리 목록 (dd와 동일)
  const categories = [
    { id: "korean", name: "한식", icon: "🍚" },
    { id: "chinese", name: "중식", icon: "🥢" },
    { id: "japanese", name: "일식", icon: "🍣" },
    { id: "western", name: "양식", icon: "🍝" },
    { id: "cafe", name: "카페", icon: "☕" },
    { id: "chicken", name: "치킨", icon: "🍗" },
    { id: "pizza", name: "피자", icon: "🍕" },
    { id: "fastfood", name: "패스트푸드", icon: "🍔" },
  ];

  // 카테고리별 음식점 데이터
  const getRestaurantsByCategory = (categoryId) => {
    const restaurantData = {
      korean: [
        { id: 1, name: "메종 운두부찌개", category: "한식", rating: 4.8, reviews: 109, distance: "1.8km", deliveryFee: "3,000원", deliveryTime: "25-35분", image: getCategoryImageUrl(null, 'korean'), matchPercentage: 95 },
        { id: 2, name: "할머니 김치찌개", category: "한식", rating: 4.6, reviews: 87, distance: "2.0km", deliveryFee: "2,000원", deliveryTime: "30-40분", image: getCategoryImageUrl(null, 'korean'), matchPercentage: 89 },
      ],
      chinese: [
        { id: 3, name: "만리장성", category: "중식", rating: 4.7, reviews: 156, distance: "1.5km", deliveryFee: "2,500원", deliveryTime: "20-30분", image: getCategoryImageUrl(null, 'chinese'), matchPercentage: 92 },
        { id: 4, name: "황금성", category: "중식", rating: 4.5, reviews: 203, distance: "2.2km", deliveryFee: "3,000원", deliveryTime: "25-35분", image: getCategoryImageUrl(null, 'chinese'), matchPercentage: 88 },
      ],
      japanese: [
        { id: 5, name: "스시로", category: "일식", rating: 4.9, reviews: 89, distance: "1.2km", deliveryFee: "2,000원", deliveryTime: "15-25분", image: getCategoryImageUrl(null, 'japanese'), matchPercentage: 96 },
        { id: 6, name: "라멘집", category: "일식", rating: 4.4, reviews: 134, distance: "1.8km", deliveryFee: "2,500원", deliveryTime: "20-30분", image: getCategoryImageUrl(null, 'japanese'), matchPercentage: 85 },
      ],
      western: [
        { id: 7, name: "메종 크림 파스타", category: "양식", rating: 4.8, reviews: 109, distance: "1.8km", deliveryFee: "3,000원", deliveryTime: "25-35분", image: getCategoryImageUrl(null, 'western'), matchPercentage: 95 },
        { id: 8, name: "스테이크 하우스", category: "양식", rating: 4.6, reviews: 76, distance: "2.5km", deliveryFee: "3,500원", deliveryTime: "30-40분", image: getCategoryImageUrl(null, 'western'), matchPercentage: 90 },
      ],
      chicken: [
        { id: 9, name: "치킨마루", category: "치킨", rating: 4.7, reviews: 234, distance: "1.3km", deliveryFee: "2,000원", deliveryTime: "20-30분", image: getCategoryImageUrl(null, 'chicken'), matchPercentage: 93 },
        { id: 10, name: "굽네치킨", category: "치킨", rating: 4.5, reviews: 189, distance: "1.9km", deliveryFee: "2,500원", deliveryTime: "25-35분", image: getCategoryImageUrl(null, 'chicken'), matchPercentage: 87 },
      ],
      pizza: [
        { id: 11, name: "피자나라", category: "피자", rating: 4.5, reviews: 87, distance: "2.0km", deliveryFee: "2,000원", deliveryTime: "30-40분", image: getCategoryImageUrl(null, 'pizza'), matchPercentage: 89 },
        { id: 12, name: "도미노피자", category: "피자", rating: 4.3, reviews: 156, distance: "1.7km", deliveryFee: "3,000원", deliveryTime: "25-35분", image: getCategoryImageUrl(null, 'pizza'), matchPercentage: 84 },
      ],
      cafe: [
        { id: 13, name: "스타벅스", category: "카페", rating: 4.6, reviews: 324, distance: "0.8km", deliveryFee: "1,500원", deliveryTime: "10-20분", image: getCategoryImageUrl(null, 'cafe'), matchPercentage: 91 },
        { id: 14, name: "투썸플레이스", category: "카페", rating: 4.4, reviews: 267, distance: "1.1km", deliveryFee: "2,000원", deliveryTime: "15-25분", image: getCategoryImageUrl(null, 'cafe'), matchPercentage: 86 },
      ],
      fastfood: [
        { id: 15, name: "맥도날드", category: "패스트푸드", rating: 4.2, reviews: 456, distance: "1.4km", deliveryFee: "2,000원", deliveryTime: "15-25분", image: getCategoryImageUrl(null, 'fastfood'), matchPercentage: 82 },
        { id: 16, name: "버거킹", category: "패스트푸드", rating: 4.1, reviews: 298, distance: "1.6km", deliveryFee: "2,500원", deliveryTime: "20-30분", image: getCategoryImageUrl(null, 'fastfood'), matchPercentage: 80 },
      ],
    };
    return restaurantData[categoryId] || [];
  };

  const restaurants = getRestaurantsByCategory(activeCategory);

  const sortOptions = [
    { key: 'popular', label: '인기순' },
    { key: 'distance', label: '거리순' },
    { key: 'delivery', label: '배달팁낮은순' },
    { key: 'reviews', label: '리뷰많은순' },
  ];

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
        <Text style={styles.title}>카테고리</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* dd: 카테고리 탭 네비게이션 */}
      <View style={styles.categoryTabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabsScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryTab,
                activeCategory === cat.id && styles.categoryTabActive
              ]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={styles.categoryTabIcon}>{cat.icon}</Text>
              <Text style={[
                styles.categoryTabText,
                activeCategory === cat.id && styles.categoryTabTextActive
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* 정렬 옵션 */}
      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortButton,
                sortBy === option.key && styles.sortButtonActive
              ]}
              onPress={() => setSortBy(option.key)}
            >
              <Text style={[
                styles.sortText,
                sortBy === option.key && styles.sortTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* 음식점 목록 */}
      <ScrollView style={styles.content}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: restaurant.image }} style={styles.image} />
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{restaurant.matchPercentage}%</Text>
              </View>
            </View>
            
            <View style={styles.infoContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>{restaurant.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.category}>{restaurant.category}</Text>
              
              <Text style={styles.details}>
                리뷰 {restaurant.reviews} • {restaurant.distance} • {restaurant.deliveryTime}
              </Text>
              
              <Text style={styles.deliveryFee}>
                배달팁 {restaurant.deliveryFee}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function getCategoryName(category) {
  const categoryNames = {
    korean: '한식',
    chinese: '중식',
    japanese: '일식',
    western: '양식',
    cafe: '카페',
    chicken: '치킨',
    pizza: '피자',
    fastfood: '패스트푸드',
  };
  return categoryNames[category] || '음식점';
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
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  placeholder: {
    width: 36,
  },
  categoryTabsContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  categoryTabsScroll: {
    paddingHorizontal: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  categoryTabActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  categoryTabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#ffffff',
  },
  sortContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  sortButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  sortText: {
    fontSize: 14,
    color: '#6b7280',
  },
  sortTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  image: {
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
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  category: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  details: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  deliveryFee: {
    fontSize: 12,
    color: '#6b7280',
  },
});