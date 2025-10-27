// MyApp의 기존 Stack Navigator 구조를 유지하면서 dd 디자인 시스템 통합
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 기존 컴포넌트들
import Home from '../Home/Home';
import Intro from '../Intro/Intro';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Splash from '../Login/Splash';

import Event from '../Event/Event';
import Map from '../Home/Map/Map';
import Favorite from '../Home/Eating/Favorite/Favorite';
import House from '../Home/Eating/House/House';
import RestaurantDetail from '../Home/Eating/House/RestaurantDetail';
import Riview from '../Home/Eating/Riview/Riview';
import History from '../Home/History/History';
import Ingredient from '../Home/Ingredient/Ingredient';
import MyInfo from '../Home/Myinfo/info';
import Random from '../Home/Random/Random';
import Search from '../Home/Search/Search';
import Payment from '../Payment/Payment';

// dd 디자인 기반 내비게이션 컴포넌트
import BottomNavigation from './BottomNavigation';
import { lightThemeConfig } from '../../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// dd 스타일을 적용한 Header 설정
const getHeaderOptions = (title) => {
  const theme = lightThemeConfig;
  
  return {
    headerStyle: {
      backgroundColor: theme.colors.background,
      // dd처럼 깔끔한 헤더 (그림자 최소화)
      shadowColor: theme.colors.border,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
    headerTitleStyle: {
      // dd의 일반적인 제목 스타일
      fontSize: theme.typography.textStyles.h4.fontSize,     // 20px
      fontWeight: theme.typography.textStyles.h4.fontWeight, // '500'
      color: theme.colors.foreground,
    },
    headerTintColor: theme.colors.foreground,
    title: title,
  };
};

// dd bottom-navigation에 맞는 메인 탭들
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{ headerShown: false }} // 각 탭에서 개별 헤더 관리
    >
      {/* dd와 매핑되는 메인 탭들 */}
      <Tab.Screen 
        name="Home" 
        component={Home}
      />
      <Tab.Screen 
        name="Search" 
        component={Search}
      />
      <Tab.Screen 
        name="Favorite" 
        component={Favorite}
      />
      <Tab.Screen 
        name="History" 
        component={History}
      />
      <Tab.Screen 
        name="MyInfo" 
        component={MyInfo}
      />
    </Tab.Navigator>
  );
}

// 인증 관련 스택 (dd에는 없지만 MyApp에 필요)
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={getHeaderOptions('회원가입')}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

// 메인 앱 스택 (탭 네비게이터 포함)
function AppStack() {
  return (
    <Stack.Navigator>
      {/* 메인 탭 네비게이터 */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      
      {/* 세부 화면들 (풀 스크린) */}
      <Stack.Screen
        name="Event"
        component={Event}
        options={getHeaderOptions('이벤트')}
      />
      <Stack.Screen
        name="House"
        component={House}
        options={getHeaderOptions('집밥')}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={getHeaderOptions('음식점 상세')}
      />
      <Stack.Screen
        name="Riview"
        component={Riview}
        options={getHeaderOptions('리뷰')}
      />
      <Stack.Screen
        name="Ingredient"
        component={Ingredient}
        options={getHeaderOptions('재료')}
      />
      <Stack.Screen
        name="Random"
        component={Random}
        options={getHeaderOptions('랜덤 추천')}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={getHeaderOptions('결제')}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={getHeaderOptions('지도')}
      />
    </Stack.Navigator>
  );
}

// 전체 앱 내비게이션 구조
export default function AppNavigator() {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// 사용법 가이드:
// 1. 기존 App.js를 이 파일로 교체
// 2. 각 화면 컴포넌트에서 dd 디자인 시스템 적용
// 3. 인증 상태 관리 로직 추가