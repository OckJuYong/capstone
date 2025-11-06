// React Native 지도 페이지 - 네이버 지도 스타일
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Alert, ActivityIndicator, TextInput, Platform, Animated } from 'react-native';
import { mockRestaurants } from '../../../data/mockRecommendationData';

// mockRestaurants에서 고유한 cuisine 목록 추출하여 categories 생성
const uniqueCuisines = [...new Set(mockRestaurants.map(r => r.cuisine))];
const mockCategories = uniqueCuisines.map((cuisine, index) => ({
  id: cuisine,
  name: cuisine,
  emoji: '🍽️'
}));

const restaurantData = {
  restaurants: mockRestaurants,
  categories: mockCategories
};

// Web에서는 react-native-maps를 사용하지 않음
let MapView, Marker, PROVIDER_GOOGLE, Location;
if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
  PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;
  Location = require('expo-location');
}

export default function MapNew({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [region, setRegion] = useState({
    // 대전 대흥동/궁동 중심 좌표
    latitude: 36.3275,
    longitude: 127.4229,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  // 하단 시트 애니메이션
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    // Web에서는 위치 기능 사용 안 함
    if (Platform.OS === 'web') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          '위치 권한 필요',
          '지도 기능을 사용하려면 위치 권한이 필요합니다.',
          [{ text: '확인' }]
        );
        setLoading(false);
        return;
      }

      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(userCoords);

      // 지도 영역을 사용자 위치로 업데이트
      setRegion({
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });

      setLoading(false);
    } catch (error) {
      console.error('위치 가져오기 오류:', error);
      Alert.alert(
        '위치 오류',
        '현재 위치를 가져올 수 없습니다. 기본 위치(대전 대흥동)로 표시됩니다.',
        [{ text: '확인' }]
      );
      setLoading(false);
    }
  };

  const handleMarkerPress = (restaurant) => {
    setSelectedRestaurant(restaurant);

    // 하단 시트 올리기 애니메이션
    Animated.spring(bottomSheetAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();

    // 마커 위치로 지도 이동
    if (mapRef.current && restaurant.lat && restaurant.lng) {
      mapRef.current.animateToRegion({
        latitude: restaurant.lat,
        longitude: restaurant.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  const closeBottomSheet = () => {
    Animated.spring(bottomSheetAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start(() => {
      setSelectedRestaurant(null);
    });
  };

  const handleNavigateToDetail = () => {
    closeBottomSheet();
    setTimeout(() => {
      navigation.navigate('RestaurantDetail', { restaurant: selectedRestaurant });
    }, 300);
  };

  const handleMyLocationPress = () => {
    if (userLocation) {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }, 500);
      }
    } else {
      getUserLocation();
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === '') return;

    // 검색어로 음식점 찾기
    const found = filteredRestaurants.find(r =>
      r.name.toLowerCase().includes(searchText.toLowerCase()) ||
      r.tags?.some(s => s.toLowerCase().includes(searchText.toLowerCase()))
    );

    if (found && found.lat && found.lng) {
      handleMarkerPress(found);
    } else {
      Alert.alert('검색 결과 없음', '해당하는 음식점을 찾을 수 없습니다.');
    }
  };

  const handleCategoryPress = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const getMarkerColor = (category) => {
    const colors = {
      korean: '#ff6b6b',
      chinese: '#ffa726',
      japanese: '#26a69a',
      western: '#5c6bc0',
      chicken: '#ff7043',
      snack: '#ab47bc',
      cafe: '#8d6e63',
      fast: '#ef5350',
    };
    return colors[category] || '#8b5cf6';
  };

  // 필터링된 음식점 목록
  const filteredRestaurants = selectedCategory
    ? restaurantData.restaurants.filter(r => r.cuisine === selectedCategory)
    : restaurantData.restaurants;

  // 하단 시트 높이 애니메이션
  const bottomSheetHeight = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 280],
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>위치 정보를 가져오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 밝은 색상의 맵 스타일 (네이버/카카오맵 스타일)
  const customMapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9e6ff" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#ffd966" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#d4f1d4" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 지도 */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          // Web 플랫폼용 대체 UI
          <View style={styles.webMapPlaceholder}>
            <Text style={styles.webMapTitle}>🗺️</Text>
            <Text style={styles.webMapText}>지도는 모바일 앱에서만 사용 가능합니다</Text>
            <Text style={styles.webMapSubtext}>아래 음식점 목록을 확인해주세요</Text>
          </View>
        ) : (
          <>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              onRegionChangeComplete={setRegion}
              showsUserLocation={true}
              showsMyLocationButton={false}
              onPress={closeBottomSheet}
              customMapStyle={customMapStyle}
            >
              {/* 사용자 위치 마커 */}
              {userLocation && (
                <Marker
                  coordinate={userLocation}
                  title="내 위치"
                  description="현재 위치입니다"
                  pinColor="blue"
                />
              )}

              {/* 음식점 마커들 (필터링됨) */}
              {filteredRestaurants.map((restaurant) => {
                if (!restaurant.lat || !restaurant.lng) return null;

                return (
                  <Marker
                    key={restaurant.id}
                    coordinate={{
                      latitude: restaurant.lat,
                      longitude: restaurant.lng,
                    }}
                    title={restaurant.name}
                    description={restaurant.cuisine}
                    onPress={() => handleMarkerPress(restaurant)}
                    pinColor={getMarkerColor(restaurant.cuisine)}
                  />
                );
              })}
            </MapView>

            {/* 상단 검색창 */}
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="음식점, 메뉴 검색"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <Text style={styles.searchIcon}>🔍</Text>
              </TouchableOpacity>
            </View>

            {/* 카테고리 필터 버튼 */}
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.filterToggle}
                onPress={() => setShowCategoryFilter(!showCategoryFilter)}
              >
                <Text style={styles.filterToggleIcon}>☰</Text>
                <Text style={styles.filterToggleText}>필터</Text>
              </TouchableOpacity>

              {showCategoryFilter && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryList}
                  contentContainerStyle={styles.categoryListContent}
                >
                  {restaurantData.categories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryChip,
                          isSelected && styles.categoryChipActive
                        ]}
                        onPress={() => handleCategoryPress(category.id)}
                      >
                        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                        <Text style={[
                          styles.categoryName,
                          isSelected && styles.categoryNameActive
                        ]}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>

            {/* 현재 위치로 이동 버튼 (개선됨) */}
            <TouchableOpacity
              style={styles.myLocationButton}
              onPress={handleMyLocationPress}
            >
              <View style={styles.myLocationButtonInner}>
                <Text style={styles.myLocationIcon}>📍</Text>
              </View>
            </TouchableOpacity>

            {/* 줌 레벨 표시 */}
            <View style={styles.zoomInfo}>
              <Text style={styles.zoomText}>
                {filteredRestaurants.length}개 음식점
              </Text>
            </View>
          </>
        )}
      </View>

      {/* 하단 시트 - 미리보기 카드 */}
      {selectedRestaurant ? (
        <Animated.View style={[styles.bottomSheetPreview, { height: bottomSheetHeight }]}>
          <View style={styles.bottomSheetHandle}>
            <View style={styles.handle} />
          </View>

          <ScrollView style={styles.previewContent}>
            <View style={styles.previewHeader}>
              <View style={styles.previewTitleRow}>
                <Text style={styles.previewTitle}>{selectedRestaurant.name}</Text>
                <TouchableOpacity
                  onPress={closeBottomSheet}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.previewCategory}>
                🍽️ {selectedRestaurant.cuisine}
              </Text>
            </View>

            <View style={styles.previewStats}>
              <View style={styles.previewStat}>
                <Text style={styles.previewStatLabel}>평점</Text>
                <Text style={styles.previewStatValue}>⭐ {selectedRestaurant.rating}</Text>
              </View>
              <View style={styles.previewDivider} />
              <View style={styles.previewStat}>
                <Text style={styles.previewStatLabel}>배달</Text>
                <Text style={styles.previewStatValue}>{selectedRestaurant.deliveryTime}</Text>
              </View>
            </View>

            <View style={styles.previewInfo}>
              <Text style={styles.previewInfoLabel}>태그</Text>
              <Text style={styles.previewInfoText}>
                {selectedRestaurant.tags?.join(', ')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={handleNavigateToDetail}
            >
              <Text style={styles.detailButtonText}>상세 정보 보기</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      ) : (
        /* 기본 하단 시트 */
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>주변 음식점</Text>
            <Text style={styles.bottomSheetCount}>
              {filteredRestaurants.length}개
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          >
            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => handleMarkerPress(restaurant)}
              >
                <View style={styles.restaurantCardHeader}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <View style={styles.restaurantRating}>
                    <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
                  </View>
                </View>

                <Text style={styles.restaurantCategory}>
                  {restaurant.cuisine}
                </Text>

                <View style={styles.restaurantFooter}>
                  <Text style={styles.restaurantInfo}>
                    {restaurant.deliveryTime}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  webMapTitle: {
    fontSize: 48,
    marginBottom: 16,
  },
  webMapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  webMapSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  // 검색창
  searchBar: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#111827',
  },
  searchButton: {
    padding: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 20,
  },
  // 필터 컨테이너
  filterContainer: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterToggleIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryList: {
    marginTop: 8,
  },
  categoryListContent: {
    paddingRight: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  categoryNameActive: {
    color: '#ffffff',
  },
  // 현재 위치 버튼
  myLocationButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#ffffff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  myLocationButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myLocationIcon: {
    fontSize: 24,
  },
  // 줌 정보
  zoomInfo: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  zoomText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  // 하단 시트 미리보기
  bottomSheetPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  bottomSheetHandle: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
  },
  previewContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  previewHeader: {
    marginBottom: 16,
  },
  previewTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  previewTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#9ca3af',
  },
  previewCategory: {
    fontSize: 15,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  previewStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  previewStat: {
    flex: 1,
    alignItems: 'center',
  },
  previewStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  previewStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  previewDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  previewInfo: {
    marginBottom: 12,
  },
  previewInfoLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  previewInfoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  detailButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  // 기본 하단 시트
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 180,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  bottomSheetCount: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  restaurantList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  restaurantCard: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginRight: 12,
  },
  restaurantCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  restaurantName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  restaurantRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#f59e0b',
  },
  restaurantCategory: {
    fontSize: 13,
    color: '#8b5cf6',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 8,
  },
  restaurantFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantInfo: {
    fontSize: 11,
    color: '#9ca3af',
  },
});
