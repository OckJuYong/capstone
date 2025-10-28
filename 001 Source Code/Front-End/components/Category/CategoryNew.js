// dd/app/category/[id]/page.tsx를 React Native로 100% 정확히 변환
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { ScreenLayout } from '../layout';
import { AppHeader } from '../layout/Header';
import { lightThemeConfig } from '../../theme';

export default function CategoryNew({ route, navigation }) {
  const { categoryId = 'korean' } = route.params || {};
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategoryTab, setActiveCategoryTab] = useState(categoryId);
  const [sortFilter, setSortFilter] = useState('popular'); // 인기순, 거리순, 배달팁낮은순, 리뷰많은순
  
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

  const restaurants = {
    korean: [
      {
        id: 1,
        name: "대치삼겹호르몬리무",
        category: "한식",
        rating: 4.8,
        reviews: 109,
        distance: "1.8km",
        deliveryFee: "3,000원",
        image: "https://via.placeholder.com/120x120",
        description: "신선한 재료로 만든 정통 한식을 제공합니다.",
        matchPercentage: 92,
        menu: [
          { name: "삼겹살", price: 15000, description: "국내산 돼지고기 삼겹살" },
          { name: "김치찌개", price: 8000, description: "진한 맛의 김치찌개" },
          { name: "된장찌개", price: 8000, description: "구수한 된장찌개" },
        ],
      },
      {
        id: 2,
        name: "천상궁물",
        category: "한식",
        rating: 4.6,
        reviews: 517,
        distance: "1.5km",
        deliveryFee: "2,000원",
        image: "https://via.placeholder.com/120x120",
        description: "전통 방식으로 만든 한식 전문점입니다.",
        matchPercentage: 88,
        menu: [
          { name: "갈비탕", price: 12000, description: "진한 국물의 갈비탕" },
          { name: "비빔밥", price: 9000, description: "신선한 야채가 들어간 비빔밥" },
          { name: "불고기", price: 15000, description: "달콤한 양념의 불고기" },
        ],
      },
    ],
    chinese: [
      {
        id: 3,
        name: "홍콩반점",
        category: "중식",
        rating: 4.7,
        reviews: 324,
        distance: "2.1km",
        deliveryFee: "3,500원",
        image: "https://via.placeholder.com/120x120",
        description: "정통 중화요리를 맛볼 수 있는 곳입니다.",
        matchPercentage: 85,
        menu: [
          { name: "짜장면", price: 7000, description: "진한 춘장의 짜장면" },
          { name: "짬뽕", price: 8000, description: "매콤한 해물 짬뽕" },
          { name: "탕수육", price: 18000, description: "바삭한 탕수육" },
        ],
      },
    ],
    japanese: [
      {
        id: 5,
        name: "스시히로",
        category: "일식",
        rating: 4.9,
        reviews: 412,
        distance: "2.3km",
        deliveryFee: "4,000원",
        image: "https://via.placeholder.com/120x120",
        description: "신선한 해산물로 만든 정통 일식을 제공합니다.",
        matchPercentage: 94,
        menu: [
          { name: "모듬초밥", price: 25000, description: "신선한 해산물로 만든 모듬초밥" },
          { name: "연어초밥", price: 15000, description: "신선한 연어초밥" },
          { name: "우동", price: 9000, description: "깊은 맛의 우동" },
        ],
      },
    ],
    western: [],
    cafe: [],
    chicken: [],
    pizza: [],
    fastfood: [],
  };

  const getCategoryName = (id) => {
    const category = foodCategories.find((cat) => cat.id === id);
    return category ? category.name : "음식점";
  };

  const handleRestaurantClick = (restaurantId) => {
    const restaurant = currentCategoryRestaurants.find(r => r.id === restaurantId);
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const currentCategoryRestaurants = restaurants[activeCategoryTab] || [];

  // 정렬 필터
  const getSortedRestaurants = () => {
    let sorted = [...currentCategoryRestaurants];
    
    switch (sortFilter) {
      case 'popular':
        return sorted.sort((a, b) => b.matchPercentage - a.matchPercentage);
      case 'distance':
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      case 'delivery':
        return sorted.sort((a, b) => parseInt(a.deliveryFee.replace(/,/g, '')) - parseInt(b.deliveryFee.replace(/,/g, '')));
      case 'reviews':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      default:
        return sorted;
    }
  };

  // dd 레스토랑 아이템 컴포넌트
  const renderRestaurantItem = ({ item: restaurant }) => (
    <TouchableOpacity
      onPress={() => handleRestaurantClick(restaurant.id)}
      style={{
        // dd: "border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:border-purple-300"
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        marginBottom: theme.spacing[4],
        backgroundColor: theme.colors.background,
        ...theme.shadows.sm,
      }}
    >
      {/* dd: "flex" */}
      <View style={{ flexDirection: 'row' }}>
        {/* dd: "relative w-24 h-24" */}
        <Image
          source={{ uri: restaurant.image }}
          style={{
            width: 96,  // w-24 = 96px
            height: 96, // h-24 = 96px
          }}
        />
        
        {/* dd: "p-3 flex-1" */}
        <View style={{
          padding: theme.spacing[3], // p-3
          flex: 1,
        }}>
          {/* dd: "flex justify-between items-start" */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
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
                marginTop: 2,
              }}>
                {restaurant.category}
              </Text>
            </View>
            
            {/* dd: 매치율 뱃지 "bg-purple-100 rounded-full px-2 py-0.5" */}
            <View style={{
              backgroundColor: theme.colors.accent, // purple-100
              borderRadius: theme.borderRadius.full,
              paddingHorizontal: theme.spacing[2],
              paddingVertical: theme.spacing[0.5],
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: '500',
                color: theme.colors.primary, // purple-700
              }}>
                {restaurant.matchPercentage}%
              </Text>
            </View>
          </View>

          {/* dd: 별점 정보 "flex items-center mt-1" */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.spacing[1],
          }}>
            {/* dd: 별점 아이콘 "h-4 w-4 fill-yellow-400 text-yellow-400" */}
            <Text style={{ fontSize: 16, color: '#facc15' }}>★</Text>
            
            {/* dd: "text-sm ml-1" */}
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              marginLeft: theme.spacing[1],
              color: theme.colors.foreground,
            }}>
              {restaurant.rating}
            </Text>
            
            {/* dd: "text-xs text-gray-500 ml-2" */}
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.mutedForeground,
              marginLeft: theme.spacing[2],
            }}>
              리뷰 {restaurant.reviews}
            </Text>
          </View>

          {/* dd: "flex justify-between mt-2 text-xs" */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing[2],
          }}>
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.mutedForeground,
            }}>
              {restaurant.distance}
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.mutedForeground,
            }}>
              배달팁 {restaurant.deliveryFee}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout
      safeArea={true}
      padding={false}
      scrollable={false}
      backgroundColor={theme.colors.background}
      statusBarStyle="dark-content"
      header={
        <AppHeader
          title={getCategoryName(activeCategoryTab)}
          showBackButton={true}
          navigation={navigation}
        />
      }
    >
      {/* dd: "flex flex-col min-h-screen pb-20" */}
      <View style={{ flex: 1, paddingBottom: theme.spacing[20] }}>
        
        {/* dd: 카테고리 탭들 "px-4" */}
        <View style={{ paddingHorizontal: theme.spacing[4] }}>
          {/* dd: "flex overflow-x-auto gap-2 pb-2" */}
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: theme.spacing[2], paddingBottom: theme.spacing[2] }}
          >
            {foodCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategoryTab(category.id)}
                style={{
                  // dd: active 시 "bg-purple-100 text-purple-700 font-medium"
                  // dd: inactive 시 "bg-gray-100 text-gray-700"
                  paddingHorizontal: theme.spacing[3],
                  paddingVertical: theme.spacing[1],
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: activeCategoryTab === category.id 
                    ? theme.colors.accent    // purple-100
                    : theme.colors.muted,    // gray-100
                }}
              >
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: activeCategoryTab === category.id 
                    ? theme.colors.primary        // purple-700
                    : theme.colors.mutedForeground, // gray-700
                  fontWeight: activeCategoryTab === category.id ? '500' : '400',
                }}>
                  {category.icon} {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* dd: "flex flex-1" */}
        <View style={{ flex: 1 }}>
          {/* dd: "w-full p-4 overflow-y-auto" */}
          <View style={{ flex: 1, padding: theme.spacing[4] }}>
            
            {/* dd: 정렬 필터 버튼들 "flex gap-2 overflow-x-auto mb-4" */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: theme.spacing[4] }}
              contentContainerStyle={{ gap: theme.spacing[2] }}
            >
              {[
                { key: 'popular', label: '인기순' },
                { key: 'distance', label: '거리순' },
                { key: 'delivery', label: '배달팁 낮은순' },
                { key: 'reviews', label: '리뷰 많은순' },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  onPress={() => setSortFilter(filter.key)}
                  style={{
                    paddingHorizontal: theme.spacing[3],
                    paddingVertical: theme.spacing[1],
                    backgroundColor: sortFilter === filter.key 
                      ? theme.colors.accent 
                      : theme.colors.muted,
                    borderRadius: theme.borderRadius.full,
                  }}
                >
                  <Text style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: sortFilter === filter.key 
                      ? theme.colors.primary 
                      : theme.colors.mutedForeground,
                    fontWeight: sortFilter === filter.key ? '500' : '400',
                  }}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* dd: "space-y-4" */}
            {getSortedRestaurants().length > 0 ? (
              <FlatList
                data={getSortedRestaurants()}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: theme.spacing[4] }}
              />
            ) : (
              // dd: 빈 상태 메시지 "text-center py-10 text-gray-500"
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: theme.spacing[10], // py-10
              }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.mutedForeground, // text-gray-500
                  textAlign: 'center',
                }}>
                  해당 카테고리의 음식점이 없습니다.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}