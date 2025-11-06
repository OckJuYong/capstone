// dd 스타일의 사용자 입맛 설정 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function IntroNew({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    spiciness: null,
    flavor: null,
    cuisine: null,
  });

  const questions = [
    {
      id: 'spiciness',
      title: '매운맛 선호도',
      question: '매운 음식을 어느 정도 좋아하시나요?',
      emoji: '🌶️',
      options: [
        { value: 'mild', label: '전혀 안 매운 것', emoji: '😌', description: '순한 맛만 괜찮아요' },
        { value: 'medium', label: '적당히 매운 것', emoji: '😊', description: '보통 정도의 매운맛' },
        { value: 'spicy', label: '매운 것', emoji: '😋', description: '매운 음식을 좋아해요' },
        { value: 'very_spicy', label: '아주 매운 것', emoji: '🔥', description: '매울수록 좋아요!' }
      ]
    },
    {
      id: 'flavor',
      title: '맛 선호도',
      question: '어떤 맛을 가장 선호하시나요?',
      emoji: '👅',
      options: [
        { value: 'sweet', label: '달콤한 맛', emoji: '🍯', description: '단맛이 나는 음식' },
        { value: 'salty', label: '짭짤한 맛', emoji: '🧂', description: '짠맛이 강한 음식' },
        { value: 'sour', label: '신맛', emoji: '🍋', description: '새콤한 맛의 음식' },
        { value: 'umami', label: '감칠맛', emoji: '🍄', description: '깊고 진한 맛의 음식' }
      ]
    },
    {
      id: 'cuisine',
      title: '요리 선호도',
      question: '평소 어떤 요리를 가장 좋아하시나요?',
      emoji: '🍽️',
      options: [
        { value: 'korean', label: '한식', emoji: '🍚', description: '김치, 불고기, 비빔밥 등' },
        { value: 'chinese', label: '중식', emoji: '🥟', description: '짜장면, 탕수육, 만두 등' },
        { value: 'western', label: '양식', emoji: '🍝', description: '파스타, 스테이크, 피자 등' },
        { value: 'japanese', label: '일식', emoji: '🍣', description: '초밥, 라멘, 돈카츠 등' }
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
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      setTimeout(() => {
        handleCompletePreferences();
      }, 500);
    }
  };

  const handleCompletePreferences = () => {
    console.log('입맛 설정 완료:', preferences);
    navigation.replace('Home');
  };

  const currentQuestion = questions[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>맞춤 추천을 위한</Text>
        <Text style={styles.welcomeSubtext}>입맛 설정</Text>
      </View>

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
        <Text style={styles.questionCategory}>{currentQuestion.title}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* 옵션들 */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = preferences[currentQuestion.id] === option.value;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected
              ]}
              onPress={() => handleOptionSelect(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <View style={styles.optionTextContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.optionDescription,
                    isSelected && styles.optionDescriptionSelected
                  ]}>
                    {option.description}
                  </Text>
                </View>
              </View>
              
              {isSelected && (
                <View style={styles.checkIcon}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 이전 버튼 */}
      {currentStep > 0 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(currentStep - 1)}
        >
          <Text style={styles.backButtonText}>← 이전</Text>
        </TouchableOpacity>
      )}

      {/* 하단 안내 */}
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>
          선택하신 정보는 맞춤 음식점 추천에 활용됩니다
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8b5cf6',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
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
  questionCategory: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  optionButtonSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#faf5ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: '#8b5cf6',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  optionDescriptionSelected: {
    color: '#8b5cf6',
  },
  checkIcon: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 24,
    height: 24,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  bottomInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  bottomInfoText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});