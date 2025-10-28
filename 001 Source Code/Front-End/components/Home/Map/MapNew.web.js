// Web version of Map page - with Google Maps
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
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

// Google Maps API 키 및 Map ID
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyCvw-FMFR4P9ReDAaySzos37C6tX0m9aKs';
const GOOGLE_MAPS_ID = process.env.EXPO_PUBLIC_GOOGLE_MAPS_ID || '8c67346ed10f87eed4dda60d';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// 대전 대흥동/궁동 중심 좌표
const center = {
  lat: 36.3275,
  lng: 127.4229,
};

const mapOptions = {
  mapId: GOOGLE_MAPS_ID,
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export default function MapNew({ navigation }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetailModal(true);

    // 지도 중심을 선택한 음식점으로 이동
    if (map && restaurant.lat && restaurant.lng) {
      map.panTo({
        lat: restaurant.lat,
        lng: restaurant.lng,
      });
    }
  };

  const handleNavigateToDetail = () => {
    setShowDetailModal(false);
    navigation.navigate('RestaurantDetail', { restaurant: selectedRestaurant });
  };

  const handleMyLocationPress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (map) {
            map.panTo({ lat, lng });
            map.setZoom(15);
          }
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          alert('위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.');
        }
      );
    } else {
      alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
    }
  };

  const getMarkerIcon = (category) => {
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

    const color = colors[category] || '#8b5cf6';

    // Google Maps 마커 아이콘 URL 생성
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
        <path fill="${color}" d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 24 16 24s16-15.2 16-24C32 7.2 24.8 0 16 0z"/>
        <circle fill="white" cx="16" cy="16" r="6"/>
      </svg>
    `)}`;
  };

  if (loadError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️</Text>
          <Text style={styles.errorText}>Google Maps를 로드할 수 없습니다</Text>
          <Text style={styles.errorSubtext}>
            네트워크 연결과 API 키를 확인해주세요
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
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
        <Text style={styles.headerTitle}>지도</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleMyLocationPress}
        >
          <Text style={styles.refreshIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Google Maps 컨테이너 */}
      <View style={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* 음식점 마커들 */}
          {restaurantData.restaurants.map((restaurant) => {
            if (!restaurant.lat || !restaurant.lng) return null;

            return (
              <Marker
                key={restaurant.id}
                position={{
                  lat: restaurant.lat,
                  lng: restaurant.lng,
                }}
                title={restaurant.name}
                onClick={() => handleMarkerClick(restaurant)}
                onMouseOver={() => setHoveredRestaurant(restaurant)}
                onMouseOut={() => setHoveredRestaurant(null)}
                icon={{
                  url: getMarkerIcon(restaurant.cuisine),
                  scaledSize: { width: 32, height: 40 },
                }}
              >
                {hoveredRestaurant?.id === restaurant.id && (
                  <InfoWindow onCloseClick={() => setHoveredRestaurant(null)}>
                    <div style={{ padding: '8px', minWidth: '150px' }}>
                      <strong style={{ fontSize: '14px' }}>{restaurant.name}</strong>
                      <br />
                      <span style={{ fontSize: '12px' }}>
                        ⭐ {restaurant.rating}
                      </span>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </View>

      {/* 하단 음식점 리스트 */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>주변 음식점</Text>
          <Text style={styles.bottomSheetCount}>
            {restaurantData.restaurants.length}개
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantList}
        >
          {restaurantData.restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => handleMarkerClick(restaurant)}
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

      {/* 음식점 상세 모달 */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedRestaurant && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                  <TouchableOpacity
                    onPress={() => setShowDetailModal(false)}
                    style={styles.modalCloseButton}
                  >
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>카테고리</Text>
                    <Text style={styles.modalValue}>
                      {selectedRestaurant.cuisine}
                    </Text>
                  </View>

                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>평점</Text>
                    <Text style={styles.modalValue}>
                      ⭐ {selectedRestaurant.rating}
                    </Text>
                  </View>

                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>배달시간</Text>
                    <Text style={styles.modalValue}>{selectedRestaurant.deliveryTime}</Text>
                  </View>

                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>배달비</Text>
                    <Text style={styles.modalValue}>
                      {selectedRestaurant.deliveryFee}
                    </Text>
                  </View>

                  <View style={styles.specialtiesSection}>
                    <Text style={styles.modalLabel}>태그</Text>
                    <View style={styles.specialtiesList}>
                      {selectedRestaurant.tags?.map((specialty, index) => (
                        <View key={index} style={styles.specialtyTag}>
                          <Text style={styles.specialtyText}>{specialty}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={handleNavigateToDetail}
                >
                  <Text style={styles.detailButtonText}>상세 정보 보기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  refreshButton: {
    padding: 8,
  },
  refreshIcon: {
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  errorTitle: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  bottomSheet: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 24,
    color: '#6b7280',
  },
  modalBody: {
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  modalValue: {
    fontSize: 14,
    color: '#111827',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  addressText: {
    fontSize: 12,
  },
  specialtiesSection: {
    paddingTop: 16,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  specialtyTag: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
