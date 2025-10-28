// dd/app/cart/page.tsx를 React Native로 100% 정확히 변환
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { ScreenLayout } from '../layout';
import { AppHeader } from '../layout/Header';
import { Button, Input } from '../ui';
import { lightThemeConfig } from '../../theme';

export default function CartNew({ route, navigation }) {
  const { restaurantId } = route.params || {};
  const theme = lightThemeConfig;

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "크림 파스타",
      price: 15000,
      quantity: 1,
      image: "https://via.placeholder.com/80x80",
      options: ["스파게티", "새우 추가"],
    },
    {
      id: 2,
      name: "토마토 파스타",
      price: 14000,
      quantity: 1,
      image: "https://via.placeholder.com/80x80",
      options: ["페투치니"],
    },
  ]);

  const [restaurant] = useState({
    id: restaurantId,
    name: "메종 크림 파스타",
    deliveryFee: 3000,
  });

  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [requestText, setRequestText] = useState("");

  const increaseQuantity = (itemId) => {
    setCartItems(cartItems.map((item) => 
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (itemId) => {
    Alert.alert(
      "메뉴 삭제",
      "이 메뉴를 장바구니에서 제거하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "제거", 
          style: "destructive",
          onPress: () => {
            setCartItems(cartItems.filter((item) => item.id !== itemId));
          }
        }
      ]
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + restaurant.deliveryFee;

  const handleCheckout = () => {
    navigation.navigate('Payment', { 
      restaurantId, 
      cartItems, 
      total,
      deliveryOption,
      requestText 
    });
  };

  const goToRestaurant = () => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  // dd 수량 조절 버튼 컴포넌트
  const QuantityButton = ({ onPress, disabled, children }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        // dd: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        width: 32,     // w-8 = 32px
        height: 32,    // h-8 = 32px
        borderRadius: 16, // rounded-full
        backgroundColor: disabled ? theme.colors.muted : theme.colors.muted, // bg-gray-100
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={{
        fontSize: 16,    // h-4 w-4 크기에 맞춤
        color: theme.colors.mutedForeground,
        fontWeight: '500',
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );

  // dd 라디오 버튼 컴포넌트 (간단 구현)
  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing[4],
      }}
    >
      <View style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        backgroundColor: selected ? theme.colors.primary : 'transparent',
        marginRight: theme.spacing[2],
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {selected && (
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.colors.primaryForeground,
          }} />
        )}
      </View>
      <Text style={{
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.foreground,
      }}>
        {label}
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
        <AppHeader
          title="장바구니"
          showBackButton={true}
          navigation={navigation}
        />
      }
    >
      {/* dd: "flex flex-col min-h-screen" */}
      <View style={{ flex: 1 }}>
        
        {/* dd: "p-4 flex-1" */}
        <ScrollView style={{ flex: 1, padding: theme.spacing[4] }}>
          
          {/* dd: 레스토랑 이름 "font-medium mb-4" */}
          <Text style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: '500',
            color: theme.colors.foreground,
            marginBottom: theme.spacing[4],
          }}>
            {restaurant.name}
          </Text>

          {/* dd: 배달/포장 옵션 "mb-4" */}
          <View style={{ marginBottom: theme.spacing[4] }}>
            {/* dd: "flex space-x-4" */}
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                selected={deliveryOption === "delivery"}
                onPress={() => setDeliveryOption("delivery")}
                label="배달"
              />
              <RadioButton
                selected={deliveryOption === "pickup"}
                onPress={() => setDeliveryOption("pickup")}
                label="포장"
              />
            </View>
          </View>

          {cartItems.length > 0 ? (
            <>
              {/* dd: 장바구니 아이템들 "space-y-4 mb-6" */}
              <View style={{ gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
                {cartItems.map((item) => (
                  <View 
                    key={item.id}
                    style={{
                      // dd: "bg-white rounded-lg border p-4"
                      backgroundColor: theme.colors.background,
                      borderRadius: theme.borderRadius.lg,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      padding: theme.spacing[4],
                    }}
                  >
                    {/* dd: "flex justify-between items-start" */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      {/* dd: "flex" */}
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        {/* dd: "w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3" */}
                        <View style={{
                          width: 64,    // w-16 = 64px
                          height: 64,   // h-16 = 64px
                          backgroundColor: theme.colors.muted, // bg-gray-200
                          borderRadius: theme.borderRadius.md,
                          overflow: 'hidden',
                          marginRight: theme.spacing[3], // mr-3
                        }}>
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 64, height: 64 }}
                            resizeMode="cover"
                          />
                        </View>

                        <View style={{ flex: 1 }}>
                          {/* dd: "font-medium" */}
                          <Text style={{
                            fontSize: theme.typography.fontSize.base,
                            fontWeight: '500',
                            color: theme.colors.foreground,
                          }}>
                            {item.name}
                          </Text>
                          
                          {/* dd: 옵션들 "mt-1" */}
                          {item.options.length > 0 && (
                            <View style={{ marginTop: theme.spacing[1] }}>
                              {item.options.map((option, index) => (
                                <Text 
                                  key={index}
                                  style={{
                                    fontSize: theme.typography.fontSize.xs,
                                    color: theme.colors.mutedForeground,
                                  }}
                                >
                                  · {option}
                                </Text>
                              ))}
                            </View>
                          )}
                        </View>
                      </View>

                      {/* dd: 삭제 버튼 "text-gray-400" */}
                      <TouchableOpacity 
                        onPress={() => removeItem(item.id)}
                        style={{ padding: theme.spacing[1] }}
                      >
                        <Text style={{
                          fontSize: 20,
                          color: theme.colors.mutedForeground,
                        }}>×</Text>
                      </TouchableOpacity>
                    </View>

                    {/* dd: "flex justify-between items-center mt-3" */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: theme.spacing[3],
                    }}>
                      {/* dd: 수량 조절 "flex items-center" */}
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <QuantityButton
                          onPress={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </QuantityButton>
                        
                        {/* dd: "mx-3 w-6 text-center" */}
                        <Text style={{
                          marginHorizontal: theme.spacing[3],
                          minWidth: 24,      // w-6 = 24px
                          textAlign: 'center',
                          fontSize: theme.typography.fontSize.base,
                          color: theme.colors.foreground,
                        }}>
                          {item.quantity}
                        </Text>
                        
                        <QuantityButton onPress={() => increaseQuantity(item.id)}>
                          +
                        </QuantityButton>
                      </View>

                      {/* dd: "font-medium" */}
                      <Text style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: '500',
                        color: theme.colors.foreground,
                      }}>
                        {(item.price * item.quantity).toLocaleString()}원
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* dd: 요청사항 "mb-6" */}
              <View style={{ marginBottom: theme.spacing[6] }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: '500',
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2],
                }}>
                  요청사항
                </Text>
                <Input
                  placeholder="요청사항을 입력해주세요..."
                  value={requestText}
                  onChangeText={setRequestText}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              {/* dd: 결제 요약 "space-y-2 mb-6 bg-gray-50 p-4 rounded-lg" */}
              <View style={{
                gap: theme.spacing[2],
                marginBottom: theme.spacing[6],
                backgroundColor: theme.colors.muted, // bg-gray-50
                padding: theme.spacing[4],
                borderRadius: theme.borderRadius.lg,
              }}>
                {/* dd: "flex justify-between" */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.foreground,
                  }}>주문금액</Text>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.foreground,
                  }}>{subtotal.toLocaleString()}원</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.foreground,
                  }}>배달팁</Text>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.foreground,
                  }}>{restaurant.deliveryFee.toLocaleString()}원</Text>
                </View>

                {/* dd: "flex justify-between font-bold pt-2 border-t mt-2" */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: theme.spacing[2],
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.border,
                  marginTop: theme.spacing[2],
                }}>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: 'bold',
                    color: theme.colors.foreground,
                  }}>총 결제금액</Text>
                  <Text style={{
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: 'bold',
                    color: theme.colors.foreground,
                  }}>{total.toLocaleString()}원</Text>
                </View>
              </View>
            </>
          ) : (
            // dd: 빈 장바구니 "flex flex-col items-center justify-center py-12 text-center"
            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: theme.spacing[12],
              textAlign: 'center',
            }}>
              {/* dd: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" */}
              <View style={{
                width: 64,
                height: 64,
                backgroundColor: theme.colors.muted,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: theme.spacing[4],
              }}>
                <Text style={{ fontSize: 32, color: theme.colors.mutedForeground }}>🛒</Text>
              </View>
              
              {/* dd: "text-gray-500 mb-6" */}
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.mutedForeground,
                marginBottom: theme.spacing[6],
              }}>
                장바구니가 비어있습니다
              </Text>
              
              {/* dd: outline button "border-purple-300 text-purple-700" */}
              <Button
                variant="outline"
                onPress={goToRestaurant}
                style={{
                  borderColor: theme.colors.primary,
                }}
                textStyle={{
                  color: theme.colors.primary,
                }}
              >
                메뉴 담으러 가기
              </Button>
            </View>
          )}
        </ScrollView>

        {/* dd: 하단 결제 버튼 "p-4 border-t" */}
        {cartItems.length > 0 && (
          <View style={{
            padding: theme.spacing[4],
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}>
            {/* dd: "w-full bg-purple-600" */}
            <Button
              onPress={handleCheckout}
              style={{
                backgroundColor: theme.colors.primary, // bg-purple-600
              }}
            >
              {total.toLocaleString()}원 결제하기
            </Button>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}