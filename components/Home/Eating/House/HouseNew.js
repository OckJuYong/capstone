// dd 스타일의 집밥 카테고리 페이지
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import restaurantData from '../../../../data.json';

export default function HouseNew({ route, navigation }) {
  const { selectedCategory } = route.params;
  const allRestaurants = restaurantData.restaurants;

  const filteredRestaurants = allRestaurants.filter(
    restaurant => restaurant.category === selectedCategory.id
  );

  const navigateToDetail = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const changeCategory = () => {
    navigation.goBack(); 
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
        <Text style={styles.headerTitle}>
          {selectedCategory.emoji} {selectedCategory.name}
        </Text>
        <TouchableOpacity onPress={changeCategory} style={styles.changeButton}>
          <Text style={styles.changeButtonText}>변경</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 카테고리 정보 */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryEmoji}>{selectedCategory.emoji}</Text>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{selectedCategory.name}</Text>
              <Text style={styles.categoryCount}>
                총 {filteredRestaurants.length}개의 맛집
              </Text>
            </View>
          </View>
        </View>

        {/* 음식점 목록 */}
        <View style={styles.restaurantSection}>
          <Text style={styles.sectionTitle}>추천 맛집</Text>
          
          {filteredRestaurants.length > 0 ? (
            <View style={styles.restaurantList}>
              {filteredRestaurants.map((restaurant) => (
                <TouchableOpacity 
                  key={restaurant.id}
                  onPress={() => navigateToDetail(restaurant)}
                  style={styles.restaurantCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.restaurantContent}>
                    <View style={styles.restaurantHeader}>
                      <Text style={styles.restaurantName}>{restaurant.name}</Text>
                      <View style={styles.restaurantMeta}>
                        <Text style={styles.restaurantRating}>⭐ {restaurant.rating}</Text>
                        <Text style={styles.restaurantDistance}>• {restaurant.distance}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.restaurantDelivery}>
                      🚚 배달 시간: {restaurant.deliveryTime}
                    </Text>
                    
                    <View style={styles.specialtiesContainer}>
                      <Text style={styles.specialtiesLabel}>대표 메뉴</Text>
                      <Text style={styles.specialtiesText}>
                        {restaurant.specialties.join(', ')}
                      </Text>
                    </View>
                  </View>

                  {/* 화살표 */}
                  <Text style={styles.arrowIcon}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏪</Text>
              <Text style={styles.emptyTitle}>등록된 맛집이 없습니다</Text>
              <Text style={styles.emptyDescription}>
                다른 카테고리를 선택해보세요
              </Text>
            </View>
          )}
        </View>

        {/* 카테고리 변경 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>카테고리 안내</Text>
              <Text style={styles.infoText}>
                • 원하는 음식점을 선택해 상세 정보를 확인하세요{'\n'}
                • 다른 카테고리를 보려면 '변경' 버튼을 눌러주세요{'\n'}
                • 평점과 배달 시간을 참고해 선택하세요
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
  changeButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  categorySection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 16,
    color: '#6b7280',
  },
  restaurantSection: {
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
  restaurantList: {
    paddingHorizontal: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  restaurantContent: {
    flex: 1,
  },
  restaurantHeader: {
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantRating: {
    fontSize: 14,
    color: '#f59e0b',
  },
  restaurantDistance: {
    fontSize: 14,
    color: '#6b7280',
  },
  restaurantDelivery: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 8,
  },
  specialtiesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  specialtiesLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  specialtiesText: {
    fontSize: 14,
    color: '#111827',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9ca3af',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
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
});