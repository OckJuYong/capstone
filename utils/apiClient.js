/**
 * API 클라이언트
 *
 * Axios 기반 HTTP 요청 클라이언트
 * - JWT 토큰 자동 첨부
 * - 에러 핸들링
 * - Request/Response 인터셉터
 * - Mock 모드 지원
 */

import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { tokenManager } from './storage';

/**
 * Axios 인스턴스 생성
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request 인터셉터
 * - JWT 토큰 자동 첨부
 * - 요청 로깅
 */
apiClient.interceptors.request.use(
  async (config) => {
    // JWT 토큰 가져오기
    const token = await tokenManager.get();

    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      // 토큰에서 공백과 개행 문자 제거 (이중 안전장치)
      const cleanToken = token.trim();
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }

    // 요청 로깅 (개발 환경에서만)
    if (__DEV__) {
      console.log('════════════════════════════════════════');
      console.log('🚀 API REQUEST');
      console.log('════════════════════════════════════════');
      console.log('📍 URL:', `${config.baseURL}${config.url}`);
      console.log('📤 Method:', config.method?.toUpperCase());
      console.log('🔑 Has Token:', !!token);

      // 헤더 로그 (민감한 정보는 일부만 표시)
      if (config.headers.Authorization) {
        const authHeader = config.headers.Authorization;
        const tokenPreview = authHeader.substring(0, 20) + '...' + authHeader.substring(authHeader.length - 10);
        console.log('🔐 Authorization:', tokenPreview);
      }

      // 요청 데이터 로그
      if (config.data) {
        console.log('📦 Request Data:', JSON.stringify(config.data, null, 2));
      }

      // Query Parameters 로그
      if (config.params) {
        console.log('🔍 Query Params:', config.params);
      }

      console.log('════════════════════════════════════════\n');
    }

    return config;
  },
  (error) => {
    console.error('════════════════════════════════════════');
    console.error('❌ REQUEST ERROR');
    console.error('════════════════════════════════════════');
    console.error('Error:', error.message);
    console.error('════════════════════════════════════════\n');
    return Promise.reject(error);
  }
);

/**
 * Response 인터셉터
 * - 응답 로깅
 * - 에러 핸들링
 * - 토큰 만료 처리
 */
apiClient.interceptors.response.use(
  (response) => {
    // 응답 로깅 (개발 환경에서만)
    if (__DEV__) {
      console.log('════════════════════════════════════════');
      console.log('✅ API RESPONSE');
      console.log('════════════════════════════════════════');
      console.log('📍 URL:', `${response.config.baseURL}${response.config.url}`);
      console.log('📥 Method:', response.config.method?.toUpperCase());
      console.log('📊 Status:', response.status, response.statusText);

      // 응답 데이터 로그
      if (response.data) {
        // 데이터가 배열이면 개수와 첫 번째 항목만 표시
        if (Array.isArray(response.data)) {
          console.log('📦 Response Data (Array):', `${response.data.length}개 항목`);
          if (response.data.length > 0) {
            console.log('📦 First Item:', JSON.stringify(response.data[0], null, 2));
          }
        }
        // 문자열이면 일부만 표시
        else if (typeof response.data === 'string') {
          const preview = response.data.length > 100
            ? response.data.substring(0, 100) + '...'
            : response.data;
          console.log('📦 Response Data (String):', preview);
        }
        // 객체면 전체 표시
        else {
          console.log('📦 Response Data:', JSON.stringify(response.data, null, 2));
        }
      }

      console.log('════════════════════════════════════════\n');
    }

    return response;
  },
  async (error) => {
    // 에러 정보 추출
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // 에러 로깅
    console.error('════════════════════════════════════════');
    console.error('❌ API ERROR');
    console.error('════════════════════════════════════════');
    console.error('📍 URL:', originalRequest?.url);
    console.error('📤 Method:', originalRequest?.method?.toUpperCase());
    console.error('📊 Status:', status || 'NO_RESPONSE');
    console.error('💬 Message:', message);

    // 요청 데이터 로그 (에러 디버깅용)
    if (originalRequest?.data) {
      console.error('📦 Request Data:', originalRequest.data);
    }

    // 응답 에러 데이터
    if (error.response?.data) {
      console.error('📦 Error Response:', JSON.stringify(error.response.data, null, 2));
    }

    console.error('════════════════════════════════════════\n');

    // 401 Unauthorized (토큰 만료 또는 유효하지 않음)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰이 만료되었으면 로그아웃 처리
      await tokenManager.remove();
      console.log('🔒 Token expired, please login again');
    }

    // 403 Forbidden (권한 없음)
    if (status === 403) {
      console.error('🚫 Access denied: Insufficient permissions');
    }

    // 404 Not Found
    if (status === 404) {
      console.error('🔍 Not found: Resource does not exist');
    }

    // 500 Internal Server Error
    if (status === 500) {
      console.error('💥 Server error: Please try again later');
    }

    return Promise.reject(error);
  }
);

/**
 * API 요청 래퍼 함수들
 */
export const api = {
  /**
   * GET 요청
   * @param {string} url - API 엔드포인트
   * @param {Object} config - Axios 설정
   */
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  /**
   * POST 요청
   * @param {string} url - API 엔드포인트
   * @param {Object} data - 요청 본문
   * @param {Object} config - Axios 설정
   */
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  /**
   * PUT 요청
   * @param {string} url - API 엔드포인트
   * @param {Object} data - 요청 본문
   * @param {Object} config - Axios 설정
   */
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  /**
   * DELETE 요청
   * @param {string} url - API 엔드포인트
   * @param {Object} config - Axios 설정
   */
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  /**
   * PATCH 요청
   * @param {string} url - API 엔드포인트
   * @param {Object} data - 요청 본문
   * @param {Object} config - Axios 설정
   */
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};

/**
 * API 에러 핸들링
 * @param {Error} error - Axios 에러 객체
 */
const handleAPIError = (error) => {
  if (error.response) {
    // 서버가 응답을 반환했지만 상태 코드가 2xx가 아님
    const { status, data } = error.response;
    return {
      status,
      message: data?.message || 'An error occurred',
      data: data || null,
    };
  } else if (error.request) {
    // 요청이 전송되었지만 응답을 받지 못함 (네트워크 에러)
    return {
      status: 0,
      message: 'Network error: Please check your connection',
      data: null,
    };
  } else {
    // 요청 설정 중 에러 발생
    return {
      status: -1,
      message: error.message || 'An unexpected error occurred',
      data: null,
    };
  }
};

/**
 * API 연결 테스트
 * @returns {Promise<boolean>} 연결 성공 여부
 */
export const testAPIConnection = async () => {
  try {
    console.log('🔌 Testing API connection...');
    console.log(`Target: ${API_CONFIG.BASE_URL}`);

    const response = await axios.get(`${API_CONFIG.BASE_URL}/api/v1/restaurants`, {
      timeout: 5000,
    });

    console.log('✅ API connection successful!');
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    return false;
  }
};

export default api;
