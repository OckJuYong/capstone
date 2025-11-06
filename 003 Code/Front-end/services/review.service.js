/**
 * 리뷰 서비스
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

export const createReview = async (restaurantId, reviewData) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Create Review');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('✍️ API: Create Review');
    const result = await api.post(
      API_CONFIG.ENDPOINTS.REVIEW.CREATE(restaurantId),
      reviewData
    );
    return result;
  } catch (error) {
    console.error('❌ Create review failed:', error);
    throw error;
  }
};

export const updateReview = async (reviewId, content) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Update Review');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('✏️ API: Update Review');
    const result = await api.put(API_CONFIG.ENDPOINTS.REVIEW.UPDATE(reviewId), { content });
    return result;
  } catch (error) {
    console.error('❌ Update review failed:', error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Delete Review');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('🗑️ API: Delete Review');
    await api.delete(API_CONFIG.ENDPOINTS.REVIEW.DELETE(reviewId));
    return { success: true };
  } catch (error) {
    console.error('❌ Delete review failed:', error);
    throw error;
  }
};

export default {
  createReview,
  updateReview,
  deleteReview,
};
