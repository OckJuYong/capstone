/**
 * API 설정 파일
 *
 * 환경 변수를 읽어와서 API 설정을 제공합니다.
 * Mock 모드와 실제 API 모드를 쉽게 전환할 수 있습니다.
 */

// Expo 환경 변수 읽기
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';
const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000', 10);

export const API_CONFIG = {
  // 백엔드 API Base URL
  BASE_URL: API_URL,

  // Mock 모드 사용 여부
  // true: Mock 데이터 사용 (백엔드 없이 개발 가능)
  // false: 실제 백엔드 API 호출
  USE_MOCK,

  // API 요청 타임아웃 (밀리초)
  TIMEOUT: API_TIMEOUT,

  // API 엔드포인트
  ENDPOINTS: {
    // 인증
    AUTH: {
      LOGIN: '/api/v1/login',
      SIGNUP: '/api/v1/signup',
      OWNER_LOGIN: '/api/v1/owner/login',
      OWNER_SIGNUP: '/api/v1/owner/signup',
      ADMIN_LOGIN: '/api/v1/admin/login',
    },

    // 사용자
    USER: {
      ME: '/api/v1/users/me',
      UPDATE_ME: '/api/v1/users/me',
      DELETE_ME: '/api/v1/users/me',
      MY_TASTES: '/api/v1/users/me/tastes',
      UPDATE_TASTES: '/api/v1/users/me/tastes',
      RECOMMENDATIONS: '/api/v1/users/me/recommendations',
      MY_DIBS: '/api/v1/users/me/dibs',
      MY_ORDERS: '/api/v1/users/me/orders',
      MY_REVIEWS: '/api/v1/users/me/reviews',
      MY_COUPONS: '/api/v1/users/me/coupons',
    },

    // 오너
    OWNER: {
      ME: '/api/v1/owner/me',
      MY_RESTAURANTS: '/api/v1/owner/me/restaurants',
      RESTAURANT_MENUS: (restaurantId) => `/api/v1/owner/restaurants/${restaurantId}/menus`,
      MENUS: '/api/v1/owner/menus',
      MENU: (menuId) => `/api/v1/owner/menus/${menuId}`,
      RESTAURANT_ORDERS: (restaurantId) => `/api/v1/owner/restaurants/${restaurantId}/orders`,
      ORDER_ACCEPT: (orderId) => `/api/v1/owner/orders/${orderId}/accept`,
      ORDER_COMPLETE: (orderId) => `/api/v1/owner/orders/${orderId}/complete`,
      ORDER_REJECT: (orderId) => `/api/v1/owner/orders/${orderId}/reject`,
    },

    // 관리자
    ADMIN: {
      RESTAURANTS: '/api/v1/admin/restaurants',
      NOTICES: '/api/v1/admin/notices',
      NOTICE: (noticeId) => `/api/v1/admin/notices/${noticeId}`,
      COUPONS: '/api/v1/admin/coupons',
      COUPON: (couponId) => `/api/v1/admin/coupons/${couponId}`,
      COUPON_ACTIVATE: (couponId) => `/api/v1/admin/coupons/${couponId}/activate`,
      COUPON_DEACTIVATE: (couponId) => `/api/v1/admin/coupons/${couponId}/deactivate`,
      COUPONS_BY_RESTAURANT: (restaurantId) => `/api/v1/admin/coupons/restaurant/${restaurantId}`,
    },

    // 식당 (공개)
    RESTAURANT: {
      LIST: '/api/v1/restaurants',
      DETAIL: (restaurantId) => `/api/v1/restaurants/${restaurantId}`,
      MENUS: (restaurantId) => `/api/v1/restaurants/${restaurantId}/menus`,
      REVIEWS: (restaurantId) => `/api/v1/restaurants/${restaurantId}/reviews`,
    },

    // 주문
    ORDER: {
      CREATE: '/api/v1/orders',
      MY_ORDERS: '/api/v1/orders/me',
      DETAIL: (orderId) => `/api/v1/orders/${orderId}`,
      CANCEL: (orderId) => `/api/v1/orders/${orderId}`,
    },

    // 리뷰
    REVIEW: {
      CREATE: (restaurantId) => `/api/v1/restaurants/${restaurantId}/reviews`,
      UPDATE: (reviewId) => `/api/v1/reviews/${reviewId}`,
      DELETE: (reviewId) => `/api/v1/reviews/${reviewId}`,
      BY_RESTAURANT: (restaurantId) => `/api/v1/restaurants/${restaurantId}/reviews`,
    },

    // 찜 (Dibs)
    DIBS: {
      ADD: (restaurantId) => `/api/v1/dibs/restaurants/${restaurantId}`,
      REMOVE: (restaurantId) => `/api/v1/dibs/restaurants/${restaurantId}`,
    },

    // 공지사항
    NOTICE: {
      LIST: '/api/v1/notices',
      DETAIL: (noticeId) => `/api/v1/notices/${noticeId}`,
    },

    // 쿠폰
    COUPON: {
      AVAILABLE: '/api/v1/coupons/available',
      CLAIM: (couponId) => `/api/v1/coupons/${couponId}/claim`,
      MY_COUPONS: '/api/v1/coupons/me',
      MY_ACTIVE_COUPONS: '/api/v1/coupons/me/active',
      DETAIL: (userCouponId) => `/api/v1/coupons/me/${userCouponId}`,
    },
  },
};

// API 설정 정보 출력 (개발 디버깅용)
export const printAPIConfig = () => {
  console.log('========================================');
  console.log('🔧 API Configuration');
  console.log('========================================');
  console.log(`Base URL: ${API_CONFIG.BASE_URL}`);
  console.log(`Mock Mode: ${API_CONFIG.USE_MOCK ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`Timeout: ${API_CONFIG.TIMEOUT}ms`);
  console.log('========================================');
};

export default API_CONFIG;
