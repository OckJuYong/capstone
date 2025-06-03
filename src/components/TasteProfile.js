import React, { useState } from 'react';

// CSS Styles
const styles = `
.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.app-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Taste Test Styles */
.taste-test {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
}

.question-counter {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.question-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.question-card h2 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.menu-example {
  color: #666;
  margin-bottom: 40px;
  font-style: italic;
}

.rating-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.rating-btn {
  width: 60px;
  height: 60px;
  border: 2px solid #ddd;
  border-radius: 50%;
  background: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rating-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: scale(1.1);
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

/* Taste Profile Styles */
.taste-profile {
  max-width: 800px;
  margin: 0 auto;
}

.taste-profile h2 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 2rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.taste-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.taste-item:hover {
  transform: translateY(-2px);
}

.taste-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.taste-emoji {
  font-size: 1.5rem;
}

.taste-name {
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
}

.star {
  opacity: 0.3;
}

.star.filled {
  opacity: 1;
}

.rating-text {
  color: #666;
  font-weight: bold;
}

.menu-example {
  color: #888;
  font-size: 0.9rem;
}

.profile-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
}

.secondary-btn {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 13px 28px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background: #667eea;
  color: white;
}

/* Restaurant Recommendations Styles */
.recommendations {
  max-width: 900px;
  margin: 0 auto;
}

.recommendations h2 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 2rem;
}

.recommendations > p {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.restaurant-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.restaurant-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.restaurant-card:hover {
  transform: translateY(-3px);
}

.restaurant-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 25px;
}

.restaurant-image {
  font-size: 3rem;
  flex-shrink: 0;
}

.restaurant-info {
  flex: 1;
}

.restaurant-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.5rem;
}

.menu-name {
  color: #667eea;
  font-weight: bold;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.restaurant-desc {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.match-rate {
  text-align: center;
  flex-shrink: 0;
}

.match-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.match-percentage {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.match-label {
  color: #666;
  font-size: 0.9rem;
}

.taste-breakdown h4 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.taste-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.taste-match {
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #ddd;
}

.taste-match.good-match {
  background: #f0f8f0;
  border-left-color: #4CAF50;
}

.taste-match.poor-match {
  background: #fff5f5;
  border-left-color: #f44336;
}

.taste-label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.rating-comparison {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.match-good {
  color: #4CAF50;
}

.match-poor {
  color: #f44336;
}

.recommendations-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .App {
    padding: 10px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .question-card {
    padding: 30px 20px;
  }
  
  .rating-buttons {
    gap: 10px;
  }
  
  .rating-btn {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .profile-grid {
    grid-template-columns: 1fr;
  }
  
  .restaurant-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .taste-comparison {
    grid-template-columns: 1fr;
  }
}
`;

// TasteTest Component
const TasteTest = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 'spicy', question: '매운 음식을 얼마나 좋아하세요?', menu: '김치찌개' },
    { id: 'sweet', question: '단맛을 얼마나 좋아하세요?', menu: '떡볶이' },
    { id: 'salty', question: '짠맛을 얼마나 좋아하세요?', menu: '된장찌개' },
    { id: 'sour', question: '신맛을 얼마나 좋아하세요?', menu: '냉면' },
    { id: 'bitter', question: '쓴맛을 얼마나 좋아하세요?', menu: '쌈밥' },
    { id: 'umami', question: '감칠맛을 얼마나 좋아하세요?', menu: '육개장' },
    { id: 'oily', question: '기름진 음식을 얼마나 좋아하세요?', menu: '삼겹살' },
    { id: 'light', question: '담백한 음식을 얼마나 좋아하세요?', menu: '미역국' },
    { id: 'chewy', question: '쫄깃한 식감을 얼마나 좋아하세요?', menu: '냉면' },
    { id: 'crispy', question: '바삭한 식감을 얼마나 좋아하세요?', menu: '치킨' }
  ];

  const handleAnswer = (rating) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: {
        rating,
        menu: questions[currentQuestion].menu
      }
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="taste-test">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="question-counter">
        {currentQuestion + 1} / {questions.length}
      </div>

      <div className="question-card">
        <h2>{questions[currentQuestion].question}</h2>
        <p className="menu-example">예시: {questions[currentQuestion].menu}</p>
        
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              className="rating-btn"
              onClick={() => handleAnswer(rating)}
            >
              {rating}
            </button>
          ))}
        </div>
        
        <div className="rating-labels">
          <span>전혀</span>
          <span>매우 좋아함</span>
        </div>
      </div>
    </div>
  );
};

// TasteProfile Component
const TasteProfile = ({ profile, onViewRecommendations, onRetakeTest }) => {
  const getTasteName = (id) => {
    const names = {
      spicy: '매운맛', sweet: '단맛', salty: '짠맛', sour: '신맛', bitter: '쓴맛',
      umami: '감칠맛', oily: '기름진맛', light: '담백한맛', chewy: '쫄깃한 식감', crispy: '바삭한 식감'
    };
    return names[id];
  };

  const getEmoji = (id, rating) => {
    const emojis = {
      spicy: ['🫥', '😐', '🙂', '😋', '🔥'],
      sweet: ['😑', '😐', '🙂', '😊', '🍭'],
      salty: ['😶', '😐', '🙂', '😋', '🧂'],
      sour: ['😬', '😐', '🙂', '😋', '🍋'],
      bitter: ['😵', '😐', '🙂', '😋', '☕'],
      umami: ['😐', '😐', '🙂', '😋', '🍖'],
      oily: ['😐', '😐', '🙂', '😋', '🍟'],
      light: ['😐', '😐', '🙂', '😋', '🥗'],
      chewy: ['😐', '😐', '🙂', '😋', '🍜'],
      crispy: ['😐', '😐', '🙂', '😋', '🍗']
    };
    return emojis[id][rating - 1];
  };

  return (
    <div className="taste-profile">
      <h2>🎯 당신의 입맛 프로필</h2>
      
      <div className="profile-grid">
        {Object.entries(profile).map(([id, data]) => (
          <div key={id} className="taste-item">
            <div className="taste-header">
              <span className="taste-emoji">{getEmoji(id, data.rating)}</span>
              <span className="taste-name">{getTasteName(id)}</span>
            </div>
            <div className="rating-display">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < data.rating ? 'star filled' : 'star'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="rating-text">[{data.rating} / 5]</span>
            </div>
            <div className="menu-example">예시: {data.menu}</div>
          </div>
        ))}
      </div>

      <div className="profile-actions">
        <button className="primary-btn" onClick={onViewRecommendations}>
          🍽️ 맞춤 음식 추천 보기
        </button>
        <button className="secondary-btn" onClick={onRetakeTest}>
          🔄 다시 테스트하기
        </button>
      </div>
    </div>
  );
};

// RestaurantRecommendations Component
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

function App() {
  const [currentStep, setCurrentStep] = useState('test'); // 'test', 'profile', 'recommendations'
  const [tasteProfile, setTasteProfile] = useState(null);

  const handleTasteTestComplete = (profile) => {
    setTasteProfile(profile);
    setCurrentStep('profile');
  };

  const handleViewRecommendations = () => {
    setCurrentStep('recommendations');
  };

  const handleRetakeTest = () => {
    setCurrentStep('test');
    setTasteProfile(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🍽️ 입맛 매칭 음식 추천</h1>
        <p>당신의 입맛을 분석해서 완벽한 음식을 추천해드려요!</p>
      </header>

      <main className="app-main">
        {currentStep === 'test' && (
          <TasteTest onComplete={handleTasteTestComplete} />
        )}
        
        {currentStep === 'profile' && tasteProfile && (
          <TasteProfile 
            profile={tasteProfile} 
            onViewRecommendations={handleViewRecommendations}
            onRetakeTest={handleRetakeTest}
          />
        )}
        
        {currentStep === 'recommendations' && tasteProfile && (
          <RestaurantRecommendations 
            tasteProfile={tasteProfile}
            onBackToProfile={() => setCurrentStep('profile')}
            onRetakeTest={handleRetakeTest}
          />
        )}
      </main>
    </div>
  );
}

export default App;