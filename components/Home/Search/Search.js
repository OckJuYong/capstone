import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { mockRestaurants } from '../../../data/mockRecommendationData';
import styles from './SearchStyles';

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const allRestaurants = mockRestaurants;

  useEffect(() => {
    if (searchText === '') {
      setFilteredRestaurants([]);
    } else {
      const filtered = allRestaurants.filter(restaurant => {
        const nameMatch = restaurant.name.toLowerCase().includes(searchText.toLowerCase());
        const categoryMatch = restaurant.cuisine.toLowerCase().includes(searchText.toLowerCase());
        const menuMatch = restaurant.tags.some(menu =>
          menu.toLowerCase().includes(searchText.toLowerCase())
        );
        return nameMatch || categoryMatch || menuMatch;
      });
      setFilteredRestaurants(filtered);
    }
  }, [searchText]);

  const navigateToDetail = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 검색</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="음식점, 카테고리, 메뉴를 검색하세요"
        value={searchText}
        onChangeText={setSearchText}
      />

      {searchText === '' ? (
        <View style={styles.infoMessage}>
          <Text style={styles.infoText}>검색어를 입력해주세요</Text>
          <Text style={styles.infoText}>음식점 이름, 카테고리, 메뉴로 검색할 수 있어요</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.resultText}>검색 결과: {filteredRestaurants.length}개</Text>

          <ScrollView>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => {
                return (
                  <TouchableOpacity
                    key={restaurant.id}
                    style={styles.restaurantCard}
                    onPress={() => navigateToDetail(restaurant)}
                  >
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantInfo}>
                      {restaurant.cuisine}
                    </Text>
                    <Text style={styles.restaurantInfo}>⭐ {restaurant.rating}</Text>
                    <Text style={styles.restaurantInfo}>{restaurant.deliveryTime}</Text>
                    <Text style={styles.restaurantInfo}>{restaurant.distance}</Text>
                    <Text style={styles.restaurantInfo}>
                      대표메뉴: {restaurant.specialties.join(', ')}
                    </Text>
                    <Text style={styles.restaurantInfo}>
                      {restaurant.isOpen ? '🟢 영업중' : '🔴 영업종료'}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.infoMessage}>
                <Text style={styles.noResultEmoji}>😅</Text>
                <Text style={styles.infoText}>'{searchText}'에 대한 결과가 없습니다</Text>
                <Text style={styles.infoText}>다른 검색어를 입력해보세요</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
