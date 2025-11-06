import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // ===== 메인 컨테이너 =====
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  
  // ===== 헤더 디자인 =====
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // 헤더 상단 (로고 + 아이콘들)
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  // 좌측 로고 스타일
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  
  // 우측 아이콘 컨테이너
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // 검색 아이콘 버튼
  iconButton: {
    padding: 8,
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 24,
  },
  
  // 프로필 버튼
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // 인사말 섹션
  greetingSection: {
    alignItems: 'flex-start',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  greetingSubText: {
    fontSize: 16,
    color: '#666666',
  },
  
  // ===== 섹션 공통 스타일 =====
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  moreButton: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  
  // ===== 맞춤 추천 메뉴 섹션 =====
  recommendationSection: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  
  // 추천 메뉴 슬라이더 컨테이너
  recommendedSlider: {
    paddingRight: 20,
  },
  
  // 추천 메뉴 카드 (슬라이드용)
  recommendedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    width: (width - 60) / 2,
    marginRight: 15,
  },
  
  // 메뉴 이미지 컨테이너
  menuImageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  
  // 별점 뱃지 (이미지 우측 상단)
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // 메뉴 정보
  menuInfo: {
    padding: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  
  // 카테고리 태그
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  
  // ===== 음식 카테고리 섹션 =====
  categorySection: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  
  // 카테고리 그리드
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  // 카테고리 카드
  categoryCard: {
    width: '22%',
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // 카테고리 내용
  categoryContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  
  // 카테고리 이모지
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  
  // 카테고리 이름
  categoryName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  
  // ===== 지금 뜨는 메뉴 섹션 =====
  categoriesSection: {
    backgroundColor: '#ffffff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  
  // 카테고리 탭
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  
  // ===== 음식점 리스트 =====
  restaurantList: {
    gap: 15,
  },
  
  // 개별 음식점 카드
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  
  // 음식점 이미지
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  
  // 음식점 정보
  restaurantInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  restaurantCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  restaurantCategory: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  
  // 음식점 설명
  restaurantDescription: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
    lineHeight: 16,
  },
  
  // 음식점 메타 정보 (별점 + 거리)
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  restaurantRating: {
    alignSelf: 'flex-start',
  },
  restaurantRatingText: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  
  // 거리 표시 스타일
  restaurantDistance: {
    alignSelf: 'flex-end',
  },
  restaurantDistanceText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  
  // ===== Footer 네비게이션 =====
  footer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Footer 개별 아이템
  footerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeFooterItem: {
    // 활성 상태 스타일 (현재 홈 화면)
  },
  footerIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
  activeFooterText: {
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  
  // 하단 여백
  bottomSpacing: {
    height: 20,
  },
});

export default styles;