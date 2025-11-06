/**
 * 추천 시스템 서비스
 * GPS + 사용자 유사도 기반 하이브리드 추천
 */

import {
  calculateDistance,
  calculateHybridScore,
  filterRestaurantsByDistance,
  filterByUserPreferences,
  getCollaborativeRecommendations,
  weightedRandomSelection,
  generateRecommendationReason,
  formatDistance
} from '../lib/recommendationUtils';

import {
  mockRestaurants,
  allUsers,
  currentUserProfile
} from '../data/mockRecommendationData';

/**
 * GPS + 사용자 유사도 기반 랜덤 추천
 * @param {Object} params - 추천 파라미터
 * @param {number} params.userLat - 사용자 위도
 * @param {number} params.userLon - 사용자 경도
 * @param {Object} params.selections - 사용자 선택지 { mood, taste, temperature }
 * @param {number} params.radius - 검색 반경 (km, 기본 3km)
 * @param {number} params.count - 추천 개수 (기본 3개)
 * @returns {Promise<Array>} 추천 음식점 배열
 */
export const getHybridRecommendations = async ({
  userLat,
  userLon,
  selections = {},
  radius = 3,
  count = 3
}) => {
  try {
    console.log('🎯 추천 시작:', { userLat, userLon, selections, radius });

    // 1단계: GPS 기반 필터링 (반경 내 음식점)
    const nearbyRestaurants = filterRestaurantsByDistance(
      mockRestaurants,
      userLat,
      userLon,
      radius
    );

    console.log(`📍 반경 ${radius}km 내 음식점: ${nearbyRestaurants.length}개`);

    if (nearbyRestaurants.length === 0) {
      // 반경 내 음식점이 없으면 반경 확대
      const expandedRestaurants = filterRestaurantsByDistance(
        mockRestaurants,
        userLat,
        userLon,
        radius * 2 // 반경 2배 확대
      );

      console.log(`📍 반경 확대 ${radius * 2}km: ${expandedRestaurants.length}개`);

      if (expandedRestaurants.length === 0) {
        throw new Error('주변에 추천할 음식점이 없습니다.');
      }

      return await processRecommendations(
        expandedRestaurants,
        userLat,
        userLon,
        selections,
        count
      );
    }

    // 2단계: 추천 처리
    return await processRecommendations(
      nearbyRestaurants,
      userLat,
      userLon,
      selections,
      count
    );

  } catch (error) {
    console.error('❌ 추천 에러:', error);
    throw error;
  }
};

/**
 * 추천 처리 로직
 */
const processRecommendations = async (
  restaurants,
  userLat,
  userLon,
  selections,
  count
) => {
  // 2-1단계: 사용자 선택지 기반 필터링
  let filteredRestaurants = restaurants;

  if (selections && Object.keys(selections).length > 0) {
    const preferenceFiltered = filterByUserPreferences(restaurants, selections);

    console.log(`🎨 선호도 필터링: ${preferenceFiltered.length}개`);

    // 선호도 필터링 결과가 너무 적으면 전체 사용
    if (preferenceFiltered.length >= 3) {
      filteredRestaurants = preferenceFiltered;
    } else {
      console.log('⚠️ 선호도 필터링 결과가 적어 전체 음식점 사용');
    }
  }

  // 3단계: 협업 필터링 (사용자 유사도 기반 추천)
  const collaborativeRecommendations = getCollaborativeRecommendations(
    currentUserProfile.id,
    allUsers,
    5 // 상위 5명의 유사 사용자
  );

  console.log(`👥 협업 필터링 추천: ${collaborativeRecommendations.length}개`);

  // 4단계: 하이브리드 스코어 계산
  const scoredRestaurants = filteredRestaurants.map(restaurant => {
    // 협업 필터링에서 해당 음식점의 스코어 찾기
    const collabScore = collaborativeRecommendations.find(
      rec => rec.restaurantId === restaurant.id.toString()
    );

    const collaborativeScore = collabScore
      ? Math.min(100, collabScore.avgScore * 20) // 5점 만점을 100점으로 변환
      : 30; // 협업 필터링 데이터가 없으면 기본 30점

    // 하이브리드 스코어 계산 (GPS + 유사도 + 평점)
    const finalScore = calculateHybridScore(
      restaurant,
      userLat,
      userLon,
      collaborativeScore,
      {
        similarity: 0.5, // 유사도 가중치 50%
        distance: 0.3,   // 거리 가중치 30%
        rating: 0.2      // 평점 가중치 20%
      }
    );

    return {
      ...restaurant,
      matchPercentage: finalScore,
      collaborativeScore,
      isCollaborative: !!collabScore
    };
  });

  // 5단계: 스코어 기준 정렬
  const sortedRestaurants = scoredRestaurants
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  console.log('📊 상위 5개 음식점 스코어:');
  sortedRestaurants.slice(0, 5).forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.name} - ${r.matchPercentage}점 (거리: ${r.distanceText})`);
  });

  // 6단계: 가중치 기반 무작위 선택 (상위 15개 중에서)
  const topCandidates = sortedRestaurants.slice(0, Math.min(15, sortedRestaurants.length));
  const selectedRestaurants = weightedRandomSelection(topCandidates, count);

  // 7단계: 추천 이유 생성
  const finalRecommendations = selectedRestaurants.map((restaurant, index) => ({
    ...restaurant,
    matchReason: generateRecommendationReason(
      restaurant,
      restaurant.matchPercentage,
      restaurant.isCollaborative
    ),
    rank: index + 1
  }));

  console.log(`✅ 최종 추천: ${finalRecommendations.length}개`);

  return finalRecommendations;
};

/**
 * 사용자 유사도 정보 가져오기 (디버깅용)
 */
export const getUserSimilarities = () => {
  const similarities = allUsers
    .filter(user => user.id !== currentUserProfile.id)
    .map(user => {
      const similarity = calculateCosineSimilarity(
        currentUserProfile.orderHistory,
        user.orderHistory
      );

      return {
        userId: user.id,
        userName: user.name,
        similarity: (similarity * 100).toFixed(1) + '%'
      };
    })
    .sort((a, b) => parseFloat(b.similarity) - parseFloat(a.similarity));

  return similarities;
};

/**
 * 간단한 코사인 유사도 계산 (임포트 대신 로컬 구현)
 */
const calculateCosineSimilarity = (userA, userB) => {
  const commonRestaurants = Object.keys(userA).filter(id => userB.hasOwnProperty(id));

  if (commonRestaurants.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  commonRestaurants.forEach(restaurantId => {
    const ratingA = userA[restaurantId];
    const ratingB = userB[restaurantId];

    dotProduct += ratingA * ratingB;
    magnitudeA += ratingA * ratingA;
    magnitudeB += ratingB * ratingB;
  });

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};
