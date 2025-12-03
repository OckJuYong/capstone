// dd 스타일의 공지사항 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Alert } from 'react-native';

export default function NoticesNew({ navigation }) {
  const [notices] = useState([
    {
      id: 1,
      title: "[공지] 앱 업데이트 안내 (v1.3.0)",
      date: "2024-01-15",
      isNew: true,
      category: "공지",
      content: "새로운 기능이 추가된 v1.3.0 업데이트가 출시되었습니다. 맛의 추억 기능과 쿠폰함이 추가되었으니 업데이트 후 이용해보세요!",
    },
    {
      id: 2,
      title: "[이벤트] 봄맞이 할인 이벤트 안내",
      date: "2024-01-01",
      isNew: true,
      category: "이벤트",
      content: "봄을 맞아 모든 음식점에서 최대 50% 할인 이벤트를 진행합니다. 이벤트 기간: 2024년 1월 1일 ~ 1월 31일",
    },
    {
      id: 3,
      title: "[공지] 개인정보 처리방침 개정 안내",
      date: "2023-12-20",
      isNew: false,
      category: "공지",
      content: "개인정보 처리방침이 개정되었습니다. 주요 변경사항을 확인해주세요.",
    },
    {
      id: 4,
      title: "[공지] 서비스 이용약관 변경 안내",
      date: "2023-12-10",
      isNew: false,
      category: "공지", 
      content: "서비스 이용약관 일부 조항이 변경되었습니다. 자세한 내용은 공지사항을 참고해주세요.",
    },
    {
      id: 5,
      title: "[이벤트] 신규 가입 혜택 안내",
      date: "2023-12-01",
      isNew: false,
      category: "이벤트",
      content: "신규 회원님을 위한 특별 혜택! 가입 시 3,000원 쿠폰과 무료배송 쿠폰을 드립니다.",
    },
    {
      id: 6,
      title: "[공지] 배달 시간 안내",
      date: "2023-11-25",
      isNew: false,
      category: "공지",
      content: "음식 주문 시 예상 배달시간은 30-60분입니다. 날씨나 주문량에 따라 지연될 수 있습니다.",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: '전체', emoji: '📋' },
    { id: '공지', name: '공지', emoji: '📢' },
    { id: '이벤트', name: '이벤트', emoji: '🎉' },
  ];

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);

  const handleNoticePress = (notice) => {
    Alert.alert(
      notice.title,
      `${notice.content}\n\n작성일: ${notice.date}`,
      [{ text: '확인' }]
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
        <Text style={styles.headerTitle}>공지사항</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 요약 정보 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>📢</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>최신 공지사항</Text>
              <Text style={styles.summaryStats}>
                전체 {notices.length}개 • 새글 {notices.filter(n => n.isNew).length}개
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
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 공지사항 목록 */}
        <View style={styles.noticesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? '전체 공지사항' : `${selectedCategory} 공지사항`}
            </Text>
            <Text style={styles.noticeCount}>{filteredNotices.length}개</Text>
          </View>

          {filteredNotices.length > 0 ? (
            <View style={styles.noticesList}>
              {filteredNotices.map((notice) => (
                <TouchableOpacity
                  key={notice.id}
                  style={styles.noticeCard}
                  onPress={() => handleNoticePress(notice)}
                  activeOpacity={0.7}
                >
                  <View style={styles.noticeHeader}>
                    <View style={styles.noticeBadge}>
                      <Text style={styles.noticeBadgeText}>{notice.category}</Text>
                    </View>
                    {notice.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>N</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.noticeContent}>
                    <Text style={styles.noticeTitle}>{notice.title}</Text>
                    <Text style={styles.noticeDate}>{notice.date}</Text>
                    <Text style={styles.noticePreview} numberOfLines={2}>
                      {notice.content}
                    </Text>
                  </View>

                  <Text style={styles.arrowIcon}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>공지사항이 없습니다</Text>
              <Text style={styles.emptyDescription}>
                {selectedCategory === 'all' 
                  ? '등록된 공지사항이 없어요' 
                  : `${selectedCategory} 카테고리의 공지사항이 없어요`
                }
              </Text>
            </View>
          )}
        </View>

        {/* 알림 설정 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🔔</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>알림 설정 안내</Text>
              <Text style={styles.infoText}>
                • 중요한 공지사항은 푸시 알림으로 전송됩니다{'\n'}
                • 이벤트 알림을 받으려면 설정에서 알림을 허용해주세요{'\n'}
                • 공지사항은 앱 업데이트 시 자동으로 확인됩니다{'\n'}
                • 문의사항이 있으시면 고객센터를 이용해주세요
              </Text>
            </View>
          </View>
        </View>

        {/* 고객센터 바로가기 */}
        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportIcon}>🎧</Text>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>고객센터</Text>
              <Text style={styles.supportDescription}>
                궁금한 점이 있으시면 언제든 문의해주세요
              </Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
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
  noticeCount: {
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
  noticesSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  noticesList: {
    paddingHorizontal: 16,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  noticeHeader: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
    zIndex: 1,
  },
  noticeBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  noticeBadgeText: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  newBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  noticeContent: {
    flex: 1,
    marginTop: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    paddingRight: 60,
  },
  noticeDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  noticePreview: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9ca3af',
    marginLeft: 8,
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
  supportSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  supportButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  supportDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});