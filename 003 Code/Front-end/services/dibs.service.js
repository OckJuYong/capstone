/**
 * 찜(Dibs) 서비스
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

export const addDibs = async (restaurantId) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Add Dibs');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('❤️ API: Add Dibs');
    const result = await api.post(API_CONFIG.ENDPOINTS.DIBS.ADD(restaurantId));
    return result;
  } catch (error) {
    console.error('❌ Add dibs failed:', error);
    throw error;
  }
};

export const removeDibs = async (restaurantId) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Remove Dibs');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('💔 API: Remove Dibs');
    await api.delete(API_CONFIG.ENDPOINTS.DIBS.REMOVE(restaurantId));
    return { success: true };
  } catch (error) {
    console.error('❌ Remove dibs failed:', error);
    throw error;
  }
};

export const getMyDibs = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get My Dibs');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          restaurantId: 1,
          restaurantName: '메종 크림 파스타',
          restaurantAddress: '서울시 강남구',
          rating: 4.8,
        },
        {
          restaurantId: 2,
          restaurantName: '피자나라',
          restaurantAddress: '서울시 서초구',
          rating: 4.5,
        },
      ];
    }

    console.log('❤️ API: Get My Dibs');
    const dibs = await api.get(API_CONFIG.ENDPOINTS.USER.MY_DIBS);
    return dibs;
  } catch (error) {
    console.error('❌ Get my dibs failed:', error);
    throw error;
  }
};

export default {
  addDibs,
  removeDibs,
  getMyDibs,
};
