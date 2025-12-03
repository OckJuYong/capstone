// dd/app/category/[id]/page.tsx를 React Native로 100% 정확히 변환
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { ScreenLayout } from '../layout';
import { AppHeader } from '../layout/Header';
import { lightThemeConfig } from '../../theme';
import { FOOD_IMAGES, CATEGORY_IMAGES } from '../../constants/images';

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
        id: 101,
        name: "대치삼겹호르몬리무",
        category: "한식",
        rating: 4.8,
        reviews: 109,
        distance: "1.8km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.korean_5,
        description: "신선한 재료로 만든 정통 한식을 제공합니다.",
        matchPercentage: 92,
      },
      {
        id: 102,
        name: "천상궁물",
        category: "한식",
        rating: 4.6,
        reviews: 517,
        distance: "1.5km",
        deliveryFee: "2,000원",
        image: FOOD_IMAGES.korean_2,
        description: "전통 방식으로 만든 한식 전문점입니다.",
        matchPercentage: 88,
      },
      {
        id: 103,
        name: "김치찌개 마을",
        category: "한식",
        rating: 4.7,
        reviews: 283,
        distance: "1.2km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.korean_7,
        description: "깊은 맛의 김치찌개 전문점.",
        matchPercentage: 90,
      },
      {
        id: 104,
        name: "숯불갈비 명가",
        category: "한식",
        rating: 4.9,
        reviews: 721,
        distance: "2.0km",
        deliveryFee: "3,500원",
        image: FOOD_IMAGES.korean_8,
        description: "참숯으로 구운 프리미엄 갈비.",
        matchPercentage: 95,
      },
    ],
    chinese: [
      {
        id: 201,
        name: "홍콩반점",
        category: "중식",
        rating: 4.7,
        reviews: 324,
        distance: "2.1km",
        deliveryFee: "3,500원",
        image: FOOD_IMAGES.chinese_2,
        description: "정통 중화요리를 맛볼 수 있는 곳입니다.",
        matchPercentage: 85,
      },
      {
        id: 202,
        name: "딤섬하우스",
        category: "중식",
        rating: 4.5,
        reviews: 198,
        distance: "1.7km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.chinese_5,
        description: "수제 딤섬과 만두 전문점.",
        matchPercentage: 82,
      },
      {
        id: 203,
        name: "마라탕 천국",
        category: "중식",
        rating: 4.6,
        reviews: 456,
        distance: "1.3km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.chinese_1,
        description: "얼얼한 마라탕 전문점.",
        matchPercentage: 87,
      },
    ],
    japanese: [
      {
        id: 301,
        name: "스시히로",
        category: "일식",
        rating: 4.9,
        reviews: 412,
        distance: "2.3km",
        deliveryFee: "4,000원",
        image: FOOD_IMAGES.japanese_2,
        description: "신선한 해산물로 만든 정통 일식을 제공합니다.",
        matchPercentage: 94,
      },
      {
        id: 302,
        name: "라멘 이치란",
        category: "일식",
        rating: 4.8,
        reviews: 567,
        distance: "1.9km",
        deliveryFee: "3,500원",
        image: FOOD_IMAGES.japanese_3,
        description: "진한 돈코츠 라멘 전문점.",
        matchPercentage: 91,
      },
      {
        id: 303,
        name: "돈카츠 명인",
        category: "일식",
        rating: 4.7,
        reviews: 389,
        distance: "1.5km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.japanese_6,
        description: "바삭하고 촉촉한 수제 돈카츠.",
        matchPercentage: 89,
      },
    ],
    western: [
      {
        id: 401,
        name: "라 테라스",
        category: "양식",
        rating: 4.7,
        reviews: 256,
        distance: "1.9km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.western_2,
        description: "정통 이탈리안 파스타 전문점입니다.",
        matchPercentage: 89,
      },
      {
        id: 402,
        name: "스테이크 하우스",
        category: "양식",
        rating: 4.8,
        reviews: 412,
        distance: "2.5km",
        deliveryFee: "4,000원",
        image: FOOD_IMAGES.western_3,
        description: "프리미엄 스테이크 전문점.",
        matchPercentage: 92,
      },
      {
        id: 403,
        name: "샐러드팜",
        category: "양식",
        rating: 4.5,
        reviews: 178,
        distance: "0.9km",
        deliveryFee: "2,000원",
        image: FOOD_IMAGES.western_5,
        description: "신선한 유기농 샐러드.",
        matchPercentage: 84,
      },
    ],
    cafe: [
      {
        id: 501,
        name: "카페 드 플로르",
        category: "카페",
        rating: 4.6,
        reviews: 189,
        distance: "0.8km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.cafe_2,
        description: "프리미엄 원두로 내린 커피와 디저트.",
        matchPercentage: 82,
      },
      {
        id: 502,
        name: "디저트 라운지",
        category: "카페",
        rating: 4.7,
        reviews: 267,
        distance: "1.1km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.cafe_3,
        description: "수제 케이크와 마카롱.",
        matchPercentage: 85,
      },
      {
        id: 503,
        name: "브런치 클럽",
        category: "카페",
        rating: 4.5,
        reviews: 156,
        distance: "1.4km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.cafe_6,
        description: "건강한 브런치 전문점.",
        matchPercentage: 80,
      },
    ],
    chicken: [
      {
        id: 601,
        name: "황금올리브치킨",
        category: "치킨",
        rating: 4.8,
        reviews: 892,
        distance: "1.2km",
        deliveryFee: "2,000원",
        image: FOOD_IMAGES.chicken_2,
        description: "바삭하고 촉촉한 프리미엄 치킨.",
        matchPercentage: 91,
      },
      {
        id: 602,
        name: "양념치킨 본점",
        category: "치킨",
        rating: 4.7,
        reviews: 634,
        distance: "0.9km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.chicken_3,
        description: "매콤달콤 양념치킨의 원조.",
        matchPercentage: 88,
      },
      {
        id: 603,
        name: "치킨윙 마스터",
        category: "치킨",
        rating: 4.6,
        reviews: 421,
        distance: "1.5km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.chicken_4,
        description: "다양한 소스의 치킨윙.",
        matchPercentage: 85,
      },
    ],
    pizza: [
      {
        id: 701,
        name: "나폴리 화덕피자",
        category: "피자",
        rating: 4.7,
        reviews: 445,
        distance: "2.0km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.pizza_1,
        description: "이탈리아 정통 화덕 피자.",
        matchPercentage: 87,
      },
      {
        id: 702,
        name: "페퍼로니 킹",
        category: "피자",
        rating: 4.6,
        reviews: 356,
        distance: "1.6km",
        deliveryFee: "3,500원",
        image: FOOD_IMAGES.pizza_2,
        description: "페퍼로니 피자 전문점.",
        matchPercentage: 84,
      },
      {
        id: 703,
        name: "시카고 딥디쉬",
        category: "피자",
        rating: 4.8,
        reviews: 289,
        distance: "2.3km",
        deliveryFee: "4,000원",
        image: FOOD_IMAGES.pizza_3,
        description: "두툼한 시카고 스타일 피자.",
        matchPercentage: 90,
      },
    ],
    fastfood: [
      {
        id: 801,
        name: "버거킹",
        category: "패스트푸드",
        rating: 4.3,
        reviews: 1256,
        distance: "0.5km",
        deliveryFee: "2,500원",
        image: FOOD_IMAGES.burger_1,
        description: "불맛 가득한 와퍼 전문점.",
        matchPercentage: 78,
      },
      {
        id: 802,
        name: "쉐이크쉑",
        category: "패스트푸드",
        rating: 4.5,
        reviews: 867,
        distance: "1.0km",
        deliveryFee: "3,000원",
        image: FOOD_IMAGES.burger_2,
        description: "프리미엄 수제버거.",
        matchPercentage: 83,
      },
      {
        id: 803,
        name: "파이브가이즈",
        category: "패스트푸드",
        rating: 4.6,
        reviews: 534,
        distance: "1.8km",
        deliveryFee: "3,500원",
        image: FOOD_IMAGES.burger_3,
        description: "미국 정통 수제버거.",
        matchPercentage: 86,
      },
    ],
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