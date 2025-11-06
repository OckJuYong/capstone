// dd 스타일의 이벤트 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function EventNew({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('active');
  
  const [events] = useState([
    {
      id: 1,
      title: "봄맞이 할인 이벤트",
      description: "봄맞이 특별 할인 이벤트! 최대 50% 할인",
      period: "2024-04-01 ~ 2024-04-30",
      image: "https://via.placeholder.com/300x150/8b5cf6/ffffff?text=봄맞이+할인",
      isActive: true,
      discount: "최대 50%",
      badge: "진행중",
    },
    {
      id: 2,
      title: "친구 초대 이벤트",
      description: "친구 초대하고 5,000원 쿠폰 받기",
      period: "2024-03-15 ~ 2024-05-15",
      image: "https://via.placeholder.com/300x150/ec4899/ffffff?text=친구+초대",
      isActive: true,
      discount: "5,000원",
      badge: "진행중",
    },
    {
      id: 3,
      title: "리뷰 작성 이벤트",
      description: "리뷰 작성하고 포인트 받기",
      period: "2024-03-01 ~ 2024-04-30",
      image: "https://via.placeholder.com/300x150/3b82f6/ffffff?text=리뷰+작성",
      isActive: true,
      discount: "포인트",
      badge: "진행중",
    },
    {
      id: 4,
      title: "신규 회원 혜택",
      description: "첫 주문 시 3,000원 할인",
      period: "2024-01-01 ~ 2024-12-31",
      image: "https://via.placeholder.com/300x150/22c55e/ffffff?text=신규+회원",
      isActive: true,
      discount: "3,000원",
      badge: "상시",
    },
    {
      id: 5,
      title: "설날 특별 이벤트",
      description: "설날 맞이 특별 할인 이벤트",
      period: "2024-01-20 ~ 2024-01-25",
      image: "https://via.placeholder.com/300x150/f59e0b/ffffff?text=설날+특가",
      isActive: false,
      discount: "30%",
      badge: "종료",
    },
  ]);

  const filters = [
    { key: 'active', label: '진행중' },
    { key: 'ended', label: '종료' },
    { key: 'all', label: '전체' },
  ];

  const getFilteredEvents = () => {
    switch (activeFilter) {
      case 'active':
        return events.filter(e => e.isActive);
      case 'ended':
        return events.filter(e => !e.isActive);
      case 'all':
      default:
        return events;
    }
  };

  const handleEventPress = (event) => {
    // 이벤트 상세 페이지로 이동하거나 관련 액션 수행
    console.log('이벤트 선택:', event.title);
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
        <Text style={styles.headerTitle}>이벤트</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 필터 탭 */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabs}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  activeFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setActiveFilter(filter.key)}
              >
                <Text style={[
                  styles.filterTabText,
                  activeFilter === filter.key && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 이벤트 목록 */}
        <View style={styles.eventsList}>
          {getFilteredEvents().length > 0 ? (
            getFilteredEvents().map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => handleEventPress(event)}
                activeOpacity={0.7}
              >
                {/* 이벤트 이미지 */}
                <View style={styles.eventImageContainer}>
                  <Image 
                    source={{ uri: event.image }} 
                    style={styles.eventImage} 
                  />
                  {/* 할인 배지 */}
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{event.discount}</Text>
                  </View>
                  {/* 상태 배지 */}
                  <View style={[
                    styles.statusBadge,
                    !event.isActive && styles.statusBadgeEnded
                  ]}>
                    <Text style={[
                      styles.statusText,
                      !event.isActive && styles.statusTextEnded
                    ]}>
                      {event.badge}
                    </Text>
                  </View>
                </View>

                {/* 이벤트 정보 */}
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  <Text style={styles.eventPeriod}>{event.period}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>
                {activeFilter === 'active' && '진행 중인 이벤트가 없습니다'}
                {activeFilter === 'ended' && '종료된 이벤트가 없습니다'}
                {activeFilter === 'all' && '이벤트가 없습니다'}
              </Text>
              <Text style={styles.emptyDescription}>
                새로운 이벤트를 기대해 주세요!
              </Text>
            </View>
          )}
        </View>

        {/* 이벤트 안내 */}
        <View style={styles.noticeSection}>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeIcon}>📢</Text>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>이벤트 참여 안내</Text>
              <Text style={styles.noticeText}>
                • 이벤트는 중복 참여가 불가능합니다{'\n'}
                • 쿠폰은 이벤트 종료 후 7일 이내에 지급됩니다{'\n'}
                • 자세한 내용은 각 이벤트를 확인해 주세요
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
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTabs: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterTabActive: {
    backgroundColor: '#ede9fe',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#8b5cf6',
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventImageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#f3f4f6',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeEnded: {
    backgroundColor: '#6b7280',
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  statusTextEnded: {
    color: '#ffffff',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  eventPeriod: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
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
  noticeSection: {
    padding: 16,
  },
  noticeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
  },
  noticeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});