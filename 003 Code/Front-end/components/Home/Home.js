import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, FlatList } from 'react-native';
import styles from './HomeStyles';

export default function Home({ navigation }) {
  // 샘플 카테고리 데이터 (data.json 대신)
  const categories = [
    { id: 1, name: "한식", emoji: "🍚" },
    { id: 2, name: "양식", emoji: "🍝" },
    { id: 3, name: "중식", emoji: "🥟" },
    { id: 4, name: "일식", emoji: "🍣" },
    { id: 5, name: "치킨", emoji: "🍗" },
    { id: 6, name: "피자", emoji: "🍕" },
    { id: 7, name: "카페", emoji: "☕" },
    { id: 8, name: "디저트", emoji: "🍰" }
  ];
  
  const userName = "김철수"; // 실제로는 사용자 데이터에서 가져와야 함
  
  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState('nearby');
  
  // 샘플 추천 메뉴 데이터 (4개) - RestaurantDetail 페이지 구조에 맞춰 수정
  const recommendedMenus = [
    {
      id: 1,
      name: "불고기 덮밥",
      restaurant: "맛있는 한식당",
      category: "한식",
      rating: 4.5,
      reviewCount: 127,
      deliveryTime: "25-35분",
      distance: "0.8km",
      deliveryFee: 2500,
      minOrder: 15000,
      isOpen: true,
      specialties: ["불고기 덮밥", "김치찌개", "된장찌개", "비빔밥"],
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      name: "마르게리타 피자",
      restaurant: "이탈리아 레스토랑",
      category: "양식",
      rating: 4.7,
      reviewCount: 89,
      deliveryTime: "30-40분", 
      distance: "1.2km",
      deliveryFee: 3000,
      minOrder: 20000,
      isOpen: true,
      specialties: ["마르게리타 피자", "파스타", "리조또", "샐러드"],
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      name: "연어 초밥",
      restaurant: "스시 마스터",
      category: "일식",
      rating: 4.6,
      reviewCount: 203,
      deliveryTime: "20-30분",
      distance: "0.5km", 
      deliveryFee: 2000,
      minOrder: 25000,
      isOpen: false,
      specialties: ["연어 초밥", "참치 초밥", "우동", "돈카츠"],
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 4,
      name: "탕수육",
      restaurant: "중화루",
      category: "중식",
      rating: 4.3,
      reviewCount: 156,
      deliveryTime: "35-45분",
      distance: "1.5km",
      deliveryFee: 3500,
      minOrder: 18000,
      isOpen: true,
      specialties: ["탕수육", "짜장면", "짬뽕", "볶음밥"],
      image: "https://via.placeholder.com/300x200"
    }
  ];

  // 샘플 음식점 데이터 (탭별로 다른 데이터) - RestaurantDetail 구조에 맞춰 수정
  const restaurantsData = {
    nearby: [
      { 
        id: 1, 
        name: "김치찌개 전문점", 
        category: "한식", 
        rating: 4.3,
        reviewCount: 94,
        deliveryTime: "20-30분",
        distance: "0.2km",
        deliveryFee: 2000,
        minOrder: 12000,
        isOpen: true,
        specialties: ["김치찌개", "부대찌개", "순두부찌개", "백반"],
        image: "https://via.placeholder.com/120x80",
        description: "정통 김치찌개와 한식 전문점"
      },
      { 
        id: 2, 
        name: "이탈리안 파스타", 
        category: "양식", 
        rating: 4.7,
        reviewCount: 156,
        deliveryTime: "25-35분", 
        distance: "0.5km",
        deliveryFee: 3000,
        minOrder: 18000,
        isOpen: true,
        specialties: ["까르보나라", "알리오올리오", "토마토 파스타", "크림 파스타"],
        image: "https://via.placeholder.com/120x80",
        description: "신선한 재료로 만든 수제 파스타"
      },
      { 
        id: 3, 
        name: "라멘 하우스", 
        category: "일식", 
        rating: 4.2,
        reviewCount: 78,
        deliveryTime: "30-40분",
        distance: "0.3km",
        deliveryFee: 2500,
        minOrder: 15000,
        isOpen: false,
        specialties: ["돈코츠 라멘", "미소 라멘", "차슈멘", "교자"],
        image: "https://via.placeholder.com/120x80",
        description: "진한 국물이 일품인 라멘 전문점"
      }
    ],
    popular: [
      { 
        id: 4, 
        name: "맛있는 치킨", 
        category: "치킨", 
        rating: 4.8,
        reviewCount: 324,
        deliveryTime: "25-35분",
        distance: "1.2km",
        deliveryFee: 2000,
        minOrder: 16000,
        isOpen: true,
        specialties: ["후라이드 치킨", "양념치킨", "간장치킨", "치킨무"],
        image: "https://via.placeholder.com/120x80",
        description: "바삭하고 맛있는 치킨 전문점"
      },
      { 
        id: 5, 
        name: "고급 스테이크 하우스", 
        category: "양식", 
        rating: 4.9,
        reviewCount: 267,
        deliveryTime: "40-50분",
        distance: "2.1km",
        deliveryFee: 5000,
        minOrder: 35000,
        isOpen: true,
        specialties: ["안심 스테이크", "등심 스테이크", "와인", "샐러드"],
        image: "https://via.placeholder.com/120x80",
        description: "프리미엄 스테이크와 와인"
      },
      { 
        id: 6, 
        name: "전통 냉면집", 
        category: "한식", 
        rating: 4.6,
        reviewCount: 189,
        deliveryTime: "20-30분",
        distance: "0.8km",
        deliveryFee: 2500,
        minOrder: 14000,
        isOpen: true,
        specialties: ["물냉면", "비빔냉면", "갈비탕", "만두"],
        image: "https://via.placeholder.com/120x80",
        description: "시원하고 깔끔한 냉면"
      }
    ],
    new: [
      { 
        id: 7, 
        name: "신개념 버거", 
        category: "패스트푸드", 
        rating: 4.4,
        reviewCount: 67,
        deliveryTime: "15-25분",
        distance: "0.7km",
        deliveryFee: 2500,
        minOrder: 12000,
        isOpen: true,
        specialties: ["수제 버거", "감자튀김", "콜라", "치킨너겟"],
        image: "https://via.placeholder.com/120x80",
        description: "새로운 스타일의 수제 버거"
      },
      { 
        id: 8, 
        name: "모던 카페", 
        category: "카페", 
        rating: 4.5,
        reviewCount: 123,
        deliveryTime: "10-20분",
        distance: "0.4km",
        deliveryFee: 1500,
        minOrder: 8000,
        isOpen: true,
        specialties: ["아메리카노", "라떼", "케이크", "샌드위치"],
        image: "https://via.placeholder.com/120x80",
        description: "트렌디한 분위기의 카페"
      },
      { 
        id: 9, 
        name: "퓨전 아시안", 
        category: "아시안", 
        rating: 4.3,
        reviewCount: 45,
        deliveryTime: "30-40분",
        distance: "1.0km",
        deliveryFee: 3000,
        minOrder: 20000,
        isOpen: false,
        specialties: ["팟타이", "똠양꿍", "볶음면", "월남쌈"],
        image: "https://via.placeholder.com/120x80",
        description: "동서양이 만나는 퓨전 요리"
      }
    ]
  };

  // 현재 선택된 탭의 음식점 데이터
  const getCurrentRestaurants = () => {
    return restaurantsData[selectedTab] || [];
  };

  const navigateToCategory = (category) => {
    navigation.navigate('House', { selectedCategory: category });
  };

  // 음식점 상세 페이지로 이동
  const navigateToRestaurantDetail = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  // 탭 변경 함수
  const handleTabChange = (tabKey) => {
    setSelectedTab(tabKey);
  };

  const renderRecommendedMenu = ({ item }) => (
    <TouchableOpacity 
      style={styles.recommendedCard}
      onPress={() => navigateToRestaurantDetail(item)}
    >
      <View style={styles.menuImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.menuImage}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.restaurantName}>{item.restaurant}</Text>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>맛찾사</Text>
            
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => navigation.navigate('Search')}
              >
                <Text style={styles.searchIcon}>🔍</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <View style={styles.profileImage}>
                  <Text style={styles.profileInitial}>{userName.charAt(0)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* 사용자 인사말 */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingText}>안녕하세요, {userName}님!</Text>
            <Text style={styles.greetingSubText}>오늘은 어떤 메뉴를 추천해 드릴까요?</Text>
          </View>
        </View>

        {/* 맞춤 추천 메뉴 섹션 - 슬라이드 형태 */}
        <View style={styles.recommendationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>맞춤 추천 메뉴</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
              <Text style={styles.moreButton}>더보기</Text>
            </TouchableOpacity>
          </View>
          
          {/* 추천 메뉴 슬라이드 */}
          <FlatList
            data={recommendedMenus}
            renderItem={renderRecommendedMenu}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={styles.recommendedCard.width + 15} // 카드 너비 + 마진
            decelerationRate="fast"
            pagingEnabled={false}
            contentContainerStyle={styles.recommendedSlider}
          />
        </View>

        {/* 음식 카테고리 섹션 */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>음식 카테고리</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigateToCategory(category)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 카테고리 섹션 */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>지금 뜨는 메뉴</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.moreButton}>더보기</Text>
            </TouchableOpacity>
          </View>
          
          {/* 카테고리 탭 */}
          <View style={styles.categoryTabs}>
            <TouchableOpacity 
              style={[styles.categoryTab, selectedTab === 'nearby' && styles.activeTab]}
              onPress={() => handleTabChange('nearby')}
            >
              <Text style={[
                styles.categoryTabText, 
                selectedTab === 'nearby' && styles.activeTabText
              ]}>내 주변</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.categoryTab, selectedTab === 'popular' && styles.activeTab]}
              onPress={() => handleTabChange('popular')}
            >
              <Text style={[
                styles.categoryTabText, 
                selectedTab === 'popular' && styles.activeTabText
              ]}>인기 메뉴</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.categoryTab, selectedTab === 'new' && styles.activeTab]}
              onPress={() => handleTabChange('new')}
            >
              <Text style={[
                styles.categoryTabText, 
                selectedTab === 'new' && styles.activeTabText
              ]}>신규 등록</Text>
            </TouchableOpacity>
          </View>
          
          {/* 음식점 리스트 */}
          <View style={styles.restaurantList}>
            {getCurrentRestaurants().map((restaurant) => (
              <TouchableOpacity 
                key={restaurant.id} 
                style={styles.restaurantCard}
                onPress={() => navigateToRestaurantDetail(restaurant)}
                activeOpacity={0.7}
              >
                <Image 
                  source={{ uri: restaurant.image }} 
                  style={styles.restaurantImage}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantCardName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
                  <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
                  <View style={styles.restaurantMeta}>
                    <View style={styles.restaurantRating}>
                      <Text style={styles.restaurantRatingText}>⭐ {restaurant.rating}</Text>
                    </View>
                    <View style={styles.restaurantDistance}>
                      <Text style={styles.restaurantDistanceText}>{restaurant.distance}km</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 하단 여백 (Footer를 위한 공간) */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerItem, styles.activeFooterItem]}>
          <Text style={styles.footerIcon}>🏠</Text>
          <Text style={[styles.footerText, styles.activeFooterText]}>홈</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.footerIcon}>🔍</Text>
          <Text style={styles.footerText}>검색</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.footerIcon}>🗺️</Text>
          <Text style={styles.footerText}>지도</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => navigation.navigate('Review')}
        >
          <Text style={styles.footerIcon}>⭐</Text>
          <Text style={styles.footerText}>리뷰</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.footerIcon}>👤</Text>
          <Text style={styles.footerText}>프로필</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}