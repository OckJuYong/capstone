/**
 * 쿠폰 서비스
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

export const getAvailableCoupons = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Available Coupons');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 1,
          name: '5000원 할인 쿠폰',
          discountAmount: 5000,
          validUntil: '2025-12-31T23:59:59',
        },
      ];
    }

    console.log('🎫 API: Get Available Coupons');
    const coupons = await api.get(API_CONFIG.ENDPOINTS.COUPON.AVAILABLE);
    return coupons;
  } catch (error) {
    console.error('❌ Get available coupons failed:', error);
    throw error;
  }
};

export const claimCoupon = async (couponId) => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Claim Coupon');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }

    console.log('🎁 API: Claim Coupon');
    const result = await api.post(API_CONFIG.ENDPOINTS.COUPON.CLAIM(couponId));
    return result;
  } catch (error) {
    console.error('❌ Claim coupon failed:', error);
    throw error;
  }
};

export const getMyCoupons = async () => {
  try {
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get My Coupons');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [];
    }

    console.log('🎫 API: Get My Coupons');
    const coupons = await api.get(API_CONFIG.ENDPOINTS.COUPON.MY_COUPONS);
    return coupons;
  } catch (error) {
    console.error('❌ Get my coupons failed:', error);
    throw error;
  }
};

export default {
  getAvailableCoupons,
  claimCoupon,
  getMyCoupons,
};
