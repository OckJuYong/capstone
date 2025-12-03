// dd 스타일의 리뷰 작성 페이지
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { reviewService } from '../../../../services';

export default function RiviewNew({ route, navigation }) {
  const { restaurantName, restaurantId, menuId, orderId } = route.params || {};
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const reviewTags = [
    { id: 'taste', label: '맛있어요', emoji: '😋' },
    { id: 'service', label: '친절해요', emoji: '😊' },
    { id: 'clean', label: '깨끗해요', emoji: '✨' },
    { id: 'fast', label: '빨라요', emoji: '⚡' },
    { id: 'portion', label: '양이 많아요', emoji: '🍽️' },
    { id: 'fresh', label: '신선해요', emoji: '🌿' }
  ];

  const handleRating = (star) => {
    setRating(star);
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      Alert.alert('알림', '별점을 선택해주세요.');
      return;
    }

    if (reviewText.length < 10) {
      Alert.alert('알림', '리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    if (!restaurantId) {
      Alert.alert('오류', '식당 정보가 없습니다.');
      return;
    }

    Alert.alert(
      '리뷰 제출',
      '리뷰를 제출하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '제출',
          onPress: async () => {
            try {
              console.log('✍️ 리뷰 작성 중...');
              setLoading(true);

              // 리뷰 데이터 구성
              const reviewData = {
                content: reviewText,
                rating,
                menuId: menuId || null,
                orderId: orderId || null,
                tags: selectedTags, // 태그 정보 (백엔드에서 지원 시 사용)
              };

              // reviewService.createReview() 호출
              await reviewService.createReview(restaurantId, reviewData);

              console.log('✅ 리뷰 작성 완료');

              setLoading(false);

              Alert.alert('완료', '리뷰가 제출되었습니다!', [
                { text: '확인', onPress: () => navigation.goBack() }
              ]);

            } catch (error) {
              console.error('❌ 리뷰 작성 실패:', error);
              setLoading(false);
              Alert.alert('오류', '리뷰 제출에 실패했습니다. 다시 시도해주세요.');
            }
          }
        }
      ]
    );
  };

  const addPhoto = () => {
    Alert.alert(
      '사진 첨부',
      '사진을 첨부하시겠습니까?\\n\\n실제 앱에서는 갤러리 또는 카메라를 사용합니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '갤러리', onPress: () => console.log('갤러리에서 사진 선택') },
        { text: '카메라', onPress: () => console.log('카메라로 촬영') }
      ]
    );
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return '별로예요';
      case 2: return '그저그래요';
      case 3: return '보통이에요';
      case 4: return '좋아요';
      case 5: return '최고예요';
      default: return '별점을 선택해주세요';
    }
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
        <Text style={styles.headerTitle}>리뷰 작성</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 음식점 정보 */}
        <View style={styles.restaurantSection}>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantIcon}>🍽️</Text>
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              <Text style={styles.restaurantSubtext}>이 음식점은 어떠셨나요?</Text>
            </View>
          </View>
        </View>

        {/* 별점 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>별점을 선택해주세요</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => handleRating(star)}
                  style={styles.starButton}
                >
                  <Text style={[
                    styles.star,
                    star <= rating ? styles.starSelected : styles.starUnselected
                  ]}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText}>{getRatingText(rating)}</Text>
          </View>
        </View>

        {/* 태그 선택 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이 음식점의 장점은? (선택)</Text>
          <View style={styles.tagsContainer}>
            {reviewTags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag.id) && styles.tagButtonSelected
                ]}
                onPress={() => toggleTag(tag.id)}
              >
                <Text style={styles.tagEmoji}>{tag.emoji}</Text>
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag.id) && styles.tagTextSelected
                ]}>
                  {tag.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 리뷰 내용 입력 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            상세한 리뷰를 작성해주세요 ({reviewText.length}/200)
          </Text>
          <TextInput
            style={styles.reviewInput}
            multiline
            maxLength={200}
            placeholder="솔직한 리뷰를 작성해주세요! (최소 10자 이상)\\n\\n• 음식의 맛과 품질은 어떠셨나요?\\n• 서비스나 배달은 만족스러우셨나요?\\n• 다른 분들께 추천하고 싶으신가요?"
            placeholderTextColor="#9ca3af"
            value={reviewText}
            onChangeText={setReviewText}
            textAlignVertical="top"
          />
        </View>
        
        {/* 사진 첨부 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사진 첨부 (선택)</Text>
          <TouchableOpacity style={styles.photoButton} onPress={addPhoto}>
            <Text style={styles.photoIcon}>📷</Text>
            <Text style={styles.photoButtonText}>사진 추가하기</Text>
            <Text style={styles.photoDescription}>음식 사진을 올려보세요</Text>
          </TouchableOpacity>
        </View>

        {/* 리뷰 가이드 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>리뷰 작성 가이드</Text>
              <Text style={styles.infoText}>
                • 솔직하고 정확한 후기를 작성해주세요{'\n'}
                • 다른 고객들에게 도움이 되는 정보를 포함해주세요{'\n'}
                • 욕설이나 비방은 삭제될 수 있습니다{'\n'}
                • 좋은 리뷰는 포인트 적립 혜택이 있어요
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 리뷰 제출 버튼 */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || reviewText.length < 10 || loading) && styles.submitButtonDisabled
          ]}
          onPress={handleReviewSubmit}
          disabled={rating === 0 || reviewText.length < 10 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={[
              styles.submitButtonText,
              (rating === 0 || reviewText.length < 10) && styles.submitButtonTextDisabled
            ]}>
              리뷰 제출하기
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  restaurantSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  restaurantSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
  },
  starSelected: {
    color: '#fbbf24',
  },
  starUnselected: {
    color: '#e5e7eb',
  },
  ratingText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  tagButtonSelected: {
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
  },
  tagEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  tagText: {
    fontSize: 14,
    color: '#6b7280',
  },
  tagTextSelected: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
  reviewInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    color: '#111827',
  },
  photoButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 24,
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '500',
    marginBottom: 4,
  },
  photoDescription: {
    fontSize: 12,
    color: '#6b7280',
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
  submitContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#9ca3af',
  },
});