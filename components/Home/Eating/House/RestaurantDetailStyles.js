import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // ===== 메인 컨테이너 =====
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },

  // ===== 이미지 헤더 =====
  imageHeader: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },

  // 헤더 오버레이 (버튼들)
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  // 뒤로가기 버튼 (좌측 상단)
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // 우측 상단 버튼들
  headerRightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    fontSize: 18,
  },

  // ===== 컨텐츠 컨테이너 =====
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  // ===== 제목 섹션 =====
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  menuName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  ratingContainer: {
    marginLeft: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b35',
  },

  // ===== 메인 메뉴 =====
  mainMenu: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
    fontWeight: '600',
  },

  // ===== 위치 섹션 =====
  locationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // ===== 카테고리 섹션 =====
  categorySection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },

  // ===== 섹션 제목 =====
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    marginTop: 5,
  },

  // ===== 사장님 소개 =====
  introSection: {
    marginBottom: 30,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555555',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },

  // ===== 메뉴 섹션 =====
  menuSection: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 18,
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  menuArrow: {
    fontSize: 20,
    color: '#cccccc',
    alignSelf: 'center',
  },

  // ===== 메뉴 상세 페이지 전용 =====
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 15,
  },
  menuDescription: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 20,
  },

  // 리뷰 작성 버튼
  writeReviewButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30,
  },
  writeReviewText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // ===== 맛 프로필 =====
  tasteProfileSection: {
    marginBottom: 30,
  },
  tasteProfileContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
  },
  tasteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tasteLabel: {
    fontSize: 14,
    color: '#333333',
    width: 60,
    fontWeight: '600',
  },
  tasteBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  tasteProgress: {
    height: '100%',
    borderRadius: 4,
  },
  tasteScore: {
    fontSize: 14,
    color: '#666666',
    width: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // ===== 리뷰 섹션 =====
  reviewsSection: {
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
  },
  reviewRating: {
    marginBottom: 8,
  },
  reviewStars: {
    fontSize: 14,
  },
  reviewComment: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },

  // ===== 반응형 디자인 =====
  ...(width < 350 && {
    restaurantName: {
      fontSize: 20,
    },
    menuName: {
      fontSize: 18,
    },
    price: {
      fontSize: 18,
    },
    menuItemName: {
      fontSize: 14,
    },
  }),
});

export default styles;