/**
 * 추천 시스템을 위한 목업 데이터
 * - 레스토랑 데이터 (GPS 좌표 포함)
 * - 사용자 프로필 및 주문 이력
 */

// 서울 중심 (강남역 근처)
const SEOUL_CENTER = {
  lat: 37.4979,
  lng: 127.0276
};

/**
 * 레스토랑 목업 데이터 (GPS 좌표 포함)
 * 강남역 중심으로 반경 5km 이내 분포
 */
export const mockRestaurants = [
  {
    id: 1,
    name: '메종 크림 파스타',
    cuisine: '양식',
    lat: 37.4979,
    lng: 127.0276,
    rating: 4.8,
    deliveryTime: '25-35분',
    deliveryFee: '3,000원',
    tags: ['크림', '파스타', '느끼', '양식'],
    image: 'https://via.placeholder.com/120x120/8b5cf6/ffffff?text=파스타',
  },
  {
    id: 2,
    name: '불타는 매운 치킨',
    cuisine: '치킨',
    lat: 37.5012,
    lng: 127.0395,
    rating: 4.6,
    deliveryTime: '30-40분',
    deliveryFee: '2,000원',
    tags: ['매운', '치킨', '뜨거운', '간식'],
    image: 'https://via.placeholder.com/120x120/ef4444/ffffff?text=치킨',
  },
  {
    id: 3,
    name: '도쿄 스시',
    cuisine: '일식',
    lat: 37.4950,
    lng: 127.0330,
    rating: 4.9,
    deliveryTime: '20-30분',
    deliveryFee: '4,000원',
    tags: ['회', '초밥', '차가운', '신선', '담백'],
    image: 'https://via.placeholder.com/120x120/10b981/ffffff?text=스시',
  },
  {
    id: 4,
    name: '할머니 손맛 백반',
    cuisine: '한식',
    lat: 37.5020,
    lng: 127.0250,
    rating: 4.7,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['한식', '가정식', '백반', '찌개', '편안한', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/f59e0b/ffffff?text=백반',
  },
  {
    id: 5,
    name: '달콤 디저트 카페',
    cuisine: '카페',
    lat: 37.4985,
    lng: 127.0300,
    rating: 4.5,
    deliveryTime: '15-25분',
    deliveryFee: '1,500원',
    tags: ['디저트', '케이크', '달달', '카페', '차가운'],
    image: 'https://via.placeholder.com/120x120/ec4899/ffffff?text=디저트',
  },
  {
    id: 6,
    name: '마라 샹궈',
    cuisine: '중식',
    lat: 37.5040,
    lng: 127.0320,
    rating: 4.4,
    deliveryTime: '35-45분',
    deliveryFee: '3,500원',
    tags: ['마라', '매운', '중식', '뜨거운', '든든한'],
    image: 'https://via.placeholder.com/120x120/dc2626/ffffff?text=마라',
  },
  {
    id: 7,
    name: '프레시 샐러드 바',
    cuisine: '샐러드',
    lat: 37.4960,
    lng: 127.0285,
    rating: 4.3,
    deliveryTime: '20-30분',
    deliveryFee: '2,000원',
    tags: ['샐러드', '채소', '신선', '담백', '차가운', '가벼운'],
    image: 'https://via.placeholder.com/120x120/22c55e/ffffff?text=샐러드',
  },
  {
    id: 8,
    name: '김치찌개 전문점',
    cuisine: '한식',
    lat: 37.5005,
    lng: 127.0260,
    rating: 4.8,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['한식', '찌개', '김치', '뜨거운', '편안한', '든든한'],
    image: 'https://via.placeholder.com/120x120/f97316/ffffff?text=찌개',
  },
  {
    id: 9,
    name: '프리미엄 피자',
    cuisine: '피자',
    lat: 37.4995,
    lng: 127.0340,
    rating: 4.6,
    deliveryTime: '30-40분',
    deliveryFee: '3,000원',
    tags: ['피자', '치즈', '뜨거운', '간식', '느끼'],
    image: 'https://via.placeholder.com/120x120/3b82f6/ffffff?text=피자',
  },
  {
    id: 10,
    name: '냉면 명가',
    cuisine: '한식',
    lat: 37.5030,
    lng: 127.0290,
    rating: 4.7,
    deliveryTime: '20-30분',
    deliveryFee: '2,000원',
    tags: ['냉면', '차가운', '한식', '담백', '가벼운'],
    image: 'https://via.placeholder.com/120x120/06b6d4/ffffff?text=냉면',
  },
  {
    id: 11,
    name: '수제 버거 하우스',
    cuisine: '햄버거',
    lat: 37.4970,
    lng: 127.0310,
    rating: 4.5,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['햄버거', '간식', '느끼', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/eab308/ffffff?text=버거',
  },
  {
    id: 12,
    name: '떡볶이 천국',
    cuisine: '분식',
    lat: 37.5010,
    lng: 127.0270,
    rating: 4.4,
    deliveryTime: '20-30분',
    deliveryFee: '1,500원',
    tags: ['떡볶이', '매운', '분식', '간식', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/ef4444/ffffff?text=떡볶이',
  },
  {
    id: 13,
    name: '통삼겹 전문점',
    cuisine: '한식',
    lat: 37.4990,
    lng: 127.0315,
    rating: 4.8,
    deliveryTime: '35-45분',
    deliveryFee: '3,500원',
    tags: ['삼겹살', '고기', '한식', '든든한', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/78350f/ffffff?text=삼겹',
  },
  {
    id: 14,
    name: '아이스크림 팩토리',
    cuisine: '디저트',
    lat: 37.4975,
    lng: 127.0295,
    rating: 4.6,
    deliveryTime: '15-25분',
    deliveryFee: '2,000원',
    tags: ['아이스크림', '디저트', '달달', '차가운', '간식'],
    image: 'https://via.placeholder.com/120x120/a78bfa/ffffff?text=아이스',
  },
  {
    id: 15,
    name: '순두부찌개',
    cuisine: '한식',
    lat: 37.5025,
    lng: 127.0305,
    rating: 4.7,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['순두부', '찌개', '한식', '뜨거운', '편안한', '담백'],
    image: 'https://via.placeholder.com/120x120/fb923c/ffffff?text=순두부',
  },
  {
    id: 16,
    name: '브런치 카페',
    cuisine: '카페',
    lat: 37.4965,
    lng: 127.0280,
    rating: 4.5,
    deliveryTime: '20-30분',
    deliveryFee: '2,000원',
    tags: ['브런치', '카페', '가벼운', '달달'],
    image: 'https://via.placeholder.com/120x120/fbbf24/ffffff?text=브런치',
  },
  {
    id: 17,
    name: '불고기 정식',
    cuisine: '한식',
    lat: 37.5015,
    lng: 127.0285,
    rating: 4.8,
    deliveryTime: '30-40분',
    deliveryFee: '3,000원',
    tags: ['불고기', '고기', '한식', '든든한', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/92400e/ffffff?text=불고기',
  },
  {
    id: 18,
    name: '해산물 탕',
    cuisine: '한식',
    lat: 37.4980,
    lng: 127.0325,
    rating: 4.6,
    deliveryTime: '35-45분',
    deliveryFee: '4,000원',
    tags: ['해산물', '탕', '한식', '뜨거운', '든든한'],
    image: 'https://via.placeholder.com/120x120/0891b2/ffffff?text=해물탕',
  },
  {
    id: 19,
    name: '치즈 돈까스',
    cuisine: '일식',
    lat: 37.5000,
    lng: 127.0350,
    rating: 4.7,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['돈까스', '치즈', '일식', '느끼', '뜨거운'],
    image: 'https://via.placeholder.com/120x120/facc15/ffffff?text=돈까스',
  },
  {
    id: 20,
    name: '베트남 쌀국수',
    cuisine: '아시안',
    lat: 37.4955,
    lng: 127.0265,
    rating: 4.5,
    deliveryTime: '25-35분',
    deliveryFee: '2,500원',
    tags: ['쌀국수', '아시안', '담백', '뜨거운', '가벼운'],
    image: 'https://via.placeholder.com/120x120/84cc16/ffffff?text=쌀국수',
  }
];

/**
 * 사용자 목업 데이터
 * orderHistory: { restaurantId: rating } 형태
 */
export const mockUsers = [
  {
    id: 'user1',
    name: '김철수',
    orderHistory: {
      1: 5,  // 메종 크림 파스타 - 5점
      3: 4,  // 도쿄 스시 - 4점
      5: 5,  // 달콤 디저트 카페 - 5점
      7: 3,  // 프레시 샐러드 바 - 3점
      9: 4,  // 프리미엄 피자 - 4점
      11: 5, // 수제 버거 하우스 - 5점
      16: 4, // 브런치 카페 - 4점
    }
  },
  {
    id: 'user2',
    name: '이영희',
    orderHistory: {
      2: 5,  // 불타는 매운 치킨 - 5점
      4: 4,  // 할머니 손맛 백반 - 4점
      6: 5,  // 마라 샹궈 - 5점
      8: 4,  // 김치찌개 전문점 - 4점
      12: 5, // 떡볶이 천국 - 5점
      13: 4, // 통삼겹 전문점 - 4점
      17: 5, // 불고기 정식 - 5점
    }
  },
  {
    id: 'user3',
    name: '박민수',
    orderHistory: {
      1: 4,  // 메종 크림 파스타 - 4점
      3: 5,  // 도쿄 스시 - 5점
      5: 4,  // 달콤 디저트 카페 - 4점
      9: 5,  // 프리미엄 피자 - 5점
      11: 4, // 수제 버거 하우스 - 4점
      14: 5, // 아이스크림 팩토리 - 5점
      19: 4, // 치즈 돈까스 - 4점
    }
  },
  {
    id: 'user4',
    name: '최지은',
    orderHistory: {
      4: 5,  // 할머니 손맛 백반 - 5점
      8: 4,  // 김치찌개 전문점 - 4점
      10: 5, // 냉면 명가 - 5점
      13: 4, // 통삼겹 전문점 - 4점
      15: 5, // 순두부찌개 - 5점
      17: 4, // 불고기 정식 - 4점
      18: 5, // 해산물 탕 - 5점
    }
  },
  {
    id: 'user5',
    name: '정우진',
    orderHistory: {
      2: 4,  // 불타는 매운 치킨 - 4점
      6: 5,  // 마라 샹궈 - 5점
      12: 4, // 떡볶이 천국 - 4점
      13: 5, // 통삼겹 전문점 - 5점
      17: 4, // 불고기 정식 - 4점
      18: 5, // 해산물 탕 - 5점
    }
  },
  {
    id: 'user6',
    name: '한소희',
    orderHistory: {
      3: 5,  // 도쿄 스시 - 5점
      5: 4,  // 달콤 디저트 카페 - 4점
      7: 5,  // 프레시 샐러드 바 - 5점
      10: 4, // 냉면 명가 - 4점
      14: 5, // 아이스크림 팩토리 - 5점
      16: 4, // 브런치 카페 - 4점
      20: 5, // 베트남 쌀국수 - 5점
    }
  }
];

/**
 * 현재 사용자 (테스트용)
 * user1, user3과 비슷한 취향 (양식, 일식, 디저트 선호)
 */
export const currentUserProfile = {
  id: 'currentUser',
  name: '테스트 사용자',
  orderHistory: {
    1: 5,  // 메종 크림 파스타 - 5점
    3: 4,  // 도쿄 스시 - 4점
    9: 5,  // 프리미엄 피자 - 5점
    16: 4, // 브런치 카페 - 4점
  }
};

/**
 * 전체 사용자 목록 (현재 사용자 포함)
 */
export const allUsers = [...mockUsers, currentUserProfile];
