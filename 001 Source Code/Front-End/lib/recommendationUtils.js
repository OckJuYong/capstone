/**
 * 추천 시스템 유틸리티 함수
 * GPS 기반 거리 계산 및 사용자 유사도 기반 협업 필터링
 */

/**
 * Haversine 공식을 사용한 두 GPS 좌표 간 거리 계산
 * @param {number} lat1 - 첫 번째 위치의 위도
 * @param {number} lon1 - 첫 번째 위치의 경도
 * @param {number} lat2 - 두 번째 위치의 위도
 * @param {number} lon2 - 두 번째 위치의 경도
 * @returns {number} 거리 (km)
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // km
};

/**
 * 각도를 라디안으로 변환
 */
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * 거리를 사용자 친화적인 문자열로 변환
 * @param {number} distance - 거리 (km)
 * @returns {string} "1.2km" 형식의 문자열
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * 코사인 유사도를 사용한 사용자 간 유사도 계산
 * @param {Array} userA - 사용자 A의 주문 벡터 [restaurantId: rating]
 * @param {Array} userB - 사용자 B의 주문 벡터 [restaurantId: rating]
 * @returns {number} 유사도 (0-1 사이 값)
 */
export const calculateCosineSimilarity = (userA, userB) => {
  // 공통으로 주문한 음식점 찾기
  const commonRestaurants = Object.keys(userA).filter(id => userB.hasOwnProperty(id));

  if (commonRestaurants.length === 0) {
    return 0; // 공통 주문 없음
  }

  // 벡터 내적 계산
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

/**
 * 자카드 유사도를 사용한 사용자 간 유사도 계산 (간단한 버전)
 * @param {Array} userAOrders - 사용자 A가 주문한 음식점 ID 배열
 * @param {Array} userBOrders - 사용자 B가 주문한 음식점 ID 배열
 * @returns {number} 유사도 (0-1 사이 값)
 */
export const calculateJaccardSimilarity = (userAOrders, userBOrders) => {
  const setA = new Set(userAOrders);
  const setB = new Set(userBOrders);

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
};

/**
 * 협업 필터링: 유사한 사용자들이 좋아하는 음식점 찾기
 * @param {string} currentUserId - 현재 사용자 ID
 * @param {Array} allUsers - 모든 사용자 데이터 배열
 * @param {number} topN - 상위 N명의 유사 사용자
 * @returns {Array} 추천 음식점 ID 배열 (스코어 포함)
 */
export const getCollaborativeRecommendations = (currentUserId, allUsers, topN = 5) => {
  const currentUser = allUsers.find(u => u.id === currentUserId);

  if (!currentUser) {
    return [];
  }

  // 모든 다른 사용자와 유사도 계산
  const similarities = allUsers
    .filter(user => user.id !== currentUserId)
    .map(user => ({
      userId: user.id,
      similarity: calculateCosineSimilarity(currentUser.orderHistory, user.orderHistory),
      orders: user.orderHistory
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN); // 상위 N명 선택

  // 유사한 사용자들이 주문한 음식점 중 현재 사용자가 아직 주문하지 않은 것들
  const recommendations = {};
  const currentUserRestaurants = Object.keys(currentUser.orderHistory);

  similarities.forEach(({ similarity, orders }) => {
    Object.keys(orders).forEach(restaurantId => {
      if (!currentUserRestaurants.includes(restaurantId)) {
        if (!recommendations[restaurantId]) {
          recommendations[restaurantId] = {
            restaurantId,
            score: 0,
            count: 0
          };
        }

        // 유사도 가중치를 적용한 평점 누적
        recommendations[restaurantId].score += orders[restaurantId] * similarity;
        recommendations[restaurantId].count += 1;
      }
    });
  });

  // 스코어로 정렬
  return Object.values(recommendations)
    .map(rec => ({
      ...rec,
      avgScore: rec.score / rec.count
    }))
    .sort((a, b) => b.avgScore - a.avgScore);
};

/**
 * GPS + 유사도 하이브리드 추천 스코어 계산
 * @param {Object} restaurant - 음식점 정보
 * @param {number} userLat - 사용자 위도
 * @param {number} userLon - 사용자 경도
 * @param {number} collaborativeScore - 협업 필터링 스코어 (0-100)
 * @param {Object} weights - 가중치 { similarity, distance, rating }
 * @returns {number} 최종 스코어 (0-100)
 */
export const calculateHybridScore = (
  restaurant,
  userLat,
  userLon,
  collaborativeScore = 0,
  weights = { similarity: 0.5, distance: 0.3, rating: 0.2 }
) => {
  // 1. 거리 스코어 (가까울수록 높은 점수)
  const distance = calculateDistance(userLat, userLon, restaurant.lat, restaurant.lng);
  const maxDistance = 5; // 5km 이상은 0점
  const distanceScore = Math.max(0, (1 - distance / maxDistance) * 100);

  // 2. 평점 스코어 (5점 만점을 100점 만점으로 변환)
  const ratingScore = (restaurant.rating / 5) * 100;

  // 3. 협업 필터링 스코어 (이미 0-100 범위)
  const similarityScore = collaborativeScore;

  // 가중치 적용한 최종 스코어
  const finalScore =
    (similarityScore * weights.similarity) +
    (distanceScore * weights.distance) +
    (ratingScore * weights.rating);

  return Math.round(finalScore);
};

/**
 * 거리 기반 필터링 (반경 내 음식점만 선택)
 * @param {Array} restaurants - 모든 음식점 배열
 * @param {number} userLat - 사용자 위도
 * @param {number} userLon - 사용자 경도
 * @param {number} radius - 반경 (km)
 * @returns {Array} 필터링된 음식점 배열 (거리 정보 포함)
 */
export const filterRestaurantsByDistance = (restaurants, userLat, userLon, radius = 3) => {
  return restaurants
    .map(restaurant => {
      const distance = calculateDistance(userLat, userLon, restaurant.lat, restaurant.lng);
      return {
        ...restaurant,
        distance,
        distanceText: formatDistance(distance)
      };
    })
    .filter(restaurant => restaurant.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * 사용자 선택지 기반 필터링 (맛, 분위기 등)
 * @param {Array} restaurants - 음식점 배열
 * @param {Object} selections - 사용자 선택 { mood, taste, temperature }
 * @returns {Array} 필터링된 음식점 배열
 */
export const filterByUserPreferences = (restaurants, selections) => {
  return restaurants.filter(restaurant => {
    let match = true;

    // 맛 필터링
    if (selections.taste) {
      const tasteMapping = {
        'sweet': ['디저트', '카페', '케이크', '아이스크림', '달달'],
        'spicy': ['매운', '치킨', '떡볶이', '마라', '불닭'],
        'salty': ['짠', '김치', '젓갈', '장아찌'],
        'rich': ['크림', '파스타', '버터', '치즈', '느끼'],
        'fresh': ['샐러드', '담백', '채소', '회', '초밥']
      };

      const keywords = tasteMapping[selections.taste] || [];
      const nameMatch = keywords.some(keyword =>
        restaurant.name.includes(keyword) || restaurant.cuisine?.includes(keyword)
      );

      match = match && nameMatch;
    }

    // 분위기 필터링
    if (selections.mood) {
      const moodMapping = {
        'heavy': ['한식', '중식', '고기', '찜', '탕'],
        'light': ['샐러드', '카페', '브런치', '일식'],
        'snack': ['치킨', '피자', '햄버거', '디저트', '분식'],
        'comfort': ['한식', '가정식', '백반', '찌개']
      };

      const keywords = moodMapping[selections.mood] || [];
      const cuisineMatch = keywords.some(keyword =>
        restaurant.cuisine?.includes(keyword) || restaurant.name.includes(keyword)
      );

      match = match && cuisineMatch;
    }

    // 온도 필터링 (뜨거운/차가운)
    if (selections.temperature && selections.temperature !== 'room') {
      const tempMapping = {
        'hot': ['찌개', '탕', '국', '뜨거운', '따뜻한', '치킨', '피자'],
        'cold': ['회', '샐러드', '냉면', '아이스크림', '차가운']
      };

      const keywords = tempMapping[selections.temperature] || [];
      const tempMatch = keywords.some(keyword =>
        restaurant.name.includes(keyword) || restaurant.cuisine?.includes(keyword)
      );

      match = match && tempMatch;
    }

    return match;
  });
};

/**
 * 가중치 기반 무작위 선택 (Fisher-Yates Shuffle 변형)
 * @param {Array} items - 아이템 배열 (score 속성 필요)
 * @param {number} count - 선택할 개수
 * @returns {Array} 무작위로 선택된 아이템들
 */
export const weightedRandomSelection = (items, count) => {
  if (items.length === 0) {
    return [];
  }

  // 스코어 기반 확률 계산
  const totalScore = items.reduce((sum, item) => sum + (item.score || item.matchPercentage || 50), 0);

  const selected = [];
  const remaining = [...items];

  for (let i = 0; i < Math.min(count, items.length); i++) {
    // 가중치 기반 무작위 선택
    let random = Math.random() * totalScore;
    let selectedIndex = 0;

    for (let j = 0; j < remaining.length; j++) {
      random -= (remaining[j].score || remaining[j].matchPercentage || 50);
      if (random <= 0) {
        selectedIndex = j;
        break;
      }
    }

    selected.push(remaining[selectedIndex]);
    remaining.splice(selectedIndex, 1);
  }

  return selected;
};

/**
 * 추천 이유 생성
 * @param {Object} restaurant - 음식점 정보
 * @param {number} matchPercentage - 일치도 (0-100)
 * @param {boolean} isCollaborative - 협업 필터링 기반 여부
 * @returns {string} 추천 이유 텍스트
 */
export const generateRecommendationReason = (restaurant, matchPercentage, isCollaborative = false) => {
  const reasons = [];

  if (isCollaborative) {
    reasons.push('비슷한 취향의 사용자들이 좋아한');
  }

  if (matchPercentage >= 90) {
    reasons.push('당신의 입맛에 완벽하게 맞는');
  } else if (matchPercentage >= 80) {
    reasons.push('당신의 입맛과 잘 맞는');
  } else if (matchPercentage >= 70) {
    reasons.push('당신이 좋아할 만한');
  }

  if (restaurant.distance && restaurant.distance < 1) {
    reasons.push('가까운 거리의');
  }

  if (restaurant.rating >= 4.5) {
    reasons.push('높은 평점을 받은');
  }

  if (reasons.length === 0) {
    return `추천 ${restaurant.cuisine || '음식'}`;
  }

  return reasons.join(', ') + ` ${restaurant.cuisine || '음식점'}!`;
};
