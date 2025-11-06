/**
 * 식당 서비스
 *
 * 식당 관련 API 호출
 * - 식당 목록 조회
 * - 식당 상세 정보
 * - 메뉴 목록 조회
 * - 리뷰 조회
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

// Mock 데이터 (개발용)
const MOCK_RESTAURANTS = [
  {
    restaurantId: 1,
    restaurantName: '메종 크림 파스타',
    restaurantAddress: '서울시 강남구 테헤란로 123',
    rating: 4.8,
    image: 'https://via.placeholder.com/150x150',
    tags: ['매콤함', '크리미함'],
  },
  {
    restaurantId: 2,
    restaurantName: '스시로',
    restaurantAddress: '서울시 서초구 반포대로 456',
    rating: 4.7,
    image: 'https://via.placeholder.com/150x150',
    tags: ['신선함', '고소함'],
  },
  {
    restaurantId: 3,
    restaurantName: '치킨마루',
    restaurantAddress: '서울시 송파구 송파대로 789',
    rating: 4.6,
    image: 'https://via.placeholder.com/150x150',
    tags: ['바삭함', '고소함'],
  },
];

const MOCK_RESTAURANT_DETAIL = {
  restaurantId: 1,
  name: '메종 크림 파스타',
  address: '서울시 강남구 테헤란로 123',
  number: '02-1234-5678',
  time: '10:00 - 22:00',
  introduce: '신선한 재료로 만든 맛있는 파스타',
  rating: 4.8,
};

const MOCK_MENUS = [
  {
    id: 1,
    name: '크림 파스타',
    price: 15000,
    restaurantName: '메종 크림 파스타',
    image: 'https://via.placeholder.com/80x80',
  },
  {
    id: 2,
    name: '토마토 파스타',
    price: 14000,
    restaurantName: '메종 크림 파스타',
    image: 'https://via.placeholder.com/80x80',
  },
  {
    id: 3,
    name: '알리오 올리오',
    price: 13000,
    restaurantName: '메종 크림 파스타',
    image: 'https://via.placeholder.com/80x80',
  },
];

/**
 * 식당 목록 조회
 * @returns {Promise<Array>} 식당 목록
 */
export const getRestaurants = async () => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Restaurants');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_RESTAURANTS;
    }

    // 실제 API 호출
    console.log('🏪 API: Get Restaurants');
    const restaurants = await api.get(API_CONFIG.ENDPOINTS.RESTAURANT.LIST);
    return restaurants;
  } catch (error) {
    console.error('❌ Get restaurants failed:', error);
    throw error;
  }
};

/**
 * 식당 상세 정보 조회
 * @param {number} restaurantId - 식당 ID
 * @returns {Promise<Object>} 식당 상세 정보
 */
export const getRestaurantDetail = async (restaurantId) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Restaurant Detail');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...MOCK_RESTAURANT_DETAIL,
        restaurantId,
      };
    }

    // 실제 API 호출
    console.log('🏪 API: Get Restaurant Detail');
    const restaurant = await api.get(API_CONFIG.ENDPOINTS.RESTAURANT.DETAIL(restaurantId));
    return restaurant;
  } catch (error) {
    console.error('❌ Get restaurant detail failed:', error);
    throw error;
  }
};

/**
 * 식당 메뉴 목록 조회
 * @param {number} restaurantId - 식당 ID
 * @returns {Promise<Array>} 메뉴 목록
 */
export const getRestaurantMenus = async (restaurantId) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Restaurant Menus');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_MENUS;
    }

    // 실제 API 호출
    console.log('🍽️ API: Get Restaurant Menus');
    const menus = await api.get(API_CONFIG.ENDPOINTS.RESTAURANT.MENUS(restaurantId));
    return menus;
  } catch (error) {
    console.error('❌ Get restaurant menus failed:', error);
    throw error;
  }
};

/**
 * 식당 리뷰 목록 조회
 * @param {number} restaurantId - 식당 ID
 * @returns {Promise<Array>} 리뷰 목록
 */
export const getRestaurantReviews = async (restaurantId) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Restaurant Reviews');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          reviewId: 1,
          content: '정말 맛있었습니다!',
          authorNickname: '길동이',
          menuId: 1,
          menuName: '크림 파스타',
          restaurantId,
          restaurantName: '메종 크림 파스타',
        },
      ];
    }

    // 실제 API 호출
    console.log('💬 API: Get Restaurant Reviews');
    const reviews = await api.get(API_CONFIG.ENDPOINTS.RESTAURANT.REVIEWS(restaurantId));
    return reviews;
  } catch (error) {
    console.error('❌ Get restaurant reviews failed:', error);
    throw error;
  }
};

/**
 * 카테고리별 식당 필터링 (클라이언트 사이드)
 * @param {Array} restaurants - 식당 목록
 * @param {string} category - 카테고리 ID
 * @returns {Array} 필터링된 식당 목록
 */
export const filterRestaurantsByCategory = (restaurants, category) => {
  if (!category || category === 'all') {
    return restaurants;
  }

  return restaurants.filter(restaurant => {
    return restaurant.category === category;
  });
};

/**
 * 거리순 정렬 (클라이언트 사이드)
 * @param {Array} restaurants - 식당 목록
 * @param {number} userLat - 사용자 위도
 * @param {number} userLon - 사용자 경도
 * @returns {Array} 정렬된 식당 목록
 */
export const sortRestaurantsByDistance = (restaurants, userLat, userLon) => {
  return restaurants;
};

/**
 * 평점순 정렬 (클라이언트 사이드)
 * @param {Array} restaurants - 식당 목록
 * @returns {Array} 정렬된 식당 목록
 */
export const sortRestaurantsByRating = (restaurants) => {
  return [...restaurants].sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

// Export all functions
export default {
  getRestaurants,
  getRestaurantDetail,
  getRestaurantMenus,
  getRestaurantReviews,
  filterRestaurantsByCategory,
  sortRestaurantsByDistance,
  sortRestaurantsByRating,
};
