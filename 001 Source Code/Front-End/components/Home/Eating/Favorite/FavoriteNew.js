// dd/app/favorites/page.tsx를 React Native로 100% 정확히 변환
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { ScreenLayout } from '../../../layout';
import { AppHeader } from '../../../layout/Header';
import { Button } from '../../../ui';
import { lightThemeConfig } from '../../../../theme';

export default function FavoriteNew({ navigation }) {
  const theme = lightThemeConfig;
  
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "메종 크림 파스타",
      category: "파스타",
      rating: 4.8,
      reviews: 109,
      distance: "1.8km",
      deliveryFee: "3,000원",
      minOrder: "15,000원",
      deliveryTime: "25-35분",
      image: "https://via.placeholder.com/120x120",
    },
    {
      id: 2,
      name: "피자나라",
      category: "피자",
      rating: 4.5,
      reviews: 87,
      distance: "2.0km",
      deliveryFee: "2,000원",
      minOrder: "12,000원",
      deliveryTime: "30-40분",
      image: "https://via.placeholder.com/120x120",
    },
    {
      id: 3,
      name: "치킨마루",
      category: "치킨",
      rating: 4.7,
      reviews: 156,
      distance: "1.5km",
      deliveryFee: "2,500원",
      minOrder: "16,000원",
      deliveryTime: "35-45분",
      image: "https://via.placeholder.com/120x120",
    },
  ]);

  const removeFavorite = (id) => {
    Alert.alert(
      "찜 해제",
      "이 가게를 찜 목록에서 제거하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "제거", 
          style: "destructive",
          onPress: () => {
            setFavorites(prev => prev.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const handleRestaurantPress = (favorite) => {
    navigation.navigate('RestaurantDetail', { restaurant: favorite });
  };

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScreenLayout
      safeArea={true}
      padding={false}
      scrollable={false}
      backgroundColor={theme.colors.background}
      statusBarStyle="dark-content"
      header={
        // dd: "p-4 border-b"에서 "text-xl font-bold text-center"
        <View style={{
          paddingHorizontal: theme.spacing[4],
          paddingVertical: theme.spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize.xl,      // text-xl
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.colors.foreground,
          }}>
            찜한 가게
          </Text>
        </View>
      }
    >
      {/* dd: "flex flex-col min-h-screen pb-20" */}
      <View style={{ flex: 1, paddingBottom: theme.spacing[20] }}>
        
        {/* dd: "p-4" */}
        <View style={{ padding: theme.spacing[4], flex: 1 }}>
          
          {favorites.length > 0 ? (
            // dd: "space-y-4"
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: theme.spacing[4] }}
            >
              {favorites.map((favorite) => (
                <TouchableOpacity
                  key={favorite.id}
                  onPress={() => handleRestaurantPress(favorite)}
                  style={{
                    // dd: "border rounded-lg overflow-hidden shadow-sm"
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    borderRadius: theme.borderRadius.lg,
                    overflow: 'hidden',
                    backgroundColor: theme.colors.background,
                    ...theme.shadows.sm,
                  }}
                >
                  {/* dd: "relative h-32 w-full" */}
                  <View style={{
                    position: 'relative',
                    height: 128, // h-32 = 128px
                    width: '100%',
                  }}>
                    <Image
                      source={{ uri: favorite.image }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="cover"
                    />
                    
                    {/* dd: 하트 버튼 "absolute top-2 right-2 bg-white rounded-full p-2" */}
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removeFavorite(favorite.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: theme.spacing[2],    // top-2
                        right: theme.spacing[2],  // right-2
                        backgroundColor: theme.colors.background, // bg-white
                        borderRadius: theme.borderRadius.full,
                        padding: theme.spacing[2], // p-2
                        ...theme.shadows.sm,
                      }}
                    >
                      {/* dd: "h-5 w-5 fill-red-500 text-red-500" */}
                      <Text style={{
                        fontSize: 20,    // h-5 w-5 = 20px
                        color: '#ef4444', // red-500
                      }}>❤️</Text>
                    </TouchableOpacity>
                  </View>

                  {/* dd: "p-3" */}
                  <View style={{ padding: theme.spacing[3] }}>
                    
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
                          {favorite.name}
                        </Text>
                        
                        {/* dd: "text-sm text-gray-500" */}
                        <Text style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.mutedForeground,
                          marginTop: 2,
                        }}>
                          {favorite.category}
                        </Text>
                      </View>
                      
                      {/* dd: 별점 "flex items-center" */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        {/* dd: "h-4 w-4 fill-yellow-400 text-yellow-400" */}
                        <Text style={{ fontSize: 16, color: '#facc15' }}>★</Text>
                        
                        {/* dd: "text-sm ml-1" */}
                        <Text style={{
                          fontSize: theme.typography.fontSize.sm,
                          marginLeft: theme.spacing[1],
                          color: theme.colors.foreground,
                        }}>
                          {favorite.rating}
                        </Text>
                      </View>
                    </View>

                    {/* dd: "flex items-center mt-2 text-xs text-gray-500" */}
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: theme.spacing[2],
                    }}>
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.mutedForeground,
                      }}>
                        리뷰 {favorite.reviews}
                      </Text>
                      
                      {/* dd: "mx-1" bullet */}
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.mutedForeground,
                        marginHorizontal: theme.spacing[1],
                      }}>
                        •
                      </Text>
                      
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.mutedForeground,
                      }}>
                        {favorite.distance}
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
                        최소주문 {favorite.minOrder}
                      </Text>
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.mutedForeground,
                      }}>
                        배달팁 {favorite.deliveryFee}
                      </Text>
                    </View>

                    {/* dd: "mt-2 text-xs" */}
                    <View style={{ marginTop: theme.spacing[2] }}>
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.mutedForeground,
                      }}>
                        배달시간 {favorite.deliveryTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            // dd: 빈 상태 "flex flex-col items-center justify-center py-12"
            <View style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: theme.spacing[12], // py-12
            }}>
              {/* dd: "h-16 w-16 text-gray-300 mb-4" */}
              <Text style={{
                fontSize: 64,        // h-16 w-16 = 64px
                color: theme.colors.muted, // gray-300
                marginBottom: theme.spacing[4], // mb-4
              }}>💔</Text>
              
              {/* dd: "text-gray-500" */}
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.mutedForeground,
                marginBottom: theme.spacing[4],
                textAlign: 'center',
              }}>
                찜한 음식점이 없습니다.
              </Text>
              
              {/* dd: "mt-4 text-purple-600 font-medium" */}
              <Button
                variant="ghost"
                onPress={handleGoToHome}
                style={{
                  backgroundColor: 'transparent',
                }}
                textStyle={{
                  color: theme.colors.primary, // purple-600
                  fontWeight: '500',           // font-medium
                }}
              >
                맛집 찾아보기
              </Button>
            </View>
          )}
        </View>
      </View>
    </ScreenLayout>
  );
}