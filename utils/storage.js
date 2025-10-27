/**
 * AsyncStorage 래퍼
 *
 * React Native의 AsyncStorage를 사용한 로컬 저장소 관리
 * JWT 토큰, 사용자 정보 등을 안전하게 저장/조회/삭제
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// 스토리지 키 상수
const STORAGE_KEYS = {
  JWT_TOKEN: '@mobisync:jwt_token',
  USER_INFO: '@mobisync:user_info',
  USER_ROLE: '@mobisync:user_role', // USER, OWNER, ADMIN
  REFRESH_TOKEN: '@mobisync:refresh_token',
  LAST_LOGIN: '@mobisync:last_login',
};

/**
 * JWT 토큰 관리
 */
export const tokenManager = {
  /**
   * 토큰 저장
   * @param {string} token - JWT 토큰
   */
  save: async (token) => {
    try {
      // 토큰에서 공백과 개행 문자 제거
      const cleanToken = token?.trim() || '';
      await AsyncStorage.setItem(STORAGE_KEYS.JWT_TOKEN, cleanToken);
      console.log('✅ Token saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Error saving token:', error);
      return false;
    }
  },

  /**
   * 토큰 조회
   * @returns {Promise<string|null>} JWT 토큰 또는 null
   */
  get: async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
      // 토큰이 있으면 공백과 개행 문자 제거
      return token?.trim() || null;
    } catch (error) {
      console.error('❌ Error getting token:', error);
      return null;
    }
  },

  /**
   * 토큰 삭제
   */
  remove: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
      console.log('✅ Token removed successfully');
      return true;
    } catch (error) {
      console.error('❌ Error removing token:', error);
      return false;
    }
  },

  /**
   * 토큰 존재 여부 확인
   * @returns {Promise<boolean>}
   */
  exists: async () => {
    const token = await tokenManager.get();
    return !!token;
  },
};

/**
 * 사용자 정보 관리
 */
export const userInfoManager = {
  /**
   * 사용자 정보 저장
   * @param {Object} userInfo - 사용자 정보 객체
   */
  save: async (userInfo) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
      console.log('✅ User info saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Error saving user info:', error);
      return false;
    }
  },

  /**
   * 사용자 정보 조회
   * @returns {Promise<Object|null>} 사용자 정보 객체 또는 null
   */
  get: async () => {
    try {
      const userInfo = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('❌ Error getting user info:', error);
      return null;
    }
  },

  /**
   * 사용자 정보 삭제
   */
  remove: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
      console.log('✅ User info removed successfully');
      return true;
    } catch (error) {
      console.error('❌ Error removing user info:', error);
      return false;
    }
  },
};

/**
 * 사용자 역할 관리
 */
export const userRoleManager = {
  /**
   * 사용자 역할 저장
   * @param {string} role - 'USER' | 'OWNER' | 'ADMIN'
   */
  save: async (role) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
      console.log(`✅ User role saved: ${role}`);
      return true;
    } catch (error) {
      console.error('❌ Error saving user role:', error);
      return false;
    }
  },

  /**
   * 사용자 역할 조회
   * @returns {Promise<string|null>} 'USER' | 'OWNER' | 'ADMIN' | null
   */
  get: async () => {
    try {
      const role = await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);
      return role;
    } catch (error) {
      console.error('❌ Error getting user role:', error);
      return null;
    }
  },

  /**
   * 사용자 역할 삭제
   */
  remove: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_ROLE);
      console.log('✅ User role removed successfully');
      return true;
    } catch (error) {
      console.error('❌ Error removing user role:', error);
      return false;
    }
  },
};

/**
 * 모든 인증 관련 데이터 삭제 (로그아웃)
 */
export const clearAllAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.JWT_TOKEN,
      STORAGE_KEYS.USER_INFO,
      STORAGE_KEYS.USER_ROLE,
      STORAGE_KEYS.REFRESH_TOKEN,
    ]);
    console.log('✅ All auth data cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing auth data:', error);
    return false;
  }
};

/**
 * 마지막 로그인 시간 관리
 */
export const lastLoginManager = {
  /**
   * 마지막 로그인 시간 저장
   */
  save: async () => {
    try {
      const timestamp = new Date().toISOString();
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_LOGIN, timestamp);
      return true;
    } catch (error) {
      console.error('❌ Error saving last login:', error);
      return false;
    }
  },

  /**
   * 마지막 로그인 시간 조회
   * @returns {Promise<string|null>} ISO 날짜 문자열 또는 null
   */
  get: async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LAST_LOGIN);
    } catch (error) {
      console.error('❌ Error getting last login:', error);
      return null;
    }
  },
};

/**
 * 전체 스토리지 정보 출력 (디버깅용)
 */
export const printStorageInfo = async () => {
  try {
    const token = await tokenManager.get();
    const userInfo = await userInfoManager.get();
    const role = await userRoleManager.get();
    const lastLogin = await lastLoginManager.get();

    console.log('========================================');
    console.log('📦 Storage Information');
    console.log('========================================');
    console.log(`JWT Token: ${token ? '✅ Exists' : '❌ Not found'}`);
    console.log(`User Info: ${userInfo ? '✅ Exists' : '❌ Not found'}`);
    console.log(`User Role: ${role || '❌ Not set'}`);
    console.log(`Last Login: ${lastLogin || '❌ Not set'}`);
    console.log('========================================');
  } catch (error) {
    console.error('❌ Error printing storage info:', error);
  }
};

// Export all
export default {
  tokenManager,
  userInfoManager,
  userRoleManager,
  clearAllAuthData,
  lastLoginManager,
  printStorageInfo,
  STORAGE_KEYS,
};
