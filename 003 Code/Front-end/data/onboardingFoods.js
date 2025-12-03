// data/onboardingFoods.js
// 온보딩용 음식 5지선다 데이터
// 각 음식에 맛 프로필 점수 (0~5)를 부여하여 사용자 선택 기반으로 입맛 분석

/**
 * 맛 프로필 구조:
 * - spicy: 매운맛 (0: 안매움 ~ 5: 극매움)
 * - salty: 짠맛
 * - sweet: 단맛
 * - sour: 신맛
 * - umami: 감칠맛
 * - bitter: 쓴맛
 */

export const FOOD_DATABASE = {
  // 한식 - 찌개/탕류
  kimchi_jjigae: {
    id: 'kimchi_jjigae',
    name: '김치찌개',
    emoji: '🍲',
    category: 'korean',
    taste: { spicy: 3.5, salty: 3.5, sweet: 0.5, sour: 2.0, umami: 4.0, bitter: 0 }
  },
  doenjang_jjigae: {
    id: 'doenjang_jjigae',
    name: '된장찌개',
    emoji: '🥘',
    category: 'korean',
    taste: { spicy: 1.0, salty: 4.0, sweet: 0.5, sour: 0.5, umami: 5.0, bitter: 1.0 }
  },
  sundubu: {
    id: 'sundubu',
    name: '순두부찌개',
    emoji: '🍲',
    category: 'korean',
    taste: { spicy: 3.0, salty: 3.0, sweet: 0.5, sour: 0.5, umami: 4.0, bitter: 0 }
  },
  budae_jjigae: {
    id: 'budae_jjigae',
    name: '부대찌개',
    emoji: '🍲',
    category: 'korean',
    taste: { spicy: 3.0, salty: 4.0, sweet: 1.0, sour: 0.5, umami: 4.5, bitter: 0 }
  },
  samgyetang: {
    id: 'samgyetang',
    name: '삼계탕',
    emoji: '🍗',
    category: 'korean',
    taste: { spicy: 0, salty: 2.5, sweet: 0.5, sour: 0, umami: 5.0, bitter: 0.5 }
  },

  // 한식 - 고기류
  samgyeopsal: {
    id: 'samgyeopsal',
    name: '삼겹살',
    emoji: '🥓',
    category: 'korean',
    taste: { spicy: 0.5, salty: 2.5, sweet: 0.5, sour: 0, umami: 4.5, bitter: 0 }
  },
  bulgogi: {
    id: 'bulgogi',
    name: '불고기',
    emoji: '🥩',
    category: 'korean',
    taste: { spicy: 1.0, salty: 3.0, sweet: 3.5, sour: 0.5, umami: 4.0, bitter: 0 }
  },
  galbi: {
    id: 'galbi',
    name: '갈비',
    emoji: '🍖',
    category: 'korean',
    taste: { spicy: 0.5, salty: 3.0, sweet: 3.0, sour: 0.5, umami: 5.0, bitter: 0 }
  },
  jokbal: {
    id: 'jokbal',
    name: '족발',
    emoji: '🦶',
    category: 'korean',
    taste: { spicy: 0, salty: 3.0, sweet: 0.5, sour: 0, umami: 4.5, bitter: 0 }
  },
  bossam: {
    id: 'bossam',
    name: '보쌈',
    emoji: '🥬',
    category: 'korean',
    taste: { spicy: 0.5, salty: 2.5, sweet: 0.5, sour: 1.0, umami: 4.0, bitter: 0 }
  },

  // 한식 - 면/밥류
  bibimbap: {
    id: 'bibimbap',
    name: '비빔밥',
    emoji: '🍚',
    category: 'korean',
    taste: { spicy: 2.5, salty: 2.5, sweet: 1.0, sour: 0.5, umami: 3.5, bitter: 0 }
  },
  kalguksu: {
    id: 'kalguksu',
    name: '칼국수',
    emoji: '🍜',
    category: 'korean',
    taste: { spicy: 0, salty: 3.0, sweet: 0.5, sour: 0, umami: 4.5, bitter: 0 }
  },
  naengmyeon: {
    id: 'naengmyeon',
    name: '냉면',
    emoji: '🍜',
    category: 'korean',
    taste: { spicy: 1.5, salty: 2.0, sweet: 1.0, sour: 3.5, umami: 3.0, bitter: 0 }
  },

  // 한식 - 분식
  tteokbokki: {
    id: 'tteokbokki',
    name: '떡볶이',
    emoji: '🍢',
    category: 'korean',
    taste: { spicy: 4.0, salty: 2.5, sweet: 2.5, sour: 0.5, umami: 3.0, bitter: 0 }
  },
  sundae: {
    id: 'sundae',
    name: '순대',
    emoji: '🌭',
    category: 'korean',
    taste: { spicy: 0, salty: 2.5, sweet: 0, sour: 0, umami: 4.0, bitter: 0.5 }
  },
  gimbap: {
    id: 'gimbap',
    name: '김밥',
    emoji: '🍙',
    category: 'korean',
    taste: { spicy: 0.5, salty: 2.5, sweet: 1.0, sour: 0.5, umami: 3.0, bitter: 0 }
  },

  // 중식
  jajangmyeon: {
    id: 'jajangmyeon',
    name: '짜장면',
    emoji: '🍝',
    category: 'chinese',
    taste: { spicy: 0.5, salty: 4.0, sweet: 2.0, sour: 0, umami: 4.5, bitter: 0.5 }
  },
  jjamppong: {
    id: 'jjamppong',
    name: '짬뽕',
    emoji: '🍜',
    category: 'chinese',
    taste: { spicy: 4.0, salty: 3.5, sweet: 0.5, sour: 0.5, umami: 4.5, bitter: 0 }
  },
  tangsuyuk: {
    id: 'tangsuyuk',
    name: '탕수육',
    emoji: '🍖',
    category: 'chinese',
    taste: { spicy: 0, salty: 2.0, sweet: 4.0, sour: 3.5, umami: 3.0, bitter: 0 }
  },
  malatang: {
    id: 'malatang',
    name: '마라탕',
    emoji: '🌶️',
    category: 'chinese',
    taste: { spicy: 5.0, salty: 3.5, sweet: 0.5, sour: 0.5, umami: 4.0, bitter: 0.5 }
  },
  yangjanpi: {
    id: 'yangjanpi',
    name: '양장피',
    emoji: '🥗',
    category: 'chinese',
    taste: { spicy: 1.5, salty: 2.5, sweet: 1.5, sour: 2.5, umami: 3.0, bitter: 0 }
  },

  // 일식
  sushi: {
    id: 'sushi',
    name: '초밥',
    emoji: '🍣',
    category: 'japanese',
    taste: { spicy: 0.5, salty: 2.5, sweet: 1.0, sour: 1.5, umami: 5.0, bitter: 0 }
  },
  ramen: {
    id: 'ramen',
    name: '라멘',
    emoji: '🍜',
    category: 'japanese',
    taste: { spicy: 1.5, salty: 4.0, sweet: 0.5, sour: 0, umami: 5.0, bitter: 0 }
  },
  donkatsu: {
    id: 'donkatsu',
    name: '돈카츠',
    emoji: '🍛',
    category: 'japanese',
    taste: { spicy: 0, salty: 2.5, sweet: 1.0, sour: 0.5, umami: 3.5, bitter: 0 }
  },
  udon: {
    id: 'udon',
    name: '우동',
    emoji: '🍜',
    category: 'japanese',
    taste: { spicy: 0, salty: 3.5, sweet: 1.0, sour: 0, umami: 4.5, bitter: 0 }
  },
  takoyaki: {
    id: 'takoyaki',
    name: '타코야키',
    emoji: '🐙',
    category: 'japanese',
    taste: { spicy: 0, salty: 3.0, sweet: 1.0, sour: 0.5, umami: 4.0, bitter: 0 }
  },

  // 양식
  pasta: {
    id: 'pasta',
    name: '파스타',
    emoji: '🍝',
    category: 'western',
    taste: { spicy: 1.0, salty: 3.0, sweet: 1.0, sour: 1.5, umami: 4.0, bitter: 0 }
  },
  pizza: {
    id: 'pizza',
    name: '피자',
    emoji: '🍕',
    category: 'western',
    taste: { spicy: 1.0, salty: 3.5, sweet: 1.0, sour: 1.5, umami: 4.0, bitter: 0 }
  },
  steak: {
    id: 'steak',
    name: '스테이크',
    emoji: '🥩',
    category: 'western',
    taste: { spicy: 0.5, salty: 3.0, sweet: 0.5, sour: 0.5, umami: 5.0, bitter: 0 }
  },
  hamburger: {
    id: 'hamburger',
    name: '햄버거',
    emoji: '🍔',
    category: 'western',
    taste: { spicy: 0.5, salty: 3.5, sweet: 1.5, sour: 1.0, umami: 3.5, bitter: 0 }
  },
  risotto: {
    id: 'risotto',
    name: '리조또',
    emoji: '🍚',
    category: 'western',
    taste: { spicy: 0, salty: 3.0, sweet: 0.5, sour: 0.5, umami: 4.5, bitter: 0 }
  },

  // 치킨/패스트푸드
  fried_chicken: {
    id: 'fried_chicken',
    name: '후라이드치킨',
    emoji: '🍗',
    category: 'chicken',
    taste: { spicy: 0, salty: 3.5, sweet: 0.5, sour: 0, umami: 4.0, bitter: 0 }
  },
  yangnyeom_chicken: {
    id: 'yangnyeom_chicken',
    name: '양념치킨',
    emoji: '🍗',
    category: 'chicken',
    taste: { spicy: 2.5, salty: 3.0, sweet: 3.5, sour: 1.0, umami: 3.5, bitter: 0 }
  },
  spicy_chicken: {
    id: 'spicy_chicken',
    name: '매운치킨',
    emoji: '🌶️',
    category: 'chicken',
    taste: { spicy: 4.5, salty: 3.5, sweet: 1.0, sour: 0.5, umami: 3.5, bitter: 0 }
  },

  // 분식/간식
  ramyeon: {
    id: 'ramyeon',
    name: '라면',
    emoji: '🍜',
    category: 'korean',
    taste: { spicy: 3.5, salty: 4.0, sweet: 0.5, sour: 0, umami: 4.0, bitter: 0 }
  },
  mandu: {
    id: 'mandu',
    name: '만두',
    emoji: '🥟',
    category: 'korean',
    taste: { spicy: 0.5, salty: 2.5, sweet: 0.5, sour: 0, umami: 4.0, bitter: 0 }
  },

  // 디저트/달콤한 것
  bingsu: {
    id: 'bingsu',
    name: '빙수',
    emoji: '🍧',
    category: 'dessert',
    taste: { spicy: 0, salty: 0.5, sweet: 5.0, sour: 0.5, umami: 0.5, bitter: 0 }
  },
  hotteok: {
    id: 'hotteok',
    name: '호떡',
    emoji: '🥞',
    category: 'dessert',
    taste: { spicy: 0, salty: 0.5, sweet: 5.0, sour: 0, umami: 0.5, bitter: 0 }
  },
  tteok: {
    id: 'tteok',
    name: '떡',
    emoji: '🍡',
    category: 'dessert',
    taste: { spicy: 0, salty: 0.5, sweet: 3.5, sour: 0, umami: 1.0, bitter: 0 }
  },

  // 쓴맛/음료 (쓴맛 평가용)
  americano: {
    id: 'americano',
    name: '아메리카노',
    emoji: '☕',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 0, sour: 0.5, umami: 0.5, bitter: 5.0 }
  },
  espresso: {
    id: 'espresso',
    name: '에스프레소',
    emoji: '☕',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 0, sour: 0.5, umami: 0.5, bitter: 5.0 }
  },
  beer: {
    id: 'beer',
    name: '맥주',
    emoji: '🍺',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 0.5, sour: 0.5, umami: 1.0, bitter: 4.0 }
  },
  dark_chocolate: {
    id: 'dark_chocolate',
    name: '다크초콜릿',
    emoji: '🍫',
    category: 'dessert',
    taste: { spicy: 0, salty: 0, sweet: 2.0, sour: 0, umami: 0.5, bitter: 4.5 }
  },
  green_tea: {
    id: 'green_tea',
    name: '녹차',
    emoji: '🍵',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 0.5, sour: 0, umami: 2.0, bitter: 3.5 }
  },
  grapefruit: {
    id: 'grapefruit',
    name: '자몽',
    emoji: '🍊',
    category: 'fruit',
    taste: { spicy: 0, salty: 0, sweet: 2.0, sour: 3.5, umami: 0, bitter: 3.0 }
  },
  cafe_latte: {
    id: 'cafe_latte',
    name: '카페라떼',
    emoji: '☕',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 2.0, sour: 0, umami: 1.0, bitter: 2.5 }
  },
  sweet_drink: {
    id: 'sweet_drink',
    name: '달달한 음료',
    emoji: '🧋',
    category: 'beverage',
    taste: { spicy: 0, salty: 0, sweet: 5.0, sour: 0.5, umami: 0, bitter: 0 }
  },
};

/**
 * 온보딩 라운드 구성
 * 각 라운드는 5개 음식 중 1개를 선택
 * 다양한 맛 조합으로 구성하여 사용자 취향 파악
 */
export const ONBOARDING_ROUNDS = [
  {
    round: 1,
    question: '지금 가장 먹고 싶은 음식은?',
    description: '찌개/탕 종류',
    foods: ['kimchi_jjigae', 'doenjang_jjigae', 'sundubu', 'budae_jjigae', 'samgyetang']
  },
  {
    round: 2,
    question: '다음 중 어떤 게 더 끌리나요?',
    description: '중식 대결',
    foods: ['jajangmyeon', 'jjamppong', 'tangsuyuk', 'malatang', 'yangjanpi']
  },
  {
    round: 3,
    question: '야식으로 먹고 싶은 건?',
    description: '야식 메뉴',
    foods: ['fried_chicken', 'yangnyeom_chicken', 'jokbal', 'pizza', 'ramyeon']
  },
  {
    round: 4,
    question: '점심 메뉴로 고른다면?',
    description: '점심 메뉴',
    foods: ['bibimbap', 'donkatsu', 'pasta', 'sushi', 'gimbap']
  },
  {
    round: 5,
    question: '고기가 먹고 싶을 때는?',
    description: '고기류',
    foods: ['samgyeopsal', 'bulgogi', 'galbi', 'steak', 'bossam']
  },
  {
    round: 6,
    question: '면 요리 중 최고는?',
    description: '면 요리',
    foods: ['kalguksu', 'naengmyeon', 'ramen', 'udon', 'jjamppong']
  },
  {
    round: 7,
    question: '매운 게 땡길 때는?',
    description: '매운 음식',
    foods: ['tteokbokki', 'malatang', 'spicy_chicken', 'jjamppong', 'kimchi_jjigae']
  },
  {
    round: 8,
    question: '간단하게 먹고 싶을 때는?',
    description: '간편식',
    foods: ['gimbap', 'mandu', 'hamburger', 'takoyaki', 'sundae']
  },
  {
    round: 9,
    question: '커피나 음료 중 선호하는 건?',
    description: '쓴맛/음료 선호도',
    foods: ['americano', 'cafe_latte', 'green_tea', 'sweet_drink', 'beer']
  },
];

/**
 * 사용자 선택 기반 맛 프로필 계산
 * @param {string[]} selectedFoodIds - 선택한 음식 ID 배열
 * @returns {Object} 계산된 맛 프로필
 */
export const calculateTasteProfile = (selectedFoodIds) => {
  const profile = {
    spicy: 0,
    salty: 0,
    sweet: 0,
    sour: 0,
    umami: 0,
    bitter: 0,
  };

  if (selectedFoodIds.length === 0) {
    // 기본값 반환
    return {
      spicy: 2.5,
      salty: 2.5,
      sweet: 2.5,
      sour: 2.5,
      umami: 2.5,
      bitter: 1.0,
    };
  }

  // 선택한 음식들의 맛 프로필 합산
  selectedFoodIds.forEach(foodId => {
    const food = FOOD_DATABASE[foodId];
    if (food) {
      Object.keys(profile).forEach(taste => {
        profile[taste] += food.taste[taste];
      });
    }
  });

  // 평균 계산
  const count = selectedFoodIds.length;
  Object.keys(profile).forEach(taste => {
    profile[taste] = Math.round((profile[taste] / count) * 10) / 10; // 소수점 1자리
  });

  // 0~5 범위로 클램핑
  Object.keys(profile).forEach(taste => {
    profile[taste] = Math.max(0, Math.min(5, profile[taste]));
  });

  return profile;
};

/**
 * 맛 프로필 해석
 * @param {Object} profile - 맛 프로필
 * @returns {Object} 해석 결과
 */
export const interpretTasteProfile = (profile) => {
  const interpretations = [];

  if (profile.spicy >= 3.5) {
    interpretations.push('매운 음식을 즐기시네요! 🌶️');
  } else if (profile.spicy <= 1.5) {
    interpretations.push('순한 맛을 선호하시네요 😊');
  }

  if (profile.sweet >= 3.5) {
    interpretations.push('달콤한 맛에 끌리시네요 🍯');
  }

  if (profile.salty >= 3.5) {
    interpretations.push('짭짤한 맛을 좋아하시네요 🧂');
  }

  if (profile.umami >= 4.0) {
    interpretations.push('깊고 진한 감칠맛을 즐기시네요 🍄');
  }

  if (profile.sour >= 2.5) {
    interpretations.push('새콤한 맛도 좋아하시네요 🍋');
  }

  if (profile.bitter >= 3.0) {
    interpretations.push('쓴맛도 즐기시네요! 커피 좋아하시죠? ☕');
  } else if (profile.bitter <= 1.0) {
    interpretations.push('쓴맛은 별로 선호하지 않으시네요 😊');
  }

  // 주요 선호 맛 찾기
  const tastes = Object.entries(profile)
    .filter(([key]) => key !== 'bitter')
    .sort((a, b) => b[1] - a[1]);

  const topTaste = tastes[0][0];
  const tasteNames = {
    spicy: '매운맛',
    salty: '짠맛',
    sweet: '단맛',
    sour: '신맛',
    umami: '감칠맛',
  };

  return {
    interpretations,
    topTaste: tasteNames[topTaste],
    profile,
  };
};

export default {
  FOOD_DATABASE,
  ONBOARDING_ROUNDS,
  calculateTasteProfile,
  interpretTasteProfile,
};
