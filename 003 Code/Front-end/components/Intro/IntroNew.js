// 음식 5지선다 온보딩 페이지
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { userService } from '../../services';
import { showAlert } from '../../utils/alert';
import {
  FOOD_DATABASE,
  ONBOARDING_ROUNDS,
  calculateTasteProfile,
  interpretTasteProfile,
} from '../../data/onboardingFoods';

export default function IntroNew({ navigation }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [selections, setSelections] = useState([]); // 선택한 음식 ID들
  const [selectedInRound, setSelectedInRound] = useState(null); // 현재 라운드 선택
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [tasteResult, setTasteResult] = useState(null);
  const [editableProfile, setEditableProfile] = useState(null); // 사용자가 수정 가능한 프로필
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부

  // 애니메이션
  const fadeAnim = useState(new Animated.Value(1))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  const totalRounds = ONBOARDING_ROUNDS.length;
  const currentQuestion = ONBOARDING_ROUNDS[currentRound];

  // 음식 선택 처리
  const handleFoodSelect = (foodId) => {
    setSelectedInRound(foodId);

    // 선택 애니메이션
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // 0.5초 후 다음 라운드로
    setTimeout(() => {
      const newSelections = [...selections, foodId];
      setSelections(newSelections);

      if (currentRound < totalRounds - 1) {
        // 다음 라운드
        fadeOut(() => {
          setCurrentRound(currentRound + 1);
          setSelectedInRound(null);
          fadeIn();
        });
      } else {
        // 모든 라운드 완료 - 결과 계산
        handleComplete(newSelections);
      }
    }, 400);
  };

  // 페이드 아웃 애니메이션
  const fadeOut = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(callback);
  };

  // 페이드 인 애니메이션
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // 이전 라운드로
  const handleBack = () => {
    if (currentRound > 0) {
      const newSelections = selections.slice(0, -1);
      setSelections(newSelections);
      fadeOut(() => {
        setCurrentRound(currentRound - 1);
        setSelectedInRound(null);
        fadeIn();
      });
    }
  };

  // 완료 처리
  const handleComplete = async (finalSelections) => {
    console.log('🍽️ 온보딩 완료, 선택한 음식들:', finalSelections);

    // 맛 프로필 계산
    const profile = calculateTasteProfile(finalSelections);
    const result = interpretTasteProfile(profile);

    console.log('📊 계산된 맛 프로필:', profile);
    console.log('📝 해석:', result);

    setTasteResult(result);
    setEditableProfile({ ...profile }); // 수정 가능한 프로필 복사
    setShowResult(true);
  };

  // 슬라이더 값 변경 처리
  const handleSliderChange = (taste, value) => {
    setEditableProfile(prev => ({
      ...prev,
      [taste]: Math.round(value * 10) / 10, // 소수점 1자리
    }));
  };

  // 수정 모드 토글
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // 프로필 초기화 (원래대로)
  const resetProfile = () => {
    if (tasteResult) {
      setEditableProfile({ ...tasteResult.profile });
    }
  };

  // API 저장 및 홈으로 이동
  const handleSaveAndContinue = async () => {
    setLoading(true);

    try {
      // API로 맛 프로필 저장 (수정된 프로필 사용)
      const profileToSave = editableProfile || tasteResult.profile;
      await userService.updateMyTastes(profileToSave);
      console.log('✅ 맛 프로필 저장 성공!', profileToSave);

      // 홈으로 이동
      navigation.replace('Home');
    } catch (error) {
      console.error('❌ 맛 프로필 저장 오류:', error);

      // 에러가 발생해도 홈으로 이동
      showAlert(
        '알림',
        '맛 프로필 저장 중 문제가 발생했습니다.\n나중에 설정에서 다시 설정할 수 있습니다.',
        [{ text: '확인', onPress: () => navigation.replace('Home') }]
      );
    } finally {
      setLoading(false);
    }
  };

  // 건너뛰기
  const handleSkip = () => {
    showAlert(
      '건너뛰기',
      '맛 설정을 건너뛰시겠습니까?\n나중에 마이페이지에서 설정할 수 있습니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '건너뛰기', onPress: () => navigation.replace('Home') },
      ]
    );
  };

  // 결과 화면
  if (showResult && tasteResult && editableProfile) {
    const tasteLabels = {
      spicy: { label: '매운맛', emoji: '🌶️' },
      salty: { label: '짠맛', emoji: '🧂' },
      sweet: { label: '단맛', emoji: '🍯' },
      sour: { label: '신맛', emoji: '🍋' },
      umami: { label: '감칠맛', emoji: '🍄' },
      bitter: { label: '쓴맛', emoji: '☕' },
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.resultScrollView}
          contentContainerStyle={styles.resultScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.resultTitle}>당신의 입맛 분석 완료!</Text>
          <Text style={styles.resultEmoji}>🎉</Text>

          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileTitle}>주요 선호 맛: {tasteResult.topTaste}</Text>
              <TouchableOpacity
                style={[styles.editButton, isEditing && styles.editButtonActive]}
                onPress={toggleEditMode}
              >
                <Text style={[styles.editButtonText, isEditing && styles.editButtonTextActive]}>
                  {isEditing ? '수정 완료' : '직접 수정'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tasteGrid}>
              {Object.entries(editableProfile).map(([taste, value]) => {
                const info = tasteLabels[taste];

                return (
                  <View key={taste} style={styles.tasteItem}>
                    <View style={styles.tasteHeader}>
                      <Text style={styles.tasteEmoji}>{info.emoji}</Text>
                      <Text style={styles.tasteLabel}>{info.label}</Text>
                      <Text style={styles.tasteValue}>{value.toFixed(1)}</Text>
                    </View>

                    {isEditing ? (
                      // 수정 모드: 슬라이더
                      <View style={styles.sliderContainer}>
                        <Slider
                          style={styles.slider}
                          minimumValue={0}
                          maximumValue={5}
                          step={0.1}
                          value={value}
                          onValueChange={(val) => handleSliderChange(taste, val)}
                          minimumTrackTintColor="#8b5cf6"
                          maximumTrackTintColor="#e5e7eb"
                          thumbTintColor="#8b5cf6"
                        />
                        <View style={styles.sliderLabels}>
                          <Text style={styles.sliderLabelText}>0</Text>
                          <Text style={styles.sliderLabelText}>5</Text>
                        </View>
                      </View>
                    ) : (
                      // 보기 모드: 바
                      <View style={styles.tasteBar}>
                        <View
                          style={[
                            styles.tasteBarFill,
                            { width: `${(value / 5) * 100}%` },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            {isEditing && (
              <TouchableOpacity style={styles.resetButton} onPress={resetProfile}>
                <Text style={styles.resetButtonText}>원래대로 초기화</Text>
              </TouchableOpacity>
            )}

            {!isEditing && tasteResult.interpretations.length > 0 && (
              <View style={styles.interpretations}>
                {tasteResult.interpretations.map((text, idx) => (
                  <Text key={idx} style={styles.interpretationText}>
                    {text}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {isEditing && (
            <Text style={styles.editHint}>
              슬라이더를 움직여 맛 선호도를 직접 조절하세요
            </Text>
          )}

          <TouchableOpacity
            style={[styles.continueButton, isEditing && styles.continueButtonDisabled]}
            onPress={handleSaveAndContinue}
            disabled={loading || isEditing}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>
                {isEditing ? '수정 완료 후 저장 가능' : '맛집 찾으러 가기'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // 선택 화면
  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>나의 입맛 찾기</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>건너뛰기</Text>
        </TouchableOpacity>
      </View>

      {/* 진행 바 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentRound + 1) / totalRounds) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentRound + 1} / {totalRounds}
        </Text>
      </View>

      {/* 질문 */}
      <Animated.View style={[styles.questionSection, { opacity: fadeAnim }]}>
        <Text style={styles.roundDescription}>{currentQuestion.description}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </Animated.View>

      {/* 음식 선택지 */}
      <Animated.View
        style={[
          styles.foodsContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {currentQuestion.foods.map((foodId, index) => {
          const food = FOOD_DATABASE[foodId];
          const isSelected = selectedInRound === foodId;

          return (
            <TouchableOpacity
              key={foodId}
              style={[
                styles.foodCard,
                isSelected && styles.foodCardSelected,
              ]}
              onPress={() => handleFoodSelect(foodId)}
              activeOpacity={0.7}
              disabled={selectedInRound !== null}
            >
              <Text style={styles.foodEmoji}>{food.emoji}</Text>
              <Text
                style={[
                  styles.foodName,
                  isSelected && styles.foodNameSelected,
                ]}
              >
                {food.name}
              </Text>
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* 이전 버튼 */}
      {currentRound > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← 이전</Text>
        </TouchableOpacity>
      )}

      {/* 하단 안내 */}
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>
          선택한 음식을 바탕으로 맞춤 추천을 해드려요
        </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  skipText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#8b5cf6',
    textAlign: 'right',
    fontWeight: '600',
  },
  questionSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  roundDescription: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  foodsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 10,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  foodCardSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#faf5ff',
  },
  foodEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  foodNameSelected: {
    color: '#8b5cf6',
  },
  checkBadge: {
    width: 28,
    height: 28,
    backgroundColor: '#8b5cf6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  bottomInfo: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  bottomInfoText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },

  // 결과 화면 스타일
  resultScrollView: {
    flex: 1,
  },
  resultScrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 24,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#faf5ff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8b5cf6',
    backgroundColor: 'transparent',
  },
  editButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  editButtonText: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  editButtonTextActive: {
    color: '#ffffff',
  },
  tasteGrid: {
    gap: 16,
  },
  tasteItem: {
    gap: 8,
  },
  tasteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tasteEmoji: {
    fontSize: 20,
    width: 28,
  },
  tasteLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  tasteValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    width: 32,
    textAlign: 'right',
  },
  tasteBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tasteBarFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  sliderContainer: {
    marginTop: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -8,
  },
  sliderLabelText: {
    fontSize: 10,
    color: '#9ca3af',
  },
  resetButton: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  resetButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  interpretations: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  interpretationText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  editHint: {
    fontSize: 13,
    color: '#8b5cf6',
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
