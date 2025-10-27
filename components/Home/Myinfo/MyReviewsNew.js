// dd 스타일의 내가 쓴 리뷰 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function MyReviewsNew({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');
  
  const [reviews] = useState([
    {
      id: 1,
      restaurantName: "메종 크림 파스타",
      rating: 5,
      content: "맛있어요! 배달도 빨라요. 특히 소스가 일품이었어요. 다음에도 주문할 예정입니다.",
      date: "2024-01-15",
      image: "https://via.placeholder.com/80x80/8b5cf6/ffffff?text=파스타",
      likes: 12,
      comments: 3,
      tasteRatings: {
        sweet: 5,
        spicy: 3,
        sour: 4,
        savory: 5,
      },
      photos: [
        "https://via.placeholder.com/100x100/8b5cf6/ffffff?text=Photo1",
        "https://via.placeholder.com/100x100/ec4899/ffffff?text=Photo2"
      ],
      isEditable: true,
    },
    {
      id: 2,
      restaurantName: "스시로",
      rating: 4,
      content: "전체적으로 만족스러웠어요. 다만 배달이 조금 늦었네요. 음식은 맛있었습니다!",
      date: "2024-01-10",
      image: "https://via.placeholder.com/80x80/3b82f6/ffffff?text=초밥",
      likes: 8,
      comments: 1,
      tasteRatings: {
        sweet: 4,
        spicy: 5,
        sour: 3,
        savory: 5,
      },
      photos: ["https://via.placeholder.com/100x100/3b82f6/ffffff?text=초밥"],
      isEditable: true,
    },
    {
      id: 3,
      restaurantName: "치킨마루",
      rating: 5,
      content: "정말 맛있었어요! 특히 양념이 일품이고 바삭바삭했습니다. 강력 추천합니다.",
      date: "2024-01-05",
      image: "https://via.placeholder.com/80x80/f59e0b/ffffff?text=치킨",
      likes: 15,
      comments: 5,
      tasteRatings: {
        sweet: 5,
        spicy: 4,
        sour: 5,
        savory: 4,
      },
      photos: [
        "https://via.placeholder.com/100x100/f59e0b/ffffff?text=치킨1",
        "https://via.placeholder.com/100x100/ef4444/ffffff?text=치킨2",
        "https://via.placeholder.com/100x100/22c55e/ffffff?text=치킨3"
      ],
      isEditable: true,
    },
    {
      id: 4,
      restaurantName: "홍대 떡볶이",
      rating: 3,
      content: "평범했어요. 가격 대비 양이 조금 적은 것 같아요. 맛은 괜찮았습니다.",
      date: "2023-12-28",
      image: "https://via.placeholder.com/80x80/ef4444/ffffff?text=떡볶이",
      likes: 4,
      comments: 2,
      tasteRatings: {
        sweet: 3,
        spicy: 2,
        sour: 3,
        savory: 4,
      },
      photos: [],
      isEditable: false, // 수정 불가능한 오래된 리뷰
    },
  ]);

  const tabs = [
    { key: 'all', label: '전체' },
    { key: '5', label: '5점' },
    { key: '4', label: '4점' },
    { key: '3', label: '3점' },
    { key: '2', label: '2점' },
    { key: '1', label: '1점' },
  ];

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(activeTab));

  const getTasteDescription = (type, value) => {
    const descriptions = {
      spicy: ["전혀 맵지 않음", "약간 매움", "적당히 매움", "매우 매움", "극도로 매움"],
      sweet: ["전혀 달지 않음", "약간 달음", "적당히 달음", "매우 달음", "극도로 달음"],
      sour: ["전혀 시지 않음", "약간 신맛", "적당히 신맛", "매우 신맛", "극도로 신맛"],
      savory: ["전혀 느끼하지 않음", "약간 느끼함", "적당히 느끼함", "매우 느끼함", "극도로 느끼함"],
    };
    return descriptions[type][value - 1];
  };

  const handleEditReview = (review) => {
    navigation.navigate('Riview', { 
      restaurantName: review.restaurantName,
      editMode: true,
      reviewData: review
    });
  };

  const handleDeleteReview = (reviewId) => {
    // 리뷰 삭제 로직
    Alert.alert(
      '리뷰 삭제',
      '이 리뷰를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', onPress: () => console.log('Delete review:', reviewId) }
      ]
    );
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
        <Text style={styles.headerTitle}>내가 쓴 리뷰</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 리뷰 요약 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>⭐</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>나의 리뷰 통계</Text>
              <Text style={styles.summaryStats}>
                총 {reviews.length}개 리뷰 • 평균 {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}점
              </Text>
            </View>
          </View>
        </View>

        {/* 필터 탭 */}
        <View style={styles.tabSection}>
          <Text style={styles.sectionTitle}>평점별 필터</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabList}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.tabButtonActive
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 리뷰 목록 */}
        <View style={styles.reviewsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'all' ? '전체 리뷰' : `${activeTab}점 리뷰`}
            </Text>
            <Text style={styles.reviewCount}>{filteredReviews.length}개</Text>
          </View>

          {filteredReviews.length > 0 ? (
            <View style={styles.reviewsList}>
              {filteredReviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  {/* 리뷰 헤더 */}
                  <View style={styles.reviewHeader}>
                    <View style={styles.restaurantInfo}>
                      <Image 
                        source={{ uri: review.image }}
                        style={styles.restaurantImage}
                      />
                      <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantName}>{review.restaurantName}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Text
                          key={i}
                          style={[
                            styles.star,
                            i < review.rating ? styles.starFilled : styles.starEmpty
                          ]}
                        >
                          ★
                        </Text>
                      ))}
                    </View>
                  </View>

                  {/* 리뷰 내용 */}
                  <Text style={styles.reviewContent}>{review.content}</Text>

                  {/* 리뷰 사진 */}
                  {review.photos.length > 0 && (
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.photosList}
                      style={styles.photosContainer}
                    >
                      {review.photos.map((photo, index) => (
                        <Image
                          key={index}
                          source={{ uri: photo }}
                          style={styles.reviewPhoto}
                        />
                      ))}
                    </ScrollView>
                  )}

                  {/* 맛 평가 */}
                  <View style={styles.tasteRatings}>
                    <View style={styles.tasteItem}>
                      <Text style={styles.tasteLabel}>매운맛</Text>
                      <Text style={styles.tasteValue}>
                        {getTasteDescription('spicy', review.tasteRatings.spicy)}
                      </Text>
                    </View>
                    <View style={styles.tasteItem}>
                      <Text style={styles.tasteLabel}>단맛</Text>
                      <Text style={styles.tasteValue}>
                        {getTasteDescription('sweet', review.tasteRatings.sweet)}
                      </Text>
                    </View>
                    <View style={styles.tasteItem}>
                      <Text style={styles.tasteLabel}>신맛</Text>
                      <Text style={styles.tasteValue}>
                        {getTasteDescription('sour', review.tasteRatings.sour)}
                      </Text>
                    </View>
                    <View style={styles.tasteItem}>
                      <Text style={styles.tasteLabel}>느끼함</Text>
                      <Text style={styles.tasteValue}>
                        {getTasteDescription('savory', review.tasteRatings.savory)}
                      </Text>
                    </View>
                  </View>

                  {/* 리뷰 통계 */}
                  <View style={styles.reviewStats}>
                    <Text style={styles.reviewStat}>👍 도움됨 {review.likes}</Text>
                    <Text style={styles.reviewStat}>💬 댓글 {review.comments}</Text>
                  </View>

                  {/* 수정/삭제 버튼 */}
                  {review.isEditable && (
                    <View style={styles.reviewActions}>
                      <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => handleEditReview(review)}
                      >
                        <Text style={styles.editButtonText}>수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDeleteReview(review.id)}
                      >
                        <Text style={styles.deleteButtonText}>삭제</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>리뷰가 없습니다</Text>
              <Text style={styles.emptyDescription}>
                {activeTab === 'all' 
                  ? '아직 작성한 리뷰가 없어요' 
                  : `${activeTab}점으로 평가한 리뷰가 없어요`
                }
              </Text>
            </View>
          )}
        </View>

        {/* 리뷰 작성 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>리뷰 작성 팁</Text>
              <Text style={styles.infoText}>
                • 솔직하고 자세한 리뷰는 다른 사용자에게 도움이 돼요{'\n'}
                • 사진을 첨부하면 더 생생한 리뷰가 완성돼요{'\n'}
                • 맛 평가를 통해 나의 취향을 기록해보세요{'\n'}
                • 좋은 리뷰에는 포인트 적립 혜택이 있어요
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
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  summarySection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryCard: {
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e879f9',
  },
  summaryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  summaryStats: {
    fontSize: 14,
    color: '#8b5cf6',
  },
  tabSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  tabButtonActive: {
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#8b5cf6',
  },
  reviewsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  reviewsList: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  restaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
  },
  starFilled: {
    color: '#fbbf24',
  },
  starEmpty: {
    color: '#e5e7eb',
  },
  reviewContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  photosContainer: {
    marginBottom: 12,
  },
  photosList: {
    gap: 8,
  },
  reviewPhoto: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  tasteRatings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tasteItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 8,
    width: '47%',
  },
  tasteLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  tasteValue: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  reviewStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  reviewStat: {
    fontSize: 12,
    color: '#6b7280',
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  editButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
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