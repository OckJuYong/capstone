// dd 스타일의 맛의 추억 (내 입맛 분석) 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function TasteMemoriesNew({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');
  
  const [memories] = useState([
    {
      id: 1,
      name: "삼겹살",
      image: "https://via.placeholder.com/120x120/8b5cf6/ffffff?text=삼겹살",
      visits: 20,
      rating: 4.5,
      category: "korean",
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "파스타",
      image: "https://via.placeholder.com/120x120/ec4899/ffffff?text=파스타",
      visits: 16,
      rating: 4.5,
      category: "western",
      lastOrder: "2024-01-12",
    },
    {
      id: 3,
      name: "초밥",
      image: "https://via.placeholder.com/120x120/3b82f6/ffffff?text=초밥",
      visits: 12,
      rating: 4.3,
      category: "japanese",
      lastOrder: "2024-01-10",
    },
    {
      id: 4,
      name: "햄버거",
      image: "https://via.placeholder.com/120x120/22c55e/ffffff?text=햄버거",
      visits: 10,
      rating: 4.2,
      category: "fastfood",
      lastOrder: "2024-01-08",
    },
    {
      id: 5,
      name: "치킨",
      image: "https://via.placeholder.com/120x120/f59e0b/ffffff?text=치킨",
      visits: 8,
      rating: 4.7,
      category: "chicken",
      lastOrder: "2024-01-05",
    },
    {
      id: 6,
      name: "피자",
      image: "https://via.placeholder.com/120x120/ef4444/ffffff?text=피자",
      visits: 6,
      rating: 4.4,
      category: "pizza",
      lastOrder: "2024-01-03",
    },
    {
      id: 7,
      name: "떡볶이",
      image: "https://via.placeholder.com/120x120/8b5cf6/ffffff?text=떡볶이",
      visits: 5,
      rating: 4.6,
      category: "korean",
      lastOrder: "2024-01-01",
    },
    {
      id: 8,
      name: "라멘",
      image: "https://via.placeholder.com/120x120/3b82f6/ffffff?text=라멘",
      visits: 4,
      rating: 4.8,
      category: "japanese",
      lastOrder: "2023-12-28",
    },
  ]);

  const categories = [
    { id: 'all', name: '전체', emoji: '📊' },
    { id: 'korean', name: '한식', emoji: '🍚' },
    { id: 'japanese', name: '일식', emoji: '🍣' },
    { id: 'western', name: '양식', emoji: '🍝' },
    { id: 'chinese', name: '중식', emoji: '🥢' },
    { id: 'chicken', name: '치킨', emoji: '🍗' },
    { id: 'pizza', name: '피자', emoji: '🍕' },
    { id: 'fastfood', name: '패스트푸드', emoji: '🍔' },
  ];

  const filteredMemories = activeTab === 'all' 
    ? memories 
    : memories.filter(memory => memory.category === activeTab);

  const handleMemoryPress = (memory) => {
    // 해당 음식의 상세 정보나 관련 음식점으로 이동
    navigation.navigate('Search', { query: memory.name });
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
        <Text style={styles.headerTitle}>맛의 추억</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 요약 정보 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>📈</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>나의 입맛 분석</Text>
              <Text style={styles.summaryStats}>
                총 {memories.length}가지 음식 • 평균 평점 {(memories.reduce((sum, m) => sum + m.rating, 0) / memories.length).toFixed(1)}점
              </Text>
            </View>
          </View>
        </View>

        {/* 카테고리 필터 */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeTab === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setActiveTab(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  activeTab === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 맛의 추억 그리드 */}
        <View style={styles.memoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'all' ? '전체 맛의 추억' : `${categories.find(c => c.id === activeTab)?.name} 추억`}
            </Text>
            <Text style={styles.memoryCount}>{filteredMemories.length}개</Text>
          </View>
          
          <View style={styles.memoriesGrid}>
            {filteredMemories.map((memory) => (
              <TouchableOpacity
                key={memory.id}
                style={styles.memoryCard}
                onPress={() => handleMemoryPress(memory)}
                activeOpacity={0.7}
              >
                <View style={styles.memoryImageContainer}>
                  <Image 
                    source={{ uri: memory.image }}
                    style={styles.memoryImage}
                    resizeMode="cover"
                  />
                  <View style={styles.memoryOverlay}>
                    <Text style={styles.memoryName}>{memory.name}</Text>
                    <View style={styles.memoryRating}>
                      <Text style={styles.memoryRatingText}>⭐ {memory.rating}</Text>
                    </View>
                    <Text style={styles.memoryVisits}>주문: {memory.visits}회</Text>
                  </View>
                </View>
                
                <View style={styles.memoryInfo}>
                  <Text style={styles.memoryLastOrder}>
                    마지막 주문: {memory.lastOrder}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredMemories.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🍽️</Text>
              <Text style={styles.emptyTitle}>추억이 없습니다</Text>
              <Text style={styles.emptyDescription}>
                {activeTab === 'all' 
                  ? '아직 주문한 음식이 없어요' 
                  : `${categories.find(c => c.id === activeTab)?.name} 카테고리의 주문 기록이 없어요`
                }
              </Text>
            </View>
          )}
        </View>

        {/* 입맛 분석 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>맛의 추억 활용법</Text>
              <Text style={styles.infoText}>
                • 자주 주문한 음식을 확인하여 취향을 파악하세요{'\n'}
                • 높은 평점의 음식을 다시 주문해보세요{'\n'}
                • 새로운 카테고리에 도전해보세요{'\n'}
                • 친구들과 맛의 추억을 공유해보세요
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
  categorySection: {
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
  memoryCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    minWidth: 70,
  },
  categoryButtonActive: {
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
  },
  categoryEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#8b5cf6',
  },
  memoriesSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  memoriesGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  memoryCard: {
    width: '31%',
    marginBottom: 16,
  },
  memoryImageContainer: {
    position: 'relative',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  memoryImage: {
    width: '100%',
    height: '100%',
  },
  memoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    alignItems: 'center',
  },
  memoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  memoryRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  memoryRatingText: {
    fontSize: 10,
    color: '#fbbf24',
  },
  memoryVisits: {
    fontSize: 10,
    color: '#ffffff',
  },
  memoryInfo: {
    paddingTop: 8,
  },
  memoryLastOrder: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
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