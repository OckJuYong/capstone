/**
 * 주문 서비스
 *
 * 주문 관련 API 호출
 * - 주문 생성
 * - 주문 목록 조회
 * - 주문 상세 조회
 * - 주문 취소
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

// Mock 데이터 (개발용)
const MOCK_ORDERS = [
  {
    orderId: 1,
    totalPrice: 32000,
    status: 'COMPLETED',
    type: 'DELIVERY',
    createdAt: '2025-01-15T14:30:00',
    orderMenus: [
      {
        menuId: 1,
        menuName: '크림 파스타',
        menuPrice: 15000,
        quantity: 1,
      },
      {
        menuId: 2,
        menuName: '토마토 파스타',
        menuPrice: 14000,
        quantity: 1,
      },
    ],
  },
  {
    orderId: 2,
    totalPrice: 20500,
    status: 'COMPLETED',
    type: 'DELIVERY',
    createdAt: '2025-01-10T19:15:00',
    orderMenus: [
      {
        menuId: 3,
        menuName: '연어 세트',
        menuPrice: 18000,
        quantity: 1,
      },
    ],
  },
];

/**
 * 주문 생성
 * @param {Object} orderData - 주문 데이터
 * @param {string} orderData.orderType - 'DELIVERY' | 'TAKEAWAY' | 'DINE_IN'
 * @param {Array} orderData.orderMenus - [{ menuId, quantity }, ...]
 * @param {number} orderData.couponId - 쿠폰 ID (선택)
 * @returns {Promise<Object>} 생성된 주문 정보
 */
export const createOrder = async (orderData) => {
  try {
    const { orderType, orderMenus, couponId } = orderData;

    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Create Order');
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockOrder = {
        orderId: Date.now(),
        totalPrice: orderMenus.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'PENDING',
        type: orderType,
        createdAt: new Date().toISOString(),
        orderMenus,
      };

      return mockOrder;
    }

    // 실제 API 호출
    console.log('🛒 API: Create Order');
    const order = await api.post(API_CONFIG.ENDPOINTS.ORDER.CREATE, {
      orderType,
      orderMenus,
      couponId,
    });

    return order;
  } catch (error) {
    console.error('❌ Create order failed:', error);
    throw error;
  }
};

/**
 * 내 주문 목록 조회
 * @returns {Promise<Array>} 주문 목록
 */
export const getMyOrders = async () => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get My Orders');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ORDERS;
    }

    // 실제 API 호출
    console.log('📦 API: Get My Orders');
    const orders = await api.get(API_CONFIG.ENDPOINTS.ORDER.MY_ORDERS);
    return orders;
  } catch (error) {
    console.error('❌ Get my orders failed:', error);
    throw error;
  }
};

/**
 * 주문 상세 조회
 * @param {number} orderId - 주문 ID
 * @returns {Promise<Object>} 주문 상세 정보
 */
export const getOrderDetail = async (orderId) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Get Order Detail');
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ORDERS.find(order => order.orderId === orderId) || MOCK_ORDERS[0];
    }

    // 실제 API 호출
    console.log('📦 API: Get Order Detail');
    const order = await api.get(API_CONFIG.ENDPOINTS.ORDER.DETAIL(orderId));
    return order;
  } catch (error) {
    console.error('❌ Get order detail failed:', error);
    throw error;
  }
};

/**
 * 주문 취소
 * @param {number} orderId - 주문 ID
 * @returns {Promise<boolean>} 취소 성공 여부
 */
export const cancelOrder = async (orderId) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Cancel Order');
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    }

    // 실제 API 호출
    console.log('🚫 API: Cancel Order');
    await api.delete(API_CONFIG.ENDPOINTS.ORDER.CANCEL(orderId));
    return true;
  } catch (error) {
    console.error('❌ Cancel order failed:', error);
    throw error;
  }
};

/**
 * 주문 상태별 필터링 (클라이언트 사이드)
 * @param {Array} orders - 주문 목록
 * @param {string} status - 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
 * @returns {Array} 필터링된 주문 목록
 */
export const filterOrdersByStatus = (orders, status) => {
  if (!status) {
    return orders;
  }

  return orders.filter(order => order.status === status);
};

// Export all functions
export default {
  createOrder,
  getMyOrders,
  getOrderDetail,
  cancelOrder,
  filterOrdersByStatus,
};
