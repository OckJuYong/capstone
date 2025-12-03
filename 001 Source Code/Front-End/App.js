// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppWrapper from "./components/AppWrapper";

// dd 스타일 새 페이지들
import HomeUpdated from "./components/Home/HomeUpdated";
import LoginNew from "./components/Login/LoginNew";
import SignupNew from "./components/Signup/SignupNew";
import SearchSimple from "./components/Home/Search/SearchSimple";
import FavoriteSimple from "./components/Home/Eating/Favorite/FavoriteSimple";
import CategorySimple from "./components/Category/CategorySimple";
import CartSimple from "./components/Cart/CartSimple";
// dd 스타일 새 페이지들 (모두 변환 완료)
import IntroNew from "./components/Intro/IntroNew";
import Splash from "./components/Login/Splash";
import EventNew from "./components/Event/EventNew";
import MapNew from "./components/Home/Map/MapNew";
import HouseNew from "./components/Home/Eating/House/HouseNew";
import RestaurantDetailNew from "./components/RestaurantDetail/RestaurantDetailNew";
import RiviewNew from "./components/Home/Eating/Riview/RiviewNew";
import HistoryNew from "./components/Home/History/HistoryNew";
import IngredientNew from "./components/Home/Ingredient/IngredientNew";
import MyInfoNew from "./components/Home/Myinfo/MyInfoNew";
import RandomNew from "./components/Home/Random/RandomNew";
import PaymentNew from "./components/Payment/PaymentNew";
import CouponsNew from "./components/Home/Myinfo/CouponsNew";
import TasteMemoriesNew from "./components/Home/Myinfo/TasteMemoriesNew";
import MyReviewsNew from "./components/Home/Myinfo/MyReviewsNew";
import NoticesNew from "./components/Home/Myinfo/NoticesNew";
import SettingsNew from "./components/Home/Myinfo/SettingsNew";
import ProfileNew from "./components/Home/Myinfo/ProfileNew";

const Stack = createNativeStackNavigator();

// 화면을 AppWrapper로 감싸는 헬퍼 함수
const createWrappedScreen = (Component, showBottomNav = true) => {
  return (props) => (
    <AppWrapper showBottomNav={showBottomNav}>
      <Component {...props} />
    </AppWrapper>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={createWrappedScreen(Splash, false)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={createWrappedScreen(LoginNew, false)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={createWrappedScreen(SignupNew, false)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Intro"
          component={createWrappedScreen(IntroNew, false)}
          options={{
            headerShown: false,
            gestureEnabled: false, 
          }}
        />
        <Stack.Screen
          name="Home"
          component={createWrappedScreen(HomeUpdated, true)}
          options={{
            headerShown: false,
            headerLeft: () => null, 
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Event"
          component={createWrappedScreen(EventNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorite"
          component={createWrappedScreen(FavoriteSimple, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="House"
          component={createWrappedScreen(HouseNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={createWrappedScreen(RestaurantDetailNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Riview"
          component={createWrappedScreen(RiviewNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={createWrappedScreen(HistoryNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ingredient"
          component={createWrappedScreen(IngredientNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyInfo"
          component={createWrappedScreen(MyInfoNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Random"
          component={createWrappedScreen(RandomNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={createWrappedScreen(SearchSimple, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={createWrappedScreen(CategorySimple, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={createWrappedScreen(CartSimple, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={createWrappedScreen(PaymentNew, false)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={createWrappedScreen(MapNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Coupons"
          component={createWrappedScreen(CouponsNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TasteMemories"
          component={createWrappedScreen(TasteMemoriesNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyReviews"
          component={createWrappedScreen(MyReviewsNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notices"
          component={createWrappedScreen(NoticesNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={createWrappedScreen(SettingsNew, true)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={createWrappedScreen(ProfileNew, true)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
