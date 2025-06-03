import React, { useState } from 'react';
import TasteTest from './components/TasteTest';
import TasteProfile from './components/TasteProfile';
import RestaurantRecommendations from './components/RestaurantRecommendations';
import './App.css';

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