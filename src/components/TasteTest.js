import React, { useState, useEffect } from 'react';

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

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2rem;
}

.error {
  text-align: center;
  padding: 40px;
  color: #f44336;
  font-size: 1.1rem;
  background: #fff5f5;
  border-radius: 12px;
  margin-bottom: 20px;
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
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.review-count {
  color: #888;
  font-size: 0.9rem;
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
    { id: 'umami', question: '감칠맛을 얼마나 좋아하세요?', menu: '육개장' }
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
      spicy: '매운맛', sweet: '단맛', salty: '짠맛', sour: '신맛', bitter: '쓴맛', umami: '감칠맛'
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
      umami: ['😐', '😐', '🙂', '😋', '🍖']
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
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [tasteProfile]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // API로 보낼 입맛 데이터 구성
      const tasteData = {};
      Object.entries(tasteProfile).forEach(([taste, data]) => {
        tasteData[taste] = data.rating;
      });

      const response = await fetch('https://port-0-capstone-qdrant-umnqdut2blqqevwyb.sel4.cloudtype.app/recommendations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasteData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error('API 호출 실패:', err);
      setError('음식점 추천을 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantEmoji = (menu) => {
    if (menu.includes('치킨') || menu.includes('닭')) return '🍗';
    if (menu.includes('면') || menu.includes('국수')) return '🍜';
    if (menu.includes('찌개') || menu.includes('탕')) return '🍲';
    if (menu.includes('밥') || menu.includes('정식')) return '🍚';
    if (menu.includes('고기') || menu.includes('불고기')) return '🥩';
    if (menu.includes('피자')) return '🍕';
    if (menu.includes('해물') || menu.includes('생선')) return '🐟';
    return '🍽️';
  };

  const calculateDisplayMatchRate = (similarityScore) => {
    // 유사도 점수를 백분율로 변환 (0-1 범위를 0-100으로)
    return Math.round(similarityScore * 100);
  };

  if (loading) {
    return (
      <div className="recommendations">
        <h2>🎯 맞춤 음식 추천</h2>
        <div className="loading">
          <p>🔍 당신의 입맛에 맞는 음식점을 찾는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations">
        <h2>🎯 맞춤 음식 추천</h2>
        <div className="error">
          <p>{error}</p>
          <button className="secondary-btn" onClick={fetchRecommendations} style={{ marginTop: '20px' }}>
            🔄 다시 시도
          </button>
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
  }

  return (
    <div className="recommendations">
      <h2>🎯 맞춤 음식 추천</h2>
      <p>당신의 입맛에 맞는 음식점들을 유사도 순으로 정렬했어요!</p>

      <div className="restaurant-list">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="restaurant-card">
            <div className="restaurant-header">
              <span className="restaurant-image">{getRestaurantEmoji(recommendation.menu)}</span>
              <div className="restaurant-info">
                <h3>{recommendation.restaurant}</h3>
                <p className="menu-name">{recommendation.menu}</p>
                <p className="review-count">리뷰 {recommendation.reviewCount}개</p>
              </div>
              <div className="match-rate">
                <div className="match-circle">
                  <span className="match-percentage">{calculateDisplayMatchRate(recommendation.similarityScore)}%</span>
                </div>
                <span className="match-label">매칭률</span>
              </div>
            </div>

            <div className="taste-breakdown">
              <h4>맛 분석</h4>
              <div className="taste-comparison">
                {Object.entries(recommendation.tasteProfile).map(([taste, rating]) => {
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
                         taste === 'umami' ? '감칠맛' : taste}
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

  // Inject styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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