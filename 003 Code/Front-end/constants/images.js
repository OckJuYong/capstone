/**
 * 이미지 상수
 *
 * 앱에서 사용하는 기본 이미지 URL들을 관리합니다.
 * Unsplash CDN (무료 고품질 이미지) 사용
 */

// 백엔드 식당 ID → 카테고리 매핑 (식당 이름 기반 분류)
const RESTAURANT_CATEGORY_MAP = {
  // 카페/커피
  1: 'cafe', 2: 'cafe', 3: 'cafe', 4: 'cafe', 5: 'cafe', 6: 'cafe', 8: 'cafe',
  124: 'cafe', 130: 'cafe', 151: 'cafe', 173: 'cafe', 189: 'cafe', 206: 'cafe',
  237: 'cafe', 252: 'cafe', 253: 'cafe', 254: 'cafe', 255: 'cafe', 256: 'cafe',
  257: 'cafe', 258: 'cafe', 261: 'cafe', 264: 'cafe', 265: 'cafe', 266: 'cafe',
  284: 'cafe', 289: 'cafe', 293: 'cafe', 294: 'cafe', 295: 'cafe', 300: 'cafe',
  303: 'cafe', 307: 'cafe', 308: 'cafe', 309: 'cafe', 312: 'cafe', 313: 'cafe',
  316: 'cafe', 317: 'cafe', 322: 'cafe', 323: 'cafe', 324: 'cafe', 325: 'cafe',

  // 일식 (초밥, 라멘, 돈카츠, 우동 등)
  7: 'japanese', 10: 'japanese', 36: 'japanese', 38: 'japanese', 41: 'japanese',
  46: 'japanese', 71: 'japanese', 72: 'japanese', 82: 'japanese', 83: 'japanese',
  84: 'japanese', 89: 'japanese', 107: 'japanese', 132: 'japanese', 135: 'japanese',
  138: 'japanese', 141: 'japanese', 158: 'japanese', 224: 'japanese', 231: 'japanese',
  276: 'japanese', 277: 'japanese', 280: 'japanese', 288: 'japanese', 310: 'japanese',

  // 중식 (짬뽕, 마라탕, 만두, 양꼬치 등)
  16: 'chinese', 31: 'chinese', 55: 'chinese', 66: 'chinese', 67: 'chinese',
  80: 'chinese', 86: 'chinese', 113: 'chinese', 115: 'chinese', 126: 'chinese',
  127: 'chinese', 129: 'chinese', 139: 'chinese', 145: 'chinese', 153: 'chinese',
  180: 'chinese', 182: 'chinese', 212: 'chinese', 250: 'chinese', 274: 'chinese',
  287: 'chinese', 314: 'chinese',

  // 치킨
  188: 'chicken', 190: 'chicken', 191: 'chicken', 223: 'chicken', 226: 'chicken',
  232: 'chicken', 243: 'chicken', 268: 'chicken', 272: 'chicken',

  // 피자
  94: 'pizza', 221: 'pizza', 246: 'pizza', 249: 'pizza', 278: 'pizza',

  // 패스트푸드/버거/샌드위치
  11: 'fastfood', 12: 'fastfood', 35: 'fastfood', 70: 'fastfood', 77: 'fastfood',
  79: 'fastfood', 85: 'fastfood', 133: 'fastfood', 136: 'fastfood', 267: 'fastfood',

  // 양식 (파스타, 스테이크, 샐러드 등)
  26: 'western', 33: 'western', 43: 'western', 78: 'western', 88: 'western',
  103: 'western', 128: 'western', 248: 'western',

  // 한식 (기본값으로 나머지는 한식으로 분류)
};

// 음식 관련 실제 이미지 URLs (Unsplash CDN - 안정적이고 빠름)
const FOOD_IMAGES = {
  // 한식 (다양한 이미지)
  korean_1: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80', // 한식 테이블
  korean_2: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80', // 비빔밥
  korean_3: 'https://images.unsplash.com/photo-1583224874284-75b14e213e6a?w=400&q=80', // 김치
  korean_4: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', // 고기구이
  korean_5: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80', // 삼겹살/고기
  korean_6: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80', // 바베큐
  korean_7: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', // 찌개
  korean_8: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', // 음식 일반

  // 중식 (다양한 이미지)
  chinese_1: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80', // 중식
  chinese_2: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', // 면요리
  chinese_3: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80', // 만두
  chinese_4: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80', // 볶음밥
  chinese_5: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80', // 딤섬

  // 일식 (다양한 이미지)
  japanese_1: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', // 일식
  japanese_2: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80', // 초밥
  japanese_3: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', // 라멘
  japanese_4: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&q=80', // 우동
  japanese_5: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', // 사시미
  japanese_6: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', // 돈카츠

  // 양식 (다양한 이미지)
  western_1: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', // 레스토랑
  western_2: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80', // 파스타
  western_3: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80', // 스테이크
  western_4: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80', // 리조또
  western_5: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', // 샐러드
  western_6: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=80', // 그릴요리

  // 카페/디저트 (다양한 이미지)
  cafe_1: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', // 카페
  cafe_2: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', // 커피
  cafe_3: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80', // 케이크
  cafe_4: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80', // 마카롱
  cafe_5: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', // 라떼
  cafe_6: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80', // 브런치

  // 치킨 (다양한 이미지)
  chicken_1: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80', // 치킨
  chicken_2: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80', // 후라이드
  chicken_3: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=80', // 양념치킨
  chicken_4: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80', // 치킨윙

  // 피자 (다양한 이미지)
  pizza_1: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', // 피자
  pizza_2: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', // 페퍼로니
  pizza_3: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80', // 마르게리타
  pizza_4: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', // 피자 전체

  // 패스트푸드/버거 (다양한 이미지)
  burger_1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', // 버거
  burger_2: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', // 치즈버거
  burger_3: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', // 더블버거
  burger_4: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80', // 감자튀김
  burger_5: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80', // 버거세트

  // 기타/일반
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
  food_general: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
};

// 카테고리별 이미지 배열 (랜덤 선택용)
const CATEGORY_IMAGE_ARRAYS = {
  korean: [FOOD_IMAGES.korean_1, FOOD_IMAGES.korean_2, FOOD_IMAGES.korean_3, FOOD_IMAGES.korean_4, FOOD_IMAGES.korean_5, FOOD_IMAGES.korean_6, FOOD_IMAGES.korean_7, FOOD_IMAGES.korean_8],
  chinese: [FOOD_IMAGES.chinese_1, FOOD_IMAGES.chinese_2, FOOD_IMAGES.chinese_3, FOOD_IMAGES.chinese_4, FOOD_IMAGES.chinese_5],
  japanese: [FOOD_IMAGES.japanese_1, FOOD_IMAGES.japanese_2, FOOD_IMAGES.japanese_3, FOOD_IMAGES.japanese_4, FOOD_IMAGES.japanese_5, FOOD_IMAGES.japanese_6],
  western: [FOOD_IMAGES.western_1, FOOD_IMAGES.western_2, FOOD_IMAGES.western_3, FOOD_IMAGES.western_4, FOOD_IMAGES.western_5, FOOD_IMAGES.western_6],
  cafe: [FOOD_IMAGES.cafe_1, FOOD_IMAGES.cafe_2, FOOD_IMAGES.cafe_3, FOOD_IMAGES.cafe_4, FOOD_IMAGES.cafe_5, FOOD_IMAGES.cafe_6],
  chicken: [FOOD_IMAGES.chicken_1, FOOD_IMAGES.chicken_2, FOOD_IMAGES.chicken_3, FOOD_IMAGES.chicken_4],
  pizza: [FOOD_IMAGES.pizza_1, FOOD_IMAGES.pizza_2, FOOD_IMAGES.pizza_3, FOOD_IMAGES.pizza_4],
  fastfood: [FOOD_IMAGES.burger_1, FOOD_IMAGES.burger_2, FOOD_IMAGES.burger_3, FOOD_IMAGES.burger_4, FOOD_IMAGES.burger_5],
};

// 모든 음식 이미지 배열 (일반 랜덤용)
const ALL_FOOD_IMAGES = [
  ...CATEGORY_IMAGE_ARRAYS.korean,
  ...CATEGORY_IMAGE_ARRAYS.chinese,
  ...CATEGORY_IMAGE_ARRAYS.japanese,
  ...CATEGORY_IMAGE_ARRAYS.western,
  ...CATEGORY_IMAGE_ARRAYS.cafe,
  ...CATEGORY_IMAGE_ARRAYS.chicken,
  ...CATEGORY_IMAGE_ARRAYS.pizza,
  ...CATEGORY_IMAGE_ARRAYS.fastfood,
];

// 기본 식당 이미지 (백엔드에 이미지가 없을 때 사용)
export const DEFAULT_RESTAURANT_IMAGE = FOOD_IMAGES.restaurant;

// 기본 메뉴 이미지
export const DEFAULT_MENU_IMAGE = FOOD_IMAGES.food_general;

// 기본 사용자 프로필 이미지
export const DEFAULT_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80';

// 크기별 기본 식당 이미지
export const DEFAULT_RESTAURANT_IMAGES = {
  small: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&q=80',
  medium: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80',
  large: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
};

// 카테고리별 기본 이미지 (실제 음식 사진)
export const CATEGORY_IMAGES = {
  korean: FOOD_IMAGES.korean_1,
  chinese: FOOD_IMAGES.chinese_1,
  japanese: FOOD_IMAGES.japanese_1,
  western: FOOD_IMAGES.western_1,
  cafe: FOOD_IMAGES.cafe_1,
  chicken: FOOD_IMAGES.chicken_1,
  pizza: FOOD_IMAGES.pizza_1,
  fastfood: FOOD_IMAGES.burger_1,
};

// 추천 메뉴 이미지 배열 (순환 사용)
export const RECOMMENDED_MENU_IMAGES = [
  FOOD_IMAGES.western_2,
  FOOD_IMAGES.western_4,
  FOOD_IMAGES.korean_2,
  FOOD_IMAGES.japanese_2,
  FOOD_IMAGES.western_3,
  FOOD_IMAGES.chicken_1,
  FOOD_IMAGES.japanese_3,
  FOOD_IMAGES.cafe_3,
];

// 트렌딩 메뉴 이미지 배열
export const TRENDING_MENU_IMAGES = [
  FOOD_IMAGES.korean_4,
  FOOD_IMAGES.korean_5,
  FOOD_IMAGES.japanese_2,
  FOOD_IMAGES.pizza_1,
  FOOD_IMAGES.western_3,
  FOOD_IMAGES.japanese_3,
  FOOD_IMAGES.burger_1,
  FOOD_IMAGES.chinese_3,
];

// 음식 이미지 전체 내보내기
export { FOOD_IMAGES, CATEGORY_IMAGE_ARRAYS, ALL_FOOD_IMAGES, RESTAURANT_CATEGORY_MAP };

/**
 * 백엔드 식당 ID로 카테고리를 가져오는 함수
 * @param {number|string} restaurantId - 식당 ID
 * @returns {string} 카테고리 (korean, chinese, japanese 등)
 */
export const getCategoryByRestaurantId = (restaurantId) => {
  const numId = typeof restaurantId === 'string' ? parseInt(restaurantId, 10) || 0 : restaurantId || 0;
  return RESTAURANT_CATEGORY_MAP[numId] || 'korean'; // 기본값은 한식
};

/**
 * ID 기반으로 일관된 이미지를 선택하는 함수 (같은 ID면 항상 같은 이미지)
 * @param {number|string} id - 식당/메뉴 ID
 * @param {string} category - 카테고리 (선택사항, 없으면 ID로 자동 추론)
 * @returns {string} 이미지 URL
 */
export const getImageById = (id, category = null) => {
  const numId = typeof id === 'string' ? parseInt(id, 10) || 0 : id || 0;

  // 카테고리가 없으면 ID로 자동 추론
  const actualCategory = category || getCategoryByRestaurantId(numId);

  if (actualCategory && CATEGORY_IMAGE_ARRAYS[actualCategory]) {
    const images = CATEGORY_IMAGE_ARRAYS[actualCategory];
    return images[numId % images.length];
  }

  return ALL_FOOD_IMAGES[numId % ALL_FOOD_IMAGES.length];
};

/**
 * 이미지 URL을 가져오는 헬퍼 함수 (ID 기반 다양한 이미지)
 * @param {string|null|undefined} imageUrl - 백엔드에서 받은 이미지 URL
 * @param {string} size - 이미지 크기 (small, medium, large)
 * @param {number|string} id - 식당/메뉴 ID (다양한 이미지 선택용)
 * @returns {string} 유효한 이미지 URL
 */
export const getImageUrl = (imageUrl, size = 'medium', id = 0) => {
  // 이미지 URL이 유효한 경우 그대로 반환
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl.trim();
  }

  // ID 기반으로 다양한 이미지 반환
  return getImageById(id);
};

/**
 * 카테고리에 맞는 이미지 URL을 가져오는 함수 (ID 기반 다양한 이미지)
 * @param {string|null|undefined} imageUrl - 백엔드에서 받은 이미지 URL
 * @param {string} category - 카테고리 (korean, chinese, japanese 등)
 * @param {number|string} id - 식당/메뉴 ID (다양한 이미지 선택용)
 * @returns {string} 유효한 이미지 URL
 */
export const getCategoryImageUrl = (imageUrl, category, id = 0) => {
  // 이미지 URL이 유효한 경우 그대로 반환
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl.trim();
  }

  // 카테고리 + ID 기반으로 다양한 이미지 반환
  return getImageById(id, category);
};

/**
 * 메뉴 ID 기반으로 음식 이미지 가져오기
 * @param {number|string} menuId - 메뉴 ID
 * @param {string} category - 카테고리 (선택)
 * @returns {string} 이미지 URL
 */
export const getMenuImage = (menuId, category = null) => {
  return getImageById(menuId, category);
};

/**
 * 식당 ID 기반으로 식당 이미지 가져오기
 * @param {number|string} restaurantId - 식당 ID
 * @param {string} category - 카테고리 (선택)
 * @returns {string} 이미지 URL
 */
export const getRestaurantImage = (restaurantId, category = null) => {
  return getImageById(restaurantId, category);
};

export default {
  DEFAULT_RESTAURANT_IMAGE,
  DEFAULT_MENU_IMAGE,
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_RESTAURANT_IMAGES,
  CATEGORY_IMAGES,
  FOOD_IMAGES,
  CATEGORY_IMAGE_ARRAYS,
  ALL_FOOD_IMAGES,
  RESTAURANT_CATEGORY_MAP,
  getImageUrl,
  getCategoryImageUrl,
  getImageById,
  getMenuImage,
  getRestaurantImage,
  getCategoryByRestaurantId,
};
