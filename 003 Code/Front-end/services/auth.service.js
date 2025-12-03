/**
 * 인증 서비스
 *
 * 사용자 인증 관련 API 호출
 * - 로그인 (일반 사용자, 오너, 관리자)
 * - 회원가입 (일반 사용자, 오너)
 * - 로그아웃
 */

import api from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';
import { tokenManager, userInfoManager, userRoleManager, clearAllAuthData } from '../utils/storage';

// Mock 데이터 (개발용)
const MOCK_USER = {
  id: 1,
  name: '홍길동',
  email: 'user@example.com',
  nickname: '길동이',
  address: '서울시 강남구',
  phoneNumber: '010-1234-5678',
};

const MOCK_TOKEN = 'mock_jwt_token_12345';

/**
 * 일반 사용자 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{token: string, user: Object}>}
 */
export const login = async (email, password) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Login');
      await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

      // Mock 토큰과 사용자 정보 저장
      await tokenManager.save(MOCK_TOKEN);
      await userInfoManager.save(MOCK_USER);
      await userRoleManager.save('USER');

      return {
        token: MOCK_TOKEN,
        user: MOCK_USER,
      };
    }

    // 실제 API 호출
    console.log('🔐 API: Login');
    const token = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });

    // 토큰 저장
    await tokenManager.save(token);
    await userRoleManager.save('USER');

    return {
      token,
      user: null,
    };
  } catch (error) {
    console.error('❌ Login failed:', error);
    throw error;
  }
};

/**
 * 일반 사용자 회원가입
 * @param {Object} signupData - 회원가입 데이터
 * @returns {Promise<{token: string, user: Object}>}
 */
export const signup = async (signupData) => {
  try {
    const {
      name,
      email,
      password,
      nickname,
      address,
      phoneNumber,
      userTaste, // { spicy, umami, sour, sweet, salty, bitter }
    } = signupData;

    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Signup');
      await new Promise(resolve => setTimeout(resolve, 500));

      const newUser = {
        ...MOCK_USER,
        name,
        email,
        nickname,
        address,
        phoneNumber,
      };

      await tokenManager.save(MOCK_TOKEN);
      await userInfoManager.save(newUser);
      await userRoleManager.save('USER');

      return {
        token: MOCK_TOKEN,
        user: newUser,
      };
    }

    // 실제 API 호출 - 회원가입
    console.log('📝 API: Signup');
    const signupResponse = await api.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, {
      name,
      email,
      password,
      nickname,
      address,
      phoneNumber,
      userTaste,
    });

    console.log('✅ 회원가입 완료, 자동 로그인 시도...');

    // 회원가입 성공 후 자동 로그인 (서버가 토큰을 반환하지 않으므로)
    const token = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });

    // 토큰 저장
    await tokenManager.save(token);
    await userRoleManager.save('USER');

    return {
      token,
      user: null, // 사용자 정보는 별도로 조회
    };
  } catch (error) {
    console.error('❌ Signup failed:', error);
    throw error;
  }
};

/**
 * 오너 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{token: string}>}
 */
export const ownerLogin = async (email, password) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Owner Login');
      await new Promise(resolve => setTimeout(resolve, 500));

      await tokenManager.save(MOCK_TOKEN);
      await userRoleManager.save('OWNER');

      return { token: MOCK_TOKEN };
    }

    // 실제 API 호출
    console.log('🔐 API: Owner Login');
    const token = await api.post(API_CONFIG.ENDPOINTS.AUTH.OWNER_LOGIN, {
      email,
      password,
    });

    await tokenManager.save(token);
    await userRoleManager.save('OWNER');

    return { token };
  } catch (error) {
    console.error('❌ Owner login failed:', error);
    throw error;
  }
};

/**
 * 오너 회원가입
 * @param {string} name - 이름
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{token: string}>}
 */
export const ownerSignup = async (name, email, password) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Owner Signup');
      await new Promise(resolve => setTimeout(resolve, 500));

      await tokenManager.save(MOCK_TOKEN);
      await userRoleManager.save('OWNER');

      return { token: MOCK_TOKEN };
    }

    // 실제 API 호출
    console.log('📝 API: Owner Signup');
    const token = await api.post(API_CONFIG.ENDPOINTS.AUTH.OWNER_SIGNUP, {
      name,
      email,
      password,
    });

    await tokenManager.save(token);
    await userRoleManager.save('OWNER');

    return { token };
  } catch (error) {
    console.error('❌ Owner signup failed:', error);
    throw error;
  }
};

/**
 * 관리자 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<{token: string}>}
 */
export const adminLogin = async (email, password) => {
  try {
    // Mock 모드
    if (API_CONFIG.USE_MOCK) {
      console.log('🎭 Mock Mode: Admin Login');
      await new Promise(resolve => setTimeout(resolve, 500));

      await tokenManager.save(MOCK_TOKEN);
      await userRoleManager.save('ADMIN');

      return { token: MOCK_TOKEN };
    }

    // 실제 API 호출
    console.log('🔐 API: Admin Login');
    const token = await api.post(API_CONFIG.ENDPOINTS.AUTH.ADMIN_LOGIN, {
      email,
      password,
    });

    await tokenManager.save(token);
    await userRoleManager.save('ADMIN');

    return { token };
  } catch (error) {
    console.error('❌ Admin login failed:', error);
    throw error;
  }
};

/**
 * 로그아웃
 * - 토큰 삭제
 * - 사용자 정보 삭제
 * - 로컬 스토리지 정리
 */
export const logout = async () => {
  try {
    console.log('👋 Logout');
    await clearAllAuthData();
    return true;
  } catch (error) {
    console.error('❌ Logout failed:', error);
    return false;
  }
};

/**
 * 자동 로그인 확인
 * - 저장된 토큰 확인
 * - 토큰 유효성 검증 (선택)
 * @returns {Promise<{isLoggedIn: boolean, token: string|null, role: string|null}>}
 */
export const checkAutoLogin = async () => {
  try {
    const token = await tokenManager.get();
    const role = await userRoleManager.get();
    const userInfo = await userInfoManager.get();

    if (token) {
      console.log('✅ Auto login: Token found');
      return {
        isLoggedIn: true,
        token,
        role,
        userInfo,
      };
    }

    console.log('❌ Auto login: No token found');
    return {
      isLoggedIn: false,
      token: null,
      role: null,
      userInfo: null,
    };
  } catch (error) {
    console.error('❌ Auto login check failed:', error);
    return {
      isLoggedIn: false,
      token: null,
      role: null,
      userInfo: null,
    };
  }
};

// Export all functions
export default {
  login,
  signup,
  ownerLogin,
  ownerSignup,
  adminLogin,
  logout,
  checkAutoLogin,
};
