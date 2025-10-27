// 간단한 dd 스타일 찜한 가게 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { dibsService } from '../../../../services';

export default function FavoriteSimple({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      console.log('❤️ 찜 목록 로딩 중...');
      setLoading(true);

      // dibsService.getMyDibs() 호출
      const dibsData = await dibsService.getMyDibs();

      console.log(`✅ ${dibsData.length}개 찜 로드 완료`);

      // 백엔드 응답을 프론트엔드 형식으로 변환
      const formattedFavorites = dibsData.map(dibs => ({
        id: dibs.restaurantId,
        name: dibs.restaurantName,
        category: "식당",
        rating: dibs.rating || 4.5,
        reviews: 0,
        distance: "1.8km",
        deliveryFee: "3,000원",
        minOrder: "15,000원",
        deliveryTime: "25-35분",
        image: "https://via.placeholder.com/120x120",
      }));

      setFavorites(formattedFavorites);

    } catch (error) {
      console.error('❌ 찜 목록 로딩 실패:', error);
      Alert.alert('오류', '찜 목록을 불러올 수 없습니다.');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (id) => {
    Alert.alert(
      "찜 해제",
      "이 가게를 찜 목록에서 제거하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "제거",
          style: "destructive",
          onPress: async () => {
            try {
              console.log('💔 찜 해제 중...');

              // dibsService.removeDibs() 호출
              await dibsService.removeDibs(id);

              console.log('✅ 찜 해제 완료');

              // 로컬 상태 업데이트
              setFavorites(prev => prev.filter(item => item.id !== id));

              Alert.alert('완료', '찜 목록에서 제거되었습니다.');

            } catch (error) {
              console.error('❌ 찜 해제 실패:', error);
              Alert.alert('오류', '찜 해제에 실패했습니다.');
            }
          }
        }
      ]
    );
  };

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

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
          <Text style={styles.title}>찜한 가게</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>찜 목록을 불러오는 중...</Text>
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
        <Text style={styles.title}>찜한 가게</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <TouchableOpacity
              key={favorite.id}
              style={styles.favoriteCard}
              onPress={() => navigation.navigate('RestaurantDetail', { restaurant: favorite })}
            >
              {/* 이미지와 하트 버튼 */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: favorite.image }} style={styles.image} />
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    removeFavorite(favorite.id);
                  }}
                  style={styles.heartButton}
                >
                  <Text style={styles.heart}>❤️</Text>
                </TouchableOpacity>
              </View>
              
              {/* 정보 */}
              <View style={styles.infoContainer}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{favorite.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.rating}>{favorite.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.category}>{favorite.category}</Text>
                
                <Text style={styles.details}>
                  리뷰 {favorite.reviews} • {favorite.distance}
                </Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>최소주문 {favorite.minOrder}</Text>
                  <Text style={styles.priceText}>배달팁 {favorite.deliveryFee}</Text>
                </View>
                
                <Text style={styles.deliveryTime}>
                  배달시간 {favorite.deliveryTime}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          // 빈 상태
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💔</Text>
            <Text style={styles.emptyText}>찜한 음식점이 없습니다.</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={handleGoToHome}
            >
              <Text style={styles.emptyButtonText}>맛집 찾아보기</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  favoriteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 128,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heart: {
    fontSize: 20,
  },
  infoContainer: {
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
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 12,
    color: '#6b7280',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '500',
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