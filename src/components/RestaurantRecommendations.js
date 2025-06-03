import React from 'react';

const RestaurantRecommendations = ({ tasteProfile, onBackToProfile, onRetakeTest }) => {
  const restaurants = [
    {
      name: '매운맛 천국',
      menu: '불닭볶음면',
      image: '🍜',
      taste: { spicy: 5, sweet: 2, salty: 3, umami: 4, oily: 3 },
      description: '매운맛의 진수를 보여주는 정통 한식당'
    },
    {
      name: '달콤한 하루',
      menu: '허니버터치킨',
      image: '🍗',
      taste: { sweet: 5, crispy: 5, oily: 4, salty: 2, spicy: 1 },
      description: '달콤바삭한 치킨 전문점'
    },
    {
      name: '바다향 식당',
      menu: '해물순두부찌개',
      image: '🍲',
      taste: { umami: 5, salty: 4, spicy: 3, light: 2, sour: 1 },
      description: '신선한 해산물로 만든 깊은 맛의 찌개집'
    },
    {
      name: '엄마손맛',
      menu: '된장찌개',
      image: '🥣',
      taste: { umami: 4, salty: 4, light: 3, bitter: 2, sweet: 1 },
      description: '정갈한 한식 가정식 전문점'
    },
    {
      name: '크리스피 존',
      menu: '프라이드치킨',
      image: '🍟',
      taste: { crispy: 5, oily: 4, salty: 3, spicy: 2, sweet: 1 },
      description: '바삭함이 일품인 치킨 전문점'
    },
    {
      name: '시원한 나루',
      menu: '물냉면',
      image: '🍜',
      taste: { sour: 4, light: 5, chewy: 3, sweet: 2, salty: 2 },
      description: '시원하고 깔끔한 냉면 전문점'
    }
  ];

  const calculateMatchRate = (restaurantTaste) => {
    let totalMatch = 0;
    let totalPossible = 0;

    Object.entries(restaurantTaste).forEach(([taste, restaurantRating]) => {
      if (tasteProfile[taste]) {
        const userRating = tasteProfile[taste].rating;
        const difference = Math.abs(userRating - restaurantRating);
        const match = Math.max(0, 5 - difference);
        totalMatch += match;
        totalPossible += 5;
      }
    });

    return totalPossible > 0 ? Math.round((totalMatch / totalPossible) * 100) : 0;
  };

  const sortedRestaurants = restaurants
    .map(restaurant => ({
      ...restaurant,
      matchRate: calculateMatchRate(restaurant.taste)
    }))
    .sort((a, b) => b.matchRate - a.matchRate);

  return (
    <div className="recommendations">
      <h2>🎯 맞춤 음식 추천</h2>
      <p>당신의 입맛에 맞는 음식점들을 매칭률 순으로 정렬했어요!</p>

      <div className="restaurant-list">
        {sortedRestaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <div className="restaurant-header">
              <span className="restaurant-image">{restaurant.image}</span>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="menu-name">{restaurant.menu}</p>
                <p className="restaurant-desc">{restaurant.description}</p>
              </div>
              <div className="match-rate">
                <div className="match-circle">
                  <span className="match-percentage">{restaurant.matchRate}%</span>
                </div>
                <span className="match-label">매칭률</span>
              </div>
            </div>

            <div className="taste-breakdown">
              <h4>맛 분석</h4>
              <div className="taste-comparison">
                {Object.entries(restaurant.taste).map(([taste, rating]) => {
                  const userRating = tasteProfile[taste]?.rating || 0;
                  const difference = Math.abs(userRating - rating);
                  const isGoodMatch = difference <= 1;
                  
                  return (
                    <div key={taste} className={`taste-match ${isGoodMatch ? 'good-match' : 'poor-match'}`}>
                      <span className="taste-label">
                        {taste === 'spicy' ? '매운맛' : 
                         taste === 'sweet' ? '단맛' :
                         taste === 'salty' ? '짠맛' :
                         taste === 'sour' ? '신맛' :
                         taste === 'bitter' ? '쓴맛' :
                         taste === 'umami' ? '감칠맛' :
                         taste === 'oily' ? '기름진맛' :
                         taste === 'light' ? '담백함' :
                         taste === 'chewy' ? '쫄깃함' :
                         taste === 'crispy' ? '바삭함' : taste}
                      </span>
                      <div className="rating-comparison">
                        <span>내 취향: {userRating}/5</span>
                        <span>음식점: {rating}/5</span>
                        <span className={isGoodMatch ? 'match-good' : 'match-poor'}>
                          {isGoodMatch ? '✅' : '❌'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendations-actions">
        <button className="secondary-btn" onClick={onBackToProfile}>
          ⬅️ 프로필로 돌아가기
        </button>
        <button className="secondary-btn" onClick={onRetakeTest}>
          🔄 다시 테스트하기
        </button>
      </div>
    </div>
  );
};

export default RestaurantRecommendations;