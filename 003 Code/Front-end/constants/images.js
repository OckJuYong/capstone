/**
 * 이미지 상수
 *
 * 앱에서 사용하는 기본 이미지 URL들을 관리합니다.
 */

// 기본 식당 이미지 (백엔드에 이미지가 없을 때 사용)
export const DEFAULT_RESTAURANT_IMAGE = 'https://placehold.co/400x300/f3f4f6/8b5cf6?text=%F0%9F%8D%BD%EF%B8%8F+%EC%8B%9D%EB%8B%B9';

// 기본 메뉴 이미지
export const DEFAULT_MENU_IMAGE = 'https://placehold.co/400x300/f3f4f6/8b5cf6?text=%F0%9F%8D%B4+%EB%A9%94%EB%89%B4';

// 기본 사용자 프로필 이미지
export const DEFAULT_PROFILE_IMAGE = 'https://placehold.co/200x200/f3f4f6/8b5cf6?text=%F0%9F%91%A4';

// 크기별 기본 식당 이미지
export const DEFAULT_RESTAURANT_IMAGES = {
  small: 'https://placehold.co/100x100/f3f4f6/8b5cf6?text=%F0%9F%8D%BD%EF%B8%8F',
  medium: 'https://placehold.co/200x200/f3f4f6/8b5cf6?text=%F0%9F%8D%BD%EF%B8%8F',
  large: 'https://placehold.co/400x300/f3f4f6/8b5cf6?text=%F0%9F%8D%BD%EF%B8%8F',
};

// 카테고리별 기본 이미지
export const CATEGORY_IMAGES = {
  korean: 'https://placehold.co/400x300/fef3c7/f59e0b?text=%F0%9F%8D%9A+%ED%95%9C%EC%8B%9D',
  chinese: 'https://placehold.co/400x300/fecaca/dc2626?text=%F0%9F%A5%A2+%EC%A4%91%EC%8B%9D',
  japanese: 'https://placehold.co/400x300/dbeafe/2563eb?text=%F0%9F%8D%A3+%EC%9D%BC%EC%8B%9D',
  western: 'https://placehold.co/400x300/e9d5ff/9333ea?text=%F0%9F%8D%9D+%EC%96%91%EC%8B%9D',
  cafe: 'https://placehold.co/400x300/fce7f3/ec4899?text=%E2%98%95+%EC%B9%B4%ED%8E%98',
  chicken: 'https://placehold.co/400x300/fed7aa/ea580c?text=%F0%9F%8D%97+%EC%B9%98%ED%82%A8',
  pizza: 'https://placehold.co/400x300/fef08a/ca8a04?text=%F0%9F%8D%95+%ED%94%BC%EC%9E%90',
  fastfood: 'https://placehold.co/400x300/fca5a5/dc2626?text=%F0%9F%8D%94+%ED%8C%A8%EC%8A%A4%ED%8A%B8%ED%91%B8%EB%93%9C',
};

/**
 * 이미지 URL을 가져오는 헬퍼 함수
 * @param {string|null|undefined} imageUrl - 백엔드에서 받은 이미지 URL
 * @param {string} size - 이미지 크기 (small, medium, large)
 * @returns {string} 유효한 이미지 URL
 */
export const getImageUrl = (imageUrl, size = 'medium') => {
  // 이미지 URL이 유효한 경우 그대로 반환
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl.trim();
  }

  // 이미지가 없으면 기본 이미지 반환
  return DEFAULT_RESTAURANT_IMAGES[size] || DEFAULT_RESTAURANT_IMAGE;
};

/**
 * 카테고리에 맞는 이미지 URL을 가져오는 함수
 * @param {string|null|undefined} imageUrl - 백엔드에서 받은 이미지 URL
 * @param {string} category - 카테고리 (korean, chinese, japanese 등)
 * @returns {string} 유효한 이미지 URL
 */
export const getCategoryImageUrl = (imageUrl, category) => {
  // 이미지 URL이 유효한 경우 그대로 반환
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl.trim();
  }

  // 카테고리별 기본 이미지 반환
  return CATEGORY_IMAGES[category] || DEFAULT_RESTAURANT_IMAGE;
};

export default {
  DEFAULT_RESTAURANT_IMAGE,
  DEFAULT_MENU_IMAGE,
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_RESTAURANT_IMAGES,
  CATEGORY_IMAGES,
  getImageUrl,
  getCategoryImageUrl,
};
