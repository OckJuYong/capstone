// 간단한 dd 스타일 장바구니 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, TextInput, StyleSheet } from 'react-native';

export default function CartSimple({ route, navigation }) {
  const { restaurantId } = route.params || {};
  
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
    // Payment 화면으로 이동하면서 장바구니 데이터 전달
    console.log('🛒 결제 화면으로 이동...');
    navigation.navigate('Payment', {
      cartItems,
      restaurant,
      deliveryOption,
      requestText,
    });
  };

  const goToRestaurant = () => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>장바구니</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        
        {/* 배달/포장 옵션 */}
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.option, deliveryOption === "delivery" && styles.optionSelected]}
            onPress={() => setDeliveryOption("delivery")}
          >
            <View style={[styles.radio, deliveryOption === "delivery" && styles.radioSelected]} />
            <Text style={styles.optionText}>배달</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, deliveryOption === "pickup" && styles.optionSelected]}
            onPress={() => setDeliveryOption("pickup")}
          >
            <View style={[styles.radio, deliveryOption === "pickup" && styles.radioSelected]} />
            <Text style={styles.optionText}>포장</Text>
          </TouchableOpacity>
        </View>

        {cartItems.length > 0 ? (
          <>
            {/* 장바구니 아이템들 */}
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      {item.options.map((option, index) => (
                        <Text key={index} style={styles.itemOption}>• {option}</Text>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>×</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.itemFooter}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(item.id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()}원</Text>
                </View>
              </View>
            ))}

            {/* 요청사항 */}
            <View style={styles.requestContainer}>
              <Text style={styles.requestTitle}>요청사항</Text>
              <TextInput
                style={styles.requestInput}
                placeholder="요청사항을 입력해주세요..."
                value={requestText}
                onChangeText={setRequestText}
                multiline={true}
                numberOfLines={3}
              />
            </View>

            {/* 결제 요약 */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>주문금액</Text>
                <Text style={styles.summaryValue}>{subtotal.toLocaleString()}원</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>배달팁</Text>
                <Text style={styles.summaryValue}>{restaurant.deliveryFee.toLocaleString()}원</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>총 결제금액</Text>
                <Text style={styles.totalValue}>{total.toLocaleString()}원</Text>
              </View>
            </View>
          </>
        ) : (
          // 빈 장바구니
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>장바구니가 비어있습니다</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={goToRestaurant}
            >
              <Text style={styles.emptyButtonText}>메뉴 담으러 가기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* 하단 결제 버튼 */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>
              {total.toLocaleString()}원 결제하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: '#8b5cf6',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  itemOption: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 20,
    color: '#6b7280',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  requestContainer: {
    marginBottom: 24,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  requestInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  summaryContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#374151',
  },
  summaryValue: {
    fontSize: 16,
    color: '#374151',
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  emptyButton: {
    borderWidth: 1,
    borderColor: '#8b5cf6',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
  },
  checkoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  checkoutButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});