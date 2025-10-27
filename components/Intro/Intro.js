// components/Intro/Intro.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { userService } from '../../services';

export default function Intro({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    spiciness: null,
    flavor: null,
    cuisine: null,
  });

  const questions = [
    {
      id: 'spiciness',
      question: '매운 음식을 어느 정도 좋아하시나요?',
      options: [
        { value: 'mild', label: '전혀 안 매운 것' },
        { value: 'medium', label: '적당히 매운 것' },
        { value: 'spicy', label: '매운 것' },
        { value: 'very_spicy', label: '아주 매운 것' }
      ]
    },
    {
      id: 'flavor',
      question: '어떤 맛을 선호하시나요?',
      options: [
        { value: 'sweet', label: '달콤한 맛' },
        { value: 'salty', label: '짭짤한 맛' },
        { value: 'sour', label: '신맛' },
        { value: 'umami', label: '감칠맛' }
      ]
    },
    {
      id: 'cuisine',
      question: '어떤 요리를 좋아하시나요?',
      options: [
        { value: 'korean', label: '한식' },
        { value: 'chinese', label: '중식' },
        { value: 'western', label: '양식' },
        { value: 'japanese', label: '일식' }
      ]
    }
  ];

  const handleOptionSelect = (optionValue) => {
    const currentQuestion = questions[currentStep];
    setPreferences(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 모든 질문 완료
      handleCompletePreferences();
    }
  };

  // 사용자 선택을 API 형식의 맛 프로필로 변환
  const convertToTasteProfile = () => {
    const tasteProfile = {
      spicy: 3.0,
      umami: 3.0,
      sour: 3.0,
      sweet: 3.0,
      salty: 3.0,
      bitter: 3.0,
    };

    // 매운맛 설정
    if (preferences.spiciness === 'mild') {
      tasteProfile.spicy = 0.5;
    } else if (preferences.spiciness === 'medium') {
      tasteProfile.spicy = 2.5;
    } else if (preferences.spiciness === 'spicy') {
      tasteProfile.spicy = 4.0;
    } else if (preferences.spiciness === 'very_spicy') {
      tasteProfile.spicy = 5.0;
    }

    // 선호 맛 설정
    if (preferences.flavor === 'sweet') {
      tasteProfile.sweet = 5.0;
    } else if (preferences.flavor === 'salty') {
      tasteProfile.salty = 5.0;
    } else if (preferences.flavor === 'sour') {
      tasteProfile.sour = 5.0;
    } else if (preferences.flavor === 'umami') {
      tasteProfile.umami = 5.0;
    }

    // 요리 선호도에 따른 미세 조정
    if (preferences.cuisine === 'korean') {
      tasteProfile.spicy = Math.min(5.0, tasteProfile.spicy + 0.5);
      tasteProfile.salty = Math.min(5.0, tasteProfile.salty + 0.5);
    } else if (preferences.cuisine === 'japanese') {
      tasteProfile.umami = Math.min(5.0, tasteProfile.umami + 0.5);
      tasteProfile.salty = Math.min(5.0, tasteProfile.salty + 0.5);
    } else if (preferences.cuisine === 'western') {
      tasteProfile.sweet = Math.min(5.0, tasteProfile.sweet + 0.5);
    }

    return tasteProfile;
  };

  const handleCompletePreferences = async () => {
    console.log('🍽️ 입맛 설정 완료');
    console.log('사용자 선택:', preferences);

    setLoading(true);

    try {
      // 선택사항을 맛 프로필로 변환
      const tasteProfile = convertToTasteProfile();
      console.log('변환된 맛 프로필:', tasteProfile);

      // userService.updateMyTastes() 호출
      await userService.updateMyTastes(tasteProfile);

      console.log('✅ 맛 프로필 저장 성공!');

      // 홈 화면으로 이동
      navigation.replace('Home');

    } catch (error) {
      console.error('❌ 맛 프로필 저장 오류:', error);

      // 에러가 발생해도 일단 홈으로 이동 (나중에 수정 가능)
      Alert.alert(
        '알림',
        '맛 프로필 저장 중 문제가 발생했습니다. 나중에 설정에서 다시 설정할 수 있습니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.replace('Home')
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>맛 프로필 저장 중...</Text>
        </View>
      )}

      <Text style={styles.welcomeText}>앱에 오신 것을 환영합니다!</Text>
      <Text style={styles.subtitle}>당신의 입맛을 알려주세요</Text>
      
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
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option.value)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          
          {/* 테스트용 버튼 - 마지막 질문에서만 표시 */}
          {currentStep === questions.length - 1 && (
            <TouchableOpacity
              style={[styles.optionButton, { backgroundColor: '#ff6b6b' }]}
              onPress={() => {
                console.log('테스트 버튼 클릭');
                navigation.replace('Home');
              }}
            >
              <Text style={[styles.optionText, { color: 'white' }]}>테스트: 홈으로 바로 가기</Text>
            </TouchableOpacity>
          )}
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
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
    backgroundColor: '#007AFF',
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
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 15,
  },
  backButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007AFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});