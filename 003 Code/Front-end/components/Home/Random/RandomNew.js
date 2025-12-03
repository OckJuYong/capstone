// dd 스타일의 랜덤 추천 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { getHybridRecommendations } from '../../../services/recommendationService';

export default function RandomNew({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    mood: null,
    taste: null,
    temperature: null,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  const questions = [
    {
      id: 'mood',
      question: '오늘 어떤 음식이 땡기시나요?',
      emoji: '🤔',
      options: [
        { value: 'heavy', label: '든든한 한 끼', emoji: '🍖' },
        { value: 'light', label: '가벼운 식사', emoji: '🥗' },
        { value: 'snack', label: '간식거리', emoji: '🍿' },
        { value: 'comfort', label: '편안한 음식', emoji: '🍲' }
      ]
    },
    {
      id: 'taste',
      question: '어떤 맛이 생각나시나요?',
      emoji: '👅',
      options: [
        { value: 'sweet', label: '달달한 맛', emoji: '🍯' },
        { value: 'salty', label: '짭짤한 맛', emoji: '🧂' },
        { value: 'spicy', label: '매운 맛', emoji: '🌶️' },
        { value: 'rich', label: '느끼한 맛', emoji: '🧈' },
        { value: 'fresh', label: '담백한 맛', emoji: '🌿' }
      ]
    },
    {
      id: 'temperature',
      question: '뜨거운 음식 vs 차가운 음식?',
      emoji: '🌡️',
      options: [
        { value: 'hot', label: '뜨거운 음식', emoji: '🔥' },
        { value: 'cold', label: '차가운 음식', emoji: '🧊' },
        { value: 'room', label: '상관없어요', emoji: '😊' }
      ]
    }
  ];

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert(
          '위치 권한 필요',
          '주변 음식점 추천을 위해 위치 권한이 필요합니다.',
          [{ text: '확인' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('위치 권한 요청 에러:', error);
      return false;
    }
  };

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('위치 가져오기 에러:', error);

      // 위치를 가져오지 못하면 기본 위치 사용 (대전 궁동)
      const defaultLocation = {
        latitude: 36.3620,
        longitude: 127.3560,
      };

      setUserLocation(defaultLocation);
      return defaultLocation;
    }
  };

  const handleOptionSelect = (optionValue) => {
    const currentQuestion = questions[currentStep];
    setSelections(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      showRecommendations();
    }
  };

  const showRecommendations = async () => {
    setLoading(true);

    try {
      // 1. 위치 권한 확인 및 요청
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        // 권한이 없어도 기본 위치로 추천 진행
        console.log('⚠️ 위치 권한 없음, 기본 위치 사용');
      }

      // 2. 현재 위치 가져오기
      const location = await getCurrentLocation();

      console.log('📍 사용자 위치:', location);
      console.log('🎨 사용자 선택:', selections);

      // 3. GPS + 유사도 기반 추천 받기
      const hybridRecommendations = await getHybridRecommendations({
        userLat: location.latitude,
        userLon: location.longitude,
        selections,
        radius: 3, // 3km 반경
        count: 3   // 3개 추천
      });

      console.log('✅ 추천 완료:', hybridRecommendations.length, '개');

      setRecommendations(hybridRecommendations);
      setCurrentStep(-1); // 결과 화면으로 이동

    } catch (error) {
      console.error('❌ 추천 에러:', error);
      Alert.alert(
        '추천 실패',
        error.message || '추천을 가져오는 중 오류가 발생했습니다.',
        [{ text: '확인' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const resetRecommendation = () => {
    setCurrentStep(0);
    setSelections({
      mood: null,
      taste: null,
      temperature: null,
    });
    setRecommendations([]);
  };

  const handleRestaurantPress = (restaurant) => {
    // 음식점 상세 페이지로 이동
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  // 로딩 화면
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
          <Text style={styles.headerTitle}>랜덤 추천</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>맞춤 추천을 찾고 있어요...</Text>
          <Text style={styles.loadingSubtext}>
            GPS와 취향 분석 중 🎯
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // dd 스타일 추천 결과 화면
  if (currentStep === -1) {
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
          <Text style={styles.headerTitle}>추천 결과</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>🎯 맞춤 추천</Text>
            <Text style={styles.resultSubtitle}>
              당신의 취향에 맞는 맛집들이에요!
            </Text>
          </View>

          <View style={styles.recommendationsContainer}>
            {recommendations.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>😔</Text>
                <Text style={styles.emptyText}>추천 결과가 없습니다</Text>
                <Text style={styles.emptySubtext}>
                  다시 시도해주세요
                </Text>
              </View>
            ) : (
              recommendations.map((restaurant, index) => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => handleRestaurantPress(restaurant)}
                  activeOpacity={0.7}
                >
                  {/* 순위 배지 */}
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>

                  {/* 일치도 배지 */}
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>{restaurant.matchPercentage}%</Text>
                  </View>

                  <View style={styles.restaurantContent}>
                    <View style={styles.restaurantHeader}>
                      <Text style={styles.restaurantName}>{restaurant.name}</Text>
                      <View style={styles.restaurantMeta}>
                        <Text style={styles.restaurantRating}>
                          ⭐ {restaurant.rating}
                        </Text>
                        <Text style={styles.restaurantDistance}>
                          • {restaurant.distanceText || restaurant.distance}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                    <Text style={styles.matchReason}>{restaurant.matchReason}</Text>

                    <View style={styles.deliveryInfo}>
                      <Text style={styles.deliveryText}>
                        {restaurant.deliveryTime} • 배달팁 {restaurant.deliveryFee}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={resetRecommendation}
            >
              <Text style={styles.retryButtonText}>다시 추천받기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // dd 스타일 질문 화면
  const currentQuestion = questions[currentStep];

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
        <Text style={styles.headerTitle}>랜덤 추천</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* 진행 상황 */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentStep + 1} / {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* 질문 섹션 */}
        <View style={styles.questionSection}>
          <Text style={styles.questionEmoji}>{currentQuestion.emoji}</Text>
          <Text style={styles.questionTitle}>오늘은</Text>
          <Text style={styles.questionSubtitle}>{currentQuestion.question}</Text>
        </View>

        {/* 옵션들 */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 이전 버튼 */}
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.prevButtonText}>이전</Text>
          </TouchableOpacity>
        )}
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
    padding: 16,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  questionSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  prevButton: {
    marginTop: 16,
    paddingVertical: 12,
  },
  prevButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8b5cf6',
    fontWeight: '500',
  },
  // 결과 화면 스타일
  resultHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  recommendationsContainer: {
    marginBottom: 24,
  },
  restaurantCard: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  rankBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 28,
    height: 28,
    backgroundColor: '#8b5cf6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  rankText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  restaurantContent: {
    marginTop: 16,
  },
  restaurantHeader: {
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
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
  restaurantCuisine: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 8,
  },
  matchReason: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  deliveryInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  deliveryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  buttonContainer: {
    marginTop: 16,
  },
  retryButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // 로딩 스타일
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  // 빈 상태 스타일
  emptyContainer: {
    alignItems: 'center',
    padding: 48,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
});