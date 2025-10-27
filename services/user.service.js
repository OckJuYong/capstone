/**
 * 사용자 서비스
 *
 * 사용자 정보 관련 API 호출
 * - 내 정보 조회/수정/삭제
 * - 맛 프로필 관리
 * - 메뉴 추천
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

// Mock 데이터
const MOCK_USER_INFO = {
  id: 1,
  name: '홍길동',
  email: 'user@example.com',
  nickname: '길동이',
  address: '서울시 강남구',
  phoneNumber: '010-1234-5678',
  userTaste: {
    spicy: 3.5,
    umami: 4.0,
    sour: 2.0,
    sweet: 3.0,
    salty: 4.5,
    bitter: 1.5,
  },
};

/**
 * 내 정보 조회
 */
export const getMyInfo = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get My Info');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_USER_INFO;
    }

    console.log('👤 API: Get My Info');
    const userInfo = await api.get(API_CONFIG.ENDPOINTS.USER.ME);
    return userInfo;
  } catch (error) {
    console.error('❌ Get my info failed:', error);
    throw error;
  }
};

/**
 * 내 정보 수정
 */
export const updateMyInfo = async (updateData) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Update My Info');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...MOCK_USER_INFO, ...updateData };
    }

    console.log('✏️ API: Update My Info');
    const result = await api.put(API_CONFIG.ENDPOINTS.USER.UPDATE_ME, updateData);
    return result;
  } catch (error) {
    console.error('❌ Update my info failed:', error);
    throw error;
  }
};

/**
 * 맛 프로필 조회
 */
export const getMyTastes = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get My Tastes');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_USER_INFO.userTaste;
    }

    console.log('👅 API: Get My Tastes');
    const tastes = await api.get(API_CONFIG.ENDPOINTS.USER.MY_TASTES);
    return tastes;
  } catch (error) {
    console.error('❌ Get my tastes failed:', error);
    throw error;
  }
};

/**
 * 맛 프로필 수정
 */
export const updateMyTastes = async (tastes) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Update My Tastes');
      await new Promise(resolve => setTimeout(resolve, 500));
      return tastes;
    }

    console.log('✏️ API: Update My Tastes');
    const result = await api.put(API_CONFIG.ENDPOINTS.USER.UPDATE_TASTES, tastes);
    return result;
  } catch (error) {
    console.error('❌ Update my tastes failed:', error);
    throw error;
  }
};

/**
 * 메뉴 추천 (Qdrant 기반)
 */
export const getRecommendations = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Recommendations');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          restaurant: '맛있는 식당',
          menu: '불고기 정식',
          similarityScore: 0.95,
          reviewCount: 42,
        },
      ];
    }

    console.log('🎯 API: Get Recommendations');
    const recommendations = await api.get(API_CONFIG.ENDPOINTS.USER.RECOMMENDATIONS);
    return recommendations;
  } catch (error) {
    console.error('❌ Get recommendations failed:', error);
    throw error;
  }
};

export default {
  getMyInfo,
  updateMyInfo,
  getMyTastes,
  updateMyTastes,
  getRecommendations,
};
