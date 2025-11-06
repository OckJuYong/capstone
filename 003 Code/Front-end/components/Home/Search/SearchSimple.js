// 간단한 dd 스타일 검색 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, ScrollView } from 'react-native';
import { mockRestaurants } from '../../../data/mockRecommendationData';

export default function SearchSimple({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query) => {
    setSearchText(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // 음식점 이름, 카테고리, 태그로 검색
    const results = mockRestaurants.filter((restaurant) => {
      const searchLower = query.toLowerCase();

      return (
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower) ||
        restaurant.tags.some(s => s.toLowerCase().includes(searchLower))
      );
    });

    setSearchResults(results);
    setShowResults(true);
  };

  const handleTagPress = (tag) => {
    handleSearch(tag);
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
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
        <Text style={styles.title}>검색</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* 검색 입력 */}
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="음식점, 메뉴를 검색해보세요"
            value={searchText}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
        </View>

        {showResults ? (
          /* 검색 결과 */
          <ScrollView style={styles.resultsContainer}>
            <Text style={styles.resultCount}>
              검색 결과 {searchResults.length}개
            </Text>
            {searchResults.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>검색 결과가 없습니다</Text>
                <Text style={styles.noResultsSubtext}>다른 검색어로 시도해보세요</Text>
              </View>
            ) : (
              searchResults.map((restaurant) => {
                return (
                  <TouchableOpacity
                    key={restaurant.id}
                    style={styles.resultItem}
                    onPress={() => handleRestaurantPress(restaurant)}
                  >
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultName}>{restaurant.name}</Text>
                      <Text style={styles.resultCategory}>{restaurant.cuisine}</Text>
                      <View style={styles.resultDetails}>
                        <Text style={styles.resultRating}>⭐ {restaurant.rating}</Text>
                        <Text style={styles.resultDot}>•</Text>
                        <Text style={styles.resultTime}>{restaurant.deliveryTime}</Text>
                        <Text style={styles.resultDot}>•</Text>
                        <Text style={styles.resultDistance}>{restaurant.deliveryFee}</Text>
                      </View>
                      <Text style={styles.resultSpecialties}>
                        {restaurant.tags.join(', ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        ) : (
          <>
            {/* 최근 검색어 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>최근 검색어</Text>
              <View style={styles.tagContainer}>
                {['삼겹살', '피자', '치킨'].map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 인기 검색어 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>인기 검색어</Text>
              <View style={styles.tagContainer}>
                {['한식', '중식', '일식', '양식'].map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => handleTagPress(tag)}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
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
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
  },
  resultCount: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  resultItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 6,
  },
  resultDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultRating: {
    fontSize: 13,
    color: '#f59e0b',
  },
  resultDot: {
    fontSize: 13,
    color: '#d1d5db',
    marginHorizontal: 6,
  },
  resultDistance: {
    fontSize: 13,
    color: '#6b7280',
  },
  resultTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  resultSpecialties: {
    fontSize: 13,
    color: '#9ca3af',
  },
});