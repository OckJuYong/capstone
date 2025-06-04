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

/* Food Choice Styles */
.food-choice {
  max-width: 900px;
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

.round-counter {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: bold;
}

.question-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  margin-bottom: 30px;
}

.question-card h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.question-card p {
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.food-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.food-option {
  background: white;
  border: 3px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.food-option:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  border-color: #667eea;
}

.food-option.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea15, #764ba215);
  transform: translateY(-5px);
}

.food-emoji {
  font-size: 3.5rem;
  margin-bottom: 15px;
  display: block;
}

.food-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.food-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.next-button {
  display: block;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.next-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.next-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
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

.profile-summary {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  text-align: center;
}

.profile-summary h3 {
  color: #667eea;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.selected-foods {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.selected-food-tag {
  background: linear-gradient(135deg, #667eea20, #764ba220);
  color: #333;
  padding: 10px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  border: 2px solid #667eea40;
  display: flex;
  align-items: center;
  gap: 8px;
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
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.taste-item:hover {
  transform: translateY(-2px);
}

.taste-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.taste-emoji {
  font-size: 1.8rem;
}

.taste-name {
  font-weight: bold;
  color: #333;
  font-size: 1.2rem;
}

.taste-bar {
  width: 100%;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 15px;
}

.taste-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.8s ease;
  border-radius: 7px;
}

.taste-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.score-value {
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

.score-description {
  color: #666;
  font-weight: 500;
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

@media (max-width: 768px) {
  .App {
    padding: 10px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .food-options {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 15px;
  }
  
  .food-option {
    padding: 20px 15px;
    min-height: 160px;
  }
  
  .food-emoji {
    font-size: 2.8rem;
  }
  
  .food-name {
    font-size: 1.1rem;
  }
  
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
`;

// 음식별 맛 프로필 데이터 (총 40개)
const foodTasteProfiles = {
  // 한식 (15개)
  '김치찌개': { spicy: 4, sweet: 1, salty: 4, sour: 3, bitter: 1, umami: 5 },
  '떡볶이': { spicy: 3, sweet: 4, salty: 3, sour: 1, bitter: 1, umami: 2 },
  '된장찌개': { spicy: 1, sweet: 2, salty: 4, sour: 1, bitter: 2, umami: 5 },
  '냉면': { spicy: 2, sweet: 2, salty: 2, sour: 4, bitter: 1, umami: 3 },
  '불고기': { spicy: 1, sweet: 3, salty: 3, sour: 1, bitter: 1, umami: 4 },
  '비빔밥': { spicy: 2, sweet: 1, salty: 2, sour: 2, bitter: 1, umami: 3 },
  '삼겹살': { spicy: 1, sweet: 1, salty: 2, sour: 1, bitter: 1, umami: 4 },
  '갈비탕': { spicy: 1, sweet: 2, salty: 3, sour: 1, bitter: 1, umami: 5 },
  '김밥': { spicy: 1, sweet: 1, salty: 3, sour: 2, bitter: 1, umami: 3 },
  '순두부찌개': { spicy: 3, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 4 },
  '잡채': { spicy: 1, sweet: 3, salty: 2, sour: 1, bitter: 1, umami: 2 },
  '김치볶음밥': { spicy: 3, sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 3 },
  '부대찌개': { spicy: 3, sweet: 1, salty: 4, sour: 1, bitter: 1, umami: 4 },
  '제육볶음': { spicy: 4, sweet: 2, salty: 3, sour: 1, bitter: 1, umami: 3 },
  '해물파전': { spicy: 1, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 4 },
  
  // 중식 (8개)
  '짜장면': { spicy: 1, sweet: 3, salty: 4, sour: 1, bitter: 1, umami: 4 },
  '짬뽕': { spicy: 2, sweet: 1, salty: 4, sour: 2, bitter: 1, umami: 4 },
  '탕수육': { spicy: 1, sweet: 5, salty: 2, sour: 3, bitter: 1, umami: 2 },
  '마라탕': { spicy: 5, sweet: 1, salty: 3, sour: 1, bitter: 2, umami: 4 },
  '군만두': { spicy: 1, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 3 },
  '양장피': { spicy: 1, sweet: 2, salty: 3, sour: 3, bitter: 1, umami: 3 },
  '깐쇼새우': { spicy: 3, sweet: 4, salty: 2, sour: 2, bitter: 1, umami: 3 },
  '마파두부': { spicy: 4, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 4 },
  
  // 일식 (7개)
  '초밥': { spicy: 1, sweet: 2, salty: 2, sour: 2, bitter: 1, umami: 5 },
  '라멘': { spicy: 2, sweet: 1, salty: 4, sour: 1, bitter: 1, umami: 5 },
  '돈카츠': { spicy: 1, sweet: 2, salty: 2, sour: 2, bitter: 1, umami: 3 },
  '우동': { spicy: 1, sweet: 2, salty: 3, sour: 1, bitter: 1, umami: 4 },
  '연어덮밥': { spicy: 1, sweet: 1, salty: 2, sour: 1, bitter: 1, umami: 4 },
  '규동': { spicy: 1, sweet: 3, salty: 3, sour: 1, bitter: 1, umami: 4 },
  '가라아게': { spicy: 1, sweet: 1, salty: 3, sour: 2, bitter: 1, umami: 3 },
  
  // 서양식 (10개)
  '피자': { spicy: 2, sweet: 2, salty: 4, sour: 2, bitter: 1, umami: 4 },
  '파스타': { spicy: 1, sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 3 },
  '햄버거': { spicy: 1, sweet: 3, salty: 4, sour: 2, bitter: 1, umami: 3 },
  '스테이크': { spicy: 1, sweet: 1, salty: 2, sour: 1, bitter: 1, umami: 5 },
  '치킨': { spicy: 2, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 3 },
  '샐러드': { spicy: 1, sweet: 1, salty: 1, sour: 2, bitter: 2, umami: 1 },
  '샌드위치': { spicy: 1, sweet: 2, salty: 3, sour: 2, bitter: 1, umami: 2 },
  '리조또': { spicy: 1, sweet: 1, salty: 3, sour: 1, bitter: 1, umami: 4 },
  '크림파스타': { spicy: 1, sweet: 2, salty: 2, sour: 1, bitter: 1, umami: 3 },
  '오믈렛': { spicy: 1, sweet: 1, salty: 2, sour: 1, bitter: 1, umami: 3 }
};

const foodOptions = [
  // 한식
  { id: '김치찌개', emoji: '🍲', name: '김치찌개', description: '매콤하고 진한 국물맛' },
  { id: '떡볶이', emoji: '🍢', name: '떡볶이', description: '달콤하고 매콤한 분식' },
  { id: '된장찌개', emoji: '🥣', name: '된장찌개', description: '구수하고 짭짤한 국물' },
  { id: '냉면', emoji: '🍜', name: '냉면', description: '시원하고 새콤한 면요리' },
  { id: '불고기', emoji: '🥩', name: '불고기', description: '달콤한 양념에 구운 고기' },
  { id: '비빔밥', emoji: '🍚', name: '비빔밥', description: '다양한 나물과 고추장' },
  { id: '삼겹살', emoji: '🥓', name: '삼겹살', description: '고소하고 담백한 돼지고기' },
  { id: '갈비탕', emoji: '🍲', name: '갈비탕', description: '깔끔하고 진한 사골육수' },
  { id: '김밥', emoji: '🍙', name: '김밥', description: '다양한 속재료의 조화' },
  { id: '순두부찌개', emoji: '🍲', name: '순두부찌개', description: '부드럽고 매콤한 찌개' },
  { id: '잡채', emoji: '🍝', name: '잡채', description: '달콤한 당면 요리' },
  { id: '김치볶음밥', emoji: '🍚', name: '김치볶음밥', description: '매콤한 김치와 밥의 조화' },
  { id: '부대찌개', emoji: '🍲', name: '부대찌개', description: '얼큰하고 진한 국물' },
  { id: '제육볶음', emoji: '🥩', name: '제육볶음', description: '매콤달콤한 돼지고기 볶음' },
  { id: '해물파전', emoji: '🥞', name: '해물파전', description: '바삭하고 고소한 전' },
  
  // 중식
  { id: '짜장면', emoji: '🍜', name: '짜장면', description: '달콤한 춘장 소스 면' },
  { id: '짬뽕', emoji: '🍜', name: '짬뽕', description: '얼큰한 해물 국물 면' },
  { id: '탕수육', emoji: '🍖', name: '탕수육', description: '달콤새콤한 소스 요리' },
  { id: '마라탕', emoji: '🌶️', name: '마라탕', description: '얼얼하고 매운 중국요리' },
  { id: '군만두', emoji: '🥟', name: '군만두', description: '바삭하게 구운 만두' },
  { id: '양장피', emoji: '🥗', name: '양장피', description: '새콤달콤한 냉채 요리' },
  { id: '깐쇼새우', emoji: '🍤', name: '깐쇼새우', description: '달콤매콤한 새우 요리' },
  { id: '마파두부', emoji: '🌶️', name: '마파두부', description: '매콤한 두부 요리' },
  
  // 일식
  { id: '초밥', emoji: '🍣', name: '초밥', description: '신선하고 담백한 일식' },
  { id: '라멘', emoji: '🍜', name: '라멘', description: '진한 육수의 일본 면요리' },
  { id: '돈카츠', emoji: '🍗', name: '돈카츠', description: '바삭한 튀김옷의 돼지고기' },
  { id: '우동', emoji: '🍜', name: '우동', description: '쫄깃한 면과 깔끔한 국물' },
  { id: '연어덮밥', emoji: '🍣', name: '연어덮밥', description: '신선한 연어와 밥' },
  { id: '규동', emoji: '🍚', name: '규동', description: '달콤한 소고기 덮밥' },
  { id: '가라아게', emoji: '🍗', name: '가라아게', description: '바삭한 일본식 닭튀김' },
  
  // 서양식
  { id: '피자', emoji: '🍕', name: '피자', description: '치즈가 가득한 이탈리아 요리' },
  { id: '파스타', emoji: '🍝', name: '파스타', description: '부드럽고 고급스러운 이탈리아 요리' },
  { id: '햄버거', emoji: '🍔', name: '햄버거', description: '패티와 야채가 들어간 미국 요리' },
  { id: '스테이크', emoji: '🥩', name: '스테이크', description: '부드럽고 육즙 가득한 고기' },
  { id: '치킨', emoji: '🍗', name: '치킨', description: '바삭하고 고소한 닭요리' },
  { id: '샐러드', emoji: '🥗', name: '샐러드', description: '신선한 야채와 드레싱' },
  { id: '샌드위치', emoji: '🥪', name: '샌드위치', description: '다양한 재료의 조화' },
  { id: '리조또', emoji: '🍚', name: '리조또', description: '크리미한 이탈리아 쌀요리' },
  { id: '크림파스타', emoji: '🍝', name: '크림파스타', description: '부드러운 크림 소스 면' },
  { id: '오믈렛', emoji: '🍳', name: '오믈렛', description: '부드러운 계란 요리' }
];

// FoodChoice Component
const FoodChoice = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [usedFoods, setUsedFoods] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    generateNewOptions();
  }, []);

  const generateNewOptions = () => {
    const availableFoods = foodOptions.filter(food => !usedFoods.has(food.id));
    
    if (availableFoods.length < 4) {
      // 모든 음식이 사용된 경우, 새로 시작
      setUsedFoods(new Set());
      const shuffled = [...foodOptions].sort(() => Math.random() - 0.5);
      const newOptions = shuffled.slice(0, 4);
      setCurrentOptions(newOptions);
      setUsedFoods(new Set(newOptions.map(food => food.id)));
    } else {
      const shuffled = availableFoods.sort(() => Math.random() - 0.5);
      const newOptions = shuffled.slice(0, 4);
      setCurrentOptions(newOptions);
      setUsedFoods(prev => new Set([...prev, ...newOptions.map(food => food.id)]));
    }
    
    setSelectedOption(null);
  };

  const handleOptionSelect = (foodId) => {
    setSelectedOption(foodId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newChoices = [...selectedChoices, selectedOption];
    setSelectedChoices(newChoices);

    if (currentRound < 10) {
      setCurrentRound(currentRound + 1);
      generateNewOptions();
    } else {
      onComplete(newChoices);
    }
  };

  const progress = (currentRound / 10) * 100;

  return (
    <div className="food-choice">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="round-counter">
        라운드 {currentRound} / 10
      </div>

      <div className="question-card">
        <h2>🤔 다음 중 가장 먹고 싶은 음식은?</h2>
        <p>지금 이 순간 가장 끌리는 음식을 선택해주세요!</p>
      </div>

      <div className="food-options">
        {currentOptions.map((food) => (
          <div
            key={food.id}
            className={`food-option ${selectedOption === food.id ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(food.id)}
          >
            <span className="food-emoji">{food.emoji}</span>
            <div className="food-name">{food.name}</div>
            <div className="food-description">{food.description}</div>
          </div>
        ))}
      </div>

      <button
        className="next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        {currentRound < 10 ? '다음 라운드 →' : '결과 확인하기 🎯'}
      </button>
    </div>
  );
};

// TasteProfile Component
const TasteProfile = ({ selectedChoices, onRetakeTest }) => {
  const [tasteProfile, setTasteProfile] = useState({});

  useEffect(() => {
    analyzeTasteProfile();
  }, [selectedChoices]);

  const analyzeTasteProfile = () => {
    const tasteTotals = {
      spicy: 0, sweet: 0, salty: 0, sour: 0, bitter: 0, umami: 0
    };

    // 선택한 음식들의 맛 점수를 합산
    selectedChoices.forEach(foodId => {
      const foodProfile = foodTasteProfiles[foodId];
      if (foodProfile) {
        Object.keys(tasteTotals).forEach(taste => {
          tasteTotals[taste] += foodProfile[taste];
        });
      }
    });

    // 평균 계산 및 5점 만점으로 정규화
    const analyzedProfile = {};
    Object.keys(tasteTotals).forEach(taste => {
      const average = tasteTotals[taste] / selectedChoices.length;
      analyzedProfile[taste] = Math.round(average * 10) / 10; // 소수점 1자리까지
    });

    setTasteProfile(analyzedProfile);
  };

  const getTasteName = (id) => {
    const names = {
      spicy: '매운맛', sweet: '단맛', salty: '짠맛', 
      sour: '신맛', bitter: '쓴맛', umami: '감칠맛'
    };
    return names[id];
  };

  const getEmoji = (id) => {
    const emojis = {
      spicy: '🌶️', sweet: '🍯', salty: '🧂', 
      sour: '🍋', bitter: '☕', umami: '🍖'
    };
    return emojis[id];
  };

  const getScoreDescription = (score) => {
    if (score >= 4.0) return '매우 높음';
    if (score >= 3.0) return '높음';
    if (score >= 2.0) return '보통';
    if (score >= 1.0) return '낮음';
    return '매우 낮음';
  };

  const getSelectedFoodInfo = () => {
    return selectedChoices.map((id, index) => {
      const food = foodOptions.find(f => f.id === id);
      return food ? { ...food, round: index + 1 } : null;
    }).filter(Boolean);
  };

  return (
    <div className="taste-profile">
      <h2>🎯 당신의 입맛 분석 결과</h2>
      
      <div className="profile-summary">
        <h3>선택하신 음식들</h3>
        <div className="selected-foods">
          {getSelectedFoodInfo().map((food, index) => (
            <span key={index} className="selected-food-tag">
              <span>{food.emoji}</span>
              <span>{food.name}</span>
            </span>
          ))}
        </div>
        <p>10라운드 동안 선택하신 음식들을 바탕으로 입맛을 분석했어요!</p>
      </div>

      <div className="profile-grid">
        {Object.entries(tasteProfile).map(([id, score]) => (
          <div key={id} className="taste-item">
            <div className="taste-header">
              <span className="taste-emoji">{getEmoji(id)}</span>
              <span className="taste-name">{getTasteName(id)}</span>
            </div>
            <div className="taste-bar">
              <div 
                className="taste-fill" 
                style={{ width: `${(score / 5) * 100}%` }}
              ></div>
            </div>
            <div className="taste-score">
              <span className="score-value">{score} / 5.0</span>
              <span className="score-description">{getScoreDescription(score)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="profile-actions">
        <button className="primary-btn" onClick={() => alert('음식 추천 기능은 개발 중입니다!')}>
          🍽️ 맞춤 음식 추천 받기
        </button>
        <button className="secondary-btn" onClick={onRetakeTest}>
          🔄 다시 분석하기
        </button>
      </div>
    </div>
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState('choice'); // 'choice', 'profile'
  const [selectedChoices, setSelectedChoices] = useState([]);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleChoiceComplete = (choices) => {
    setSelectedChoices(choices);
    setCurrentStep('profile');
  };

  const handleRetakeTest = () => {
    setCurrentStep('choice');
    setSelectedChoices([]);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🍽️ 입맛 매칭 음식 추천</h1>
        <p>10라운드 음식 선택으로 당신만의 입맛을 분석해보세요!</p>
      </header>

      <main className="app-main">
        {currentStep === 'choice' && (
          <FoodChoice onComplete={handleChoiceComplete} />
        )}
        
        {currentStep === 'profile' && selectedChoices.length > 0 && (
          <TasteProfile 
            selectedChoices={selectedChoices}
            onRetakeTest={handleRetakeTest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
              