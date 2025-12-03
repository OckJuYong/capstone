// components/Home/Random/Random.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function Random({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    mood: null,
    taste: null,
    temperature: null,
  });

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

  // 임시 추천 데이터 (실제로는 백엔드에서 받아올 데이터)
  const mockRestaurants = [
    {
      id: 1,
      name: '맛있는 한식당',
      cuisine: '한식',
      distance: '120m',
      rating: 4.5,
      matchReason: '당신의 입맛에 딱 맞는 담백한 한식!',
      address: '서울시 강남구 테헤란로 123'
    },
    {
      id: 2,
      name: '스파이시 치킨',
      cuisine: '양식',
      distance: '250m',
      rating: 4.3,
      matchReason: '매운맛을 좋아하는 당신에게 추천!',
      address: '서울시 강남구 역삼동 456'
    },
    {
      id: 3,
      name: '달콤 디저트 카페',
      cuisine: '카페/디저트',
      distance: '180m',
      rating: 4.7,
      matchReason: '달달한 간식이 생각날 때!',
      address: '서울시 강남구 선릉로 789'
    },
    {
      id: 4,
      name: '정성 집밥',
      cuisine: '한식',
      distance: '300m',
      rating: 4.4,
      matchReason: '편안한 집밥 같은 음식',
      address: '서울시 강남구 봉은사로 321'
    }
  ];

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

  const showRecommendations = () => {
    console.log('사용자 선택:', selections);
    console.log('추천 요청 중...');
    
    const filteredRecommendations = getFilteredRecommendations();
    setCurrentStep(-1); 
  };

  const getFilteredRecommendations = () => {
    let filtered = [...mockRestaurants];
    
    if (selections.taste === 'sweet') {
      filtered = filtered.filter(r => r.name.includes('디저트') || r.name.includes('달콤'));
    } else if (selections.taste === 'spicy') {
      filtered = filtered.filter(r => r.name.includes('스파이시') || r.name.includes('매운'));
    }
    
    return filtered.slice(0, 3); // 상위 3개만 반환
  };

  const resetRecommendation = () => {
    setCurrentStep(0);
    setSelections({
      mood: null,
      taste: null,
      temperature: null,
    });
  };

  const handleRestaurantPress = (restaurant) => {
    Alert.alert(
      restaurant.name,
      `${restaurant.address}\n평점: ${restaurant.rating}/5.0\n\n${restaurant.matchReason}\n\n실제 앱에서는 구글맵으로 연결됩니다.`,
      [
        { text: '확인', style: 'default' }
      ]
    );
  };

  // 추천 결과 화면
  if (currentStep === -1) {
    const recommendations = getFilteredRecommendations();
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.resultTitle}>🎯 맞춤 추천 결과</Text>
          <Text style={styles.resultSubtitle}>당신의 취향에 맞는 근처 맛집들이에요!</Text>
        </View>

        <View style={styles.recommendationsContainer}>
          {recommendations.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantDistance}>{restaurant.distance}</Text>
              </View>
              
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              <Text style={styles.restaurantRating}>⭐ {restaurant.rating}/5.0</Text>
              <Text style={styles.matchReason}>{restaurant.matchReason}</Text>
              
              <View style={styles.restaurantFooter}>
                <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retryButton} onPress={resetRecommendation}>
            <Text style={styles.retryButtonText}>다시 추천받기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // 질문 화면
  const currentQuestion = questions[currentStep];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{currentQuestion.emoji}</Text>
        <Text style={styles.title}>랜덤 음식 추천</Text>
        <Text style={styles.subtitle}>몇 가지만 선택해주세요!</Text>
      </View>

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

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option.value)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {currentStep > 0 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(currentStep - 1)}
        >
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 15,
  },
  backButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ff6b6b',
  },
  // 추천 결과 화면 스타일
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  recommendationsContainer: {
    marginTop: 20,
  },
  restaurantCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  restaurantDistance: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  restaurantRating: {
    fontSize: 14,
    color: '#ff9500',
    marginBottom: 8,
  },
  matchReason: {
    fontSize: 14,
    color: '#007AFF',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  restaurantFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 8,
  },
  restaurantAddress: {
    fontSize: 12,
    color: '#999999',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingVertical: 15,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  homeButtonText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },
});