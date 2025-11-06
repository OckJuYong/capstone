// dd 스타일을 적용한 검색 페이지 (dd에는 별도 search 페이지가 없어서 Category 스타일 기반으로 구현)
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { ScreenLayout } from '../../layout';
import { SearchHeader } from '../../layout/Header';
import { Card, CardContent } from '../../ui';
import { lightThemeConfig } from '../../../theme';
// import restaurantData from '../../../data.json'; // 필요시 활성화

export default function SearchNew({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    '삼겹살', '피자', '치킨', '파스타', '김치찌개'
  ]);
  const [popularSearches] = useState([
    '한식', '중식', '일식', '양식', '치킨', '피자', '카페', '디저트'
  ]);
  
  const theme = lightThemeConfig;

  // 임시 데이터 (실제로는 data.json에서 가져오기)
  const mockRestaurants = [
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
      specialties: ["삼겹살", "김치찌개", "된장찌개"]
    },
    {
      id: 2,
      name: "홍콩반점",
      category: "중식",
      rating: 4.7,
      reviews: 324,
      distance: "2.1km",
      deliveryFee: "3,500원",
      image: "https://via.placeholder.com/120x120",
      description: "정통 중화요리를 맛볼 수 있는 곳입니다.",
      matchPercentage: 85,
      specialties: ["짜장면", "짬뽕", "탕수육"]
    },
    {
      id: 3,
      name: "스시히로",
      category: "일식",
      rating: 4.9,
      reviews: 412,
      distance: "2.3km",
      deliveryFee: "4,000원", 
      image: "https://via.placeholder.com/120x120",
      description: "신선한 해산물로 만한 정통 일식을 제공합니다.",
      matchPercentage: 94,
      specialties: ["모듬초밥", "연어초밥", "우동"]
    }
  ];

  const categories = [
    { id: "korean", name: "한식", emoji: "🍚" },
    { id: "chinese", name: "중식", emoji: "🥢" },
    { id: "japanese", name: "일식", emoji: "🍣" },
    { id: "western", name: "양식", emoji: "🍝" },
    { id: "cafe", name: "카페", emoji: "☕" },
    { id: "chicken", name: "치킨", emoji: "🍗" },
    { id: "pizza", name: "피자", emoji: "🍕" },
    { id: "fastfood", name: "패스트푸드", emoji: "🍔" },
  ];

  useEffect(() => {
    if (searchText === '') {
      setFilteredRestaurants([]);
    } else {
      const filtered = mockRestaurants.filter(restaurant => {
        const nameMatch = restaurant.name.toLowerCase().includes(searchText.toLowerCase());
        const categoryInfo = categories.find(cat => cat.id === restaurant.category.toLowerCase());
        const categoryMatch = categoryInfo?.name.toLowerCase().includes(searchText.toLowerCase());
        const menuMatch = restaurant.specialties.some(menu =>
          menu.toLowerCase().includes(searchText.toLowerCase())
        );
        return nameMatch || categoryMatch || menuMatch;
      });
      setFilteredRestaurants(filtered);
    }
  }, [searchText]);

  const handleSearch = () => {
    if (searchText.trim() && !recentSearches.includes(searchText.trim())) {
      setRecentSearches(prev => [searchText.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleSearchTextSelect = (text) => {
    setSearchText(text);
  };

  const navigateToDetail = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const getCategoryInfo = (categoryName) => {
    return categories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase() || 
      cat.id.toLowerCase() === categoryName.toLowerCase()
    );
  };

  // dd Category 스타일을 적용한 검색 결과 아이템
  const renderRestaurantItem = ({ item: restaurant }) => (
    <TouchableOpacity
      onPress={() => navigateToDetail(restaurant)}
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

  // 검색어 태그 컴포넌트 (dd Category 필터 스타일)
  const SearchTag = ({ text, onPress }) => (
    <TouchableOpacity
      onPress={() => onPress(text)}
      style={{
        // dd: "px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap"
        paddingHorizontal: theme.spacing[3],
        paddingVertical: theme.spacing[1],
        backgroundColor: theme.colors.muted, // gray-100
        borderRadius: theme.borderRadius.full,
        marginRight: theme.spacing[2],
        marginBottom: theme.spacing[2],
      }}
    >
      <Text style={{
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.mutedForeground,
      }}>
        {text}
      </Text>
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
        <SearchHeader
          searchValue={searchText}
          onSearchChange={setSearchText}
          onSearchSubmit={handleSearch}
          onBackPress={() => navigation.goBack()}
          placeholder="음식점, 카테고리, 메뉴를 검색하세요"
        />
      }
    >
      {/* dd: "flex flex-1" */}
      <View style={{ flex: 1 }}>
        
        {searchText === '' ? (
          // 검색 전 상태: 최근 검색어 + 인기 검색어
          <ScrollView style={{ flex: 1, padding: theme.spacing[4] }}>
            
            {/* 최근 검색어 */}
            <View style={{ marginBottom: theme.spacing[6] }}>
              <Text style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '600',
                color: theme.colors.foreground,
                marginBottom: theme.spacing[3],
              }}>
                최근 검색어
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {recentSearches.map((search, index) => (
                  <SearchTag
                    key={index}
                    text={search}
                    onPress={handleSearchTextSelect}
                  />
                ))}
              </View>
            </View>

            {/* 인기 검색어 */}
            <View>
              <Text style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '600',
                color: theme.colors.foreground,
                marginBottom: theme.spacing[3],
              }}>
                인기 검색어
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {popularSearches.map((search, index) => (
                  <SearchTag
                    key={index}
                    text={search}
                    onPress={handleSearchTextSelect}
                  />
                ))}
              </View>
            </View>

            {/* 카테고리 바로가기 */}
            <View style={{ marginTop: theme.spacing[6] }}>
              <Text style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '600',
                color: theme.colors.foreground,
                marginBottom: theme.spacing[3],
              }}>
                카테고리별 찾기
              </Text>
              
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing[3],
              }}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => navigation.navigate('Category', { categoryId: category.id })}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: theme.colors.accent,
                      paddingHorizontal: theme.spacing[3],
                      paddingVertical: theme.spacing[2],
                      borderRadius: theme.borderRadius.lg,
                      width: '47%', // 2열 그리드
                    }}
                  >
                    <Text style={{ fontSize: 20, marginRight: theme.spacing[2] }}>
                      {category.emoji}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.foreground,
                      fontWeight: '500',
                    }}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          // 검색 결과 표시
          <View style={{ flex: 1, padding: theme.spacing[4] }}>
            
            {/* 검색 결과 헤더 */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing[4] 
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: '500',
                color: theme.colors.foreground,
              }}>
                '{searchText}' 검색 결과 {filteredRestaurants.length}개
              </Text>
            </View>

            {filteredRestaurants.length > 0 ? (
              <FlatList
                data={filteredRestaurants}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: theme.spacing[4] }}
              />
            ) : (
              // dd 스타일 빈 상태 메시지
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: theme.spacing[10],
              }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.lg,
                  color: theme.colors.mutedForeground,
                  textAlign: 'center',
                  marginBottom: theme.spacing[2],
                }}>
                  검색 결과가 없습니다
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.mutedForeground,
                  textAlign: 'center',
                }}>
                  다른 검색어를 시도해보세요
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}