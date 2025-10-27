// dd/app/home/page.tsx를 React Native로 100% 정확히 변환
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { ScreenLayout, SectionLayout, GridLayout } from '../layout';
import { HomeHeader } from '../layout/Header';
import { Card, CardContent } from '../ui';
import { lightThemeConfig } from '../../theme';

export default function HomeNew({ navigation }) {
  const [activeTrendingFilter, setActiveTrendingFilter] = useState('nearby');
  const theme = lightThemeConfig;

  // dd와 동일한 데이터 구조
  const foodCategories = [
    { id: "korean", name: "한식", icon: "🍚" },
    { id: "chinese", name: "중식", icon: "🥢" },
    { id: "japanese", name: "일식", icon: "🍣" },
    { id: "western", name: "양식", icon: "🍝" },
    { id: "cafe", name: "카페", icon: "☕" },
    { id: "chicken", name: "치킨", icon: "🍗" },
    { id: "pizza", name: "피자", icon: "🍕" },
    { id: "fastfood", name: "패스트푸드", icon: "🍔" },
  ];

  const recommendedRestaurants = [
    {
      id: 1,
      name: "메종 크림 파스타",
      category: "파스타마이",
      rating: 4.8,
      image: "https://via.placeholder.com/150x150",
      tags: ["매콤함", "크리미함"],
      matchPercentage: 95,
    },
    {
      id: 2,
      name: "트러플 리조또",
      category: "이탈리안 카페",
      rating: 4.7,
      image: "https://via.placeholder.com/150x150",
      tags: ["신선함", "고소함"],
      matchPercentage: 92,
    },
  ];

  const trendingRestaurants = {
    nearby: [
      {
        id: 3,
        name: "메종 운두부찌개",
        category: "한식당",
        rating: 4.9,
        distance: "0.3km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 88,
      },
      {
        id: 4,
        name: "치즈 닭갈비",
        category: "닭갈비 전문점",
        rating: 4.7,
        distance: "0.5km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 85,
      },
    ],
    popular: [
      {
        id: 5,
        name: "스시 오마카세",
        category: "일식당",
        rating: 4.9,
        distance: "1.2km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 90,
      },
      {
        id: 6,
        name: "화덕 피자",
        category: "피자 전문점",
        rating: 4.8,
        distance: "0.8km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 87,
      },
    ],
    new: [
      {
        id: 7,
        name: "뉴욕 스테이크",
        category: "스테이크 하우스",
        rating: 4.6,
        distance: "1.5km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 82,
      },
      {
        id: 8,
        name: "베트남 쌀국수",
        category: "베트남 음식",
        rating: 4.5,
        distance: "1.1km",
        image: "https://via.placeholder.com/60x60",
        matchPercentage: 80,
      },
    ],
  };

  // dd 핸들러 함수들
  const handleCategoryClick = (categoryId) => {
    navigation.navigate('Category', { categoryId });
  };

  const handleTrendingFilterClick = (filter) => {
    setActiveTrendingFilter(filter);
  };

  const getActiveTrendingRestaurants = () => {
    switch (activeTrendingFilter) {
      case "nearby":
        return trendingRestaurants.nearby;
      case "popular":
        return trendingRestaurants.popular;
      case "new":
        return trendingRestaurants.new;
      default:
        return trendingRestaurants.nearby;
    }
  };

  const handleRestaurantPress = (restaurantId) => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  // Quick Access 버튼들 (dd 원본)
  const QuickAccessButtons = () => (
    <SectionLayout style={{ paddingTop: theme.spacing[3], paddingBottom: theme.spacing[3] }}>
      {/* dd: "grid grid-cols-3 gap-3" */}
      <GridLayout columns={3} gap={theme.spacing[3]}>
        
        {/* dd: 랜덤 추천 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Random')}
          style={{
            // dd: "bg-purple-50 rounded-lg p-3 h-24 flex flex-col items-center justify-center border border-purple-100"
            backgroundColor: theme.colors.accent, // purple-50에 해당
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[3],
            height: 96, // h-24 = 96px
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          {/* dd: "h-6 w-6 text-purple-600 mb-1" */}
          <Text style={{
            fontSize: 24, // 아이콘 크기 (h-6 w-6)
            marginBottom: theme.spacing[1],
          }}>✨</Text>
          {/* dd: "text-sm font-medium text-purple-800" */}
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: '500',
            color: theme.colors.primary,
          }}>랜 추</Text>
        </TouchableOpacity>

        {/* dd: 맛의 추억 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={{
            backgroundColor: theme.colors.accent,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[3],
            height: 96,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: theme.spacing[1] }}>🍽️</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: '500',
            color: theme.colors.primary,
          }}>맛의 추억</Text>
        </TouchableOpacity>

        {/* dd: 마감임박 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ExpiringIngredients')}
          style={{
            backgroundColor: theme.colors.accent,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[3],
            height: 96,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: theme.spacing[1] }}>⏰</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: '500',
            color: theme.colors.primary,
          }}>마감임박</Text>
        </TouchableOpacity>
      </GridLayout>
    </SectionLayout>
  );

  // dd 카테고리 섹션
  const CategorySection = () => (
    <SectionLayout 
      title="카테고리" 
      backgroundColor="white"
    >
      {/* dd: "grid grid-cols-4 gap-4" */}
      <GridLayout columns={4} gap={theme.spacing[4]}>
        {foodCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryClick(category.id)}
            style={{
              // dd: "flex flex-col items-center"
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* dd: "w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-1" */}
            <View style={{
              width: 56,  // w-14 = 56px
              height: 56, // h-14 = 56px
              borderRadius: 28, // rounded-full
              backgroundColor: theme.colors.accent, // purple-50
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing[1], // mb-1
            }}>
              {/* dd: "text-2xl" */}
              <Text style={{ fontSize: theme.typography.fontSize['2xl'] }}>
                {category.icon}
              </Text>
            </View>
            {/* dd: "text-xs" */}
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.foreground,
            }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </GridLayout>
    </SectionLayout>
  );

  // dd 추천 메뉴 섹션
  const RecommendedSection = () => (
    <SectionLayout 
      title="맛을 추천 메뉴"
      backgroundColor="white"
      moreAction={
        <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.primary,
            fontWeight: '500',
          }}>더보기 &gt;</Text>
        </TouchableOpacity>
      }
    >
      {/* dd: "flex gap-4 overflow-x-auto pb-2" */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing[4],
          paddingRight: theme.spacing[4],
        }}
      >
        {recommendedRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            onPress={() => handleRestaurantPress(restaurant.id)}
            style={{
              // dd: "min-w-[150px]"
              width: 150,
            }}
          >
            {/* dd: "relative h-[150px] w-[150px]" */}
            <View style={{
              position: 'relative',
              width: 150,
              height: 150,
              borderRadius: theme.borderRadius.lg,
              overflow: 'hidden',
              marginBottom: theme.spacing[2],
            }}>
              <Image
                source={{ uri: restaurant.image }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
              
              {/* dd: 별점 뱃지 "absolute top-2 right-2 bg-yellow-400 rounded-full px-1.5 py-0.5" */}
              <View style={{
                position: 'absolute',
                top: theme.spacing[2],
                right: theme.spacing[2],
                backgroundColor: '#facc15', // bg-yellow-400
                borderRadius: theme.borderRadius.full,
                paddingHorizontal: theme.spacing[1.5],
                paddingVertical: theme.spacing[0.5],
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 10, color: '#000' }}>★</Text>
                <Text style={{ 
                  fontSize: theme.typography.fontSize.xs, 
                  marginLeft: 2,
                  color: '#000'
                }}>
                  {restaurant.rating}
                </Text>
              </View>

              {/* dd: 매치율 "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70" */}
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: theme.spacing[2],
              }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                  내 입맛과 {restaurant.matchPercentage}% 일치
                </Text>
              </View>
            </View>

            {/* 식당 정보 */}
            <View>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: '500',
                color: theme.colors.foreground,
                marginBottom: 2,
              }}>
                {restaurant.name}
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.mutedForeground,
                marginBottom: theme.spacing[2],
              }}>
                {restaurant.category}
              </Text>
              
              {/* 태그들 */}
              <View style={{ flexDirection: 'row', gap: theme.spacing[1] }}>
                {restaurant.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.colors.muted,
                      paddingHorizontal: theme.spacing[2],
                      paddingVertical: theme.spacing[1],
                      borderRadius: theme.borderRadius.sm,
                    }}
                  >
                    <Text style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.mutedForeground,
                    }}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SectionLayout>
  );

  // dd 트렌딩 섹션
  const TrendingSection = () => (
    <SectionLayout 
      title="지금 뜨는 메뉴"
      backgroundColor="white"
      style={{ marginTop: theme.spacing[4] }}
      moreAction={
        <TouchableOpacity onPress={() => navigation.navigate('Trending')}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.primary,
            fontWeight: '500',
          }}>더보기 &gt;</Text>
        </TouchableOpacity>
      }
    >
      {/* dd: 필터 버튼들 "flex gap-2 overflow-x-auto" */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: theme.spacing[3] }}
        contentContainerStyle={{ gap: theme.spacing[2] }}
      >
        {[
          { key: 'nearby', label: '내 주변' },
          { key: 'popular', label: '인기 메뉴' },
          { key: 'new', label: '신규 등록' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            onPress={() => handleTrendingFilterClick(filter.key)}
            style={{
              // dd: active 시 "bg-purple-100 text-purple-700 font-medium"
              // dd: inactive 시 "bg-gray-100 text-gray-700"
              backgroundColor: activeTrendingFilter === filter.key 
                ? theme.colors.accent 
                : theme.colors.muted,
              paddingHorizontal: theme.spacing[3],
              paddingVertical: theme.spacing[1],
              borderRadius: theme.borderRadius.full,
            }}
          >
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: activeTrendingFilter === filter.key 
                ? theme.colors.primary 
                : theme.colors.mutedForeground,
              fontWeight: activeTrendingFilter === filter.key ? '500' : '400',
            }}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* dd: 레스토랑 리스트 "mt-3 space-y-3" */}
      <View style={{ gap: theme.spacing[3] }}>
        {getActiveTrendingRestaurants().map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            onPress={() => handleRestaurantPress(restaurant.id)}
            style={{
              // dd: "flex items-center p-2 border-b"
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: theme.spacing[2],
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}
          >
            {/* dd: "relative h-[60px] w-[60px] mr-3" */}
            <Image
              source={{ uri: restaurant.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: theme.borderRadius.md,
                marginRight: theme.spacing[3],
              }}
            />
            
            {/* dd: "flex-1" */}
            <View style={{ flex: 1 }}>
              {/* dd: "font-medium" */}
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: '500',
                color: theme.colors.foreground,
              }}>
                {restaurant.name}
              </Text>
              
              {/* dd: "text-xs text-gray-500" */}
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.mutedForeground,
              }}>
                {restaurant.category}
              </Text>
              
              {/* dd: 별점, 거리, 매치율 */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: theme.spacing[1],
              }}>
                <Text style={{ fontSize: 12, color: '#facc15' }}>★</Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: 'bold',
                  marginLeft: 2,
                }}>
                  {restaurant.rating}
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.mutedForeground,
                  marginLeft: theme.spacing[2],
                }}>
                  {restaurant.distance}
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.primary,
                  marginLeft: theme.spacing[2],
                }}>
                  내 입맛과 {restaurant.matchPercentage}% 일치
                </Text>
              </View>
            </View>

            {/* dd: 화살표 아이콘 "h-4 w-4 text-gray-400" */}
            <Text style={{
              fontSize: 16,
              color: theme.colors.mutedForeground,
            }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SectionLayout>
  );

  return (
    <ScreenLayout
      safeArea={true}
      padding={false}
      scrollable={true}
      backgroundColor={theme.colors.background}
      statusBarStyle="dark-content"
      header={
        <HomeHeader
          userName="김맛찾"
          onSearchPress={() => navigation.navigate('Search')}
          onProfilePress={() => navigation.navigate('MyInfo')}
        />
      }
    >
      {/* dd: "flex flex-col min-h-screen pb-20" */}
      <View style={{ paddingBottom: theme.spacing[20] }}>
        
        {/* Quick Access Buttons */}
        <QuickAccessButtons />
        
        {/* Categories */}
        <CategorySection />
        
        {/* Recommended Restaurants */}
        <RecommendedSection />
        
        {/* Trending Restaurants */}
        <TrendingSection />
      </View>
    </ScreenLayout>
  );
}