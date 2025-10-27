import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './HouseStyles';
import restaurantData from '../../../../data.json';

export default function House({ route, navigation }) {
  const { selectedCategory } = route.params;
  const allRestaurants = restaurantData.restaurants;

  const filteredRestaurants = allRestaurants.filter(
    restaurant => restaurant.category === selectedCategory.id
  );

  const navigateToDetail = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const changeCategory = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedCategory.emoji} {selectedCategory.name}
        </Text>
        <TouchableOpacity onPress={changeCategory} style={styles.changeCategoryButton}>
          <Text style={styles.changeCategoryButtonText}>카테고리 변경</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginBottom: 15, color: '#495057' }}>
        총 {filteredRestaurants.length}개의 음식점
      </Text>

      <ScrollView style={styles.restaurantList}>
        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.id}
            onPress={() => navigateToDetail(restaurant)}
            style={styles.restaurantCard}
          >
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantInfo}>⭐ {restaurant.rating}점</Text>
            <Text style={styles.restaurantInfo}>배달 시간: {restaurant.deliveryTime}</Text>
            <Text style={styles.restaurantInfo}>거리: {restaurant.distance}</Text>
            <Text style={styles.specialties}>
              대표 메뉴: {restaurant.specialties.join(', ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
