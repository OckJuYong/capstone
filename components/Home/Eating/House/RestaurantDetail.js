import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import styles from './RestaurantDetailStyles';

export default function RestaurantDetail({ route, navigation }) {
  const { restaurant } = route.params;
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "불고기 덮밥",
      price: 12000,
      description: "부드러운 불고기와 신선한 야채가 어우러진 덮밥",
      image: "https://via.placeholder.com/300x200",
      tasteProfile: {
        spicy: 2,
        sweet: 4,
        salty: 3,
        umami: 5,
        bitter: 1
      },
      reviews: [
        { id: 1, user: "김민수", rating: 5, comment: "정말 맛있어요! 불고기가 부드럽고 양념이 일품이에요.", date: "2024-01-15" },
        { id: 2, user: "이영희", rating: 4, comment: "가격 대비 만족스럽습니다. 다시 주문할게요.", date: "2024-01-10" }
      ]
    },
    {
      id: 2,
      name: "김치찌개",
      price: 9000,
      description: "진짜 맛있는 김치찌개, 집에서 끓인 것 같은 맛",
      image: "https://via.placeholder.com/300x200",
      tasteProfile: {
        spicy: 4,
        sweet: 2,
        salty: 4,
        umami: 4,
        bitter: 1
      },
      reviews: [
        { id: 3, user: "박철수", rating: 5, comment: "김치찌개 맛이 정말 깊어요. 강추!", date: "2024-01-12" }
      ]
    }
  ];

  const handleGoBack = () => {
    if (selectedMenu) {
      setSelectedMenu(null);
    } else {
      navigation.goBack();
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('공유하기');
  };

  const selectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  // ⭐️ 이 부분을 수정했습니다.
  const writeReview = () => {
    navigation.navigate('Riview', { restaurantName: restaurant.name });
  };

  const renderTasteProfile = (tasteProfile) => {
    const tastes = [
      { key: 'spicy', label: '매운맛', color: '#ff4757' },
      { key: 'sweet', label: '단맛', color: '#ff6b6b' },
      { key: 'salty', label: '짠맛', color: '#3742fa' },
      { key: 'umami', label: '감칠맛', color: '#2ed573' },
      { key: 'bitter', label: '쓴맛', color: '#a4b0be' }
    ];

    return tastes.map((taste) => (
      <View key={taste.key} style={styles.tasteItem}>
        <Text style={styles.tasteLabel}>{taste.label}</Text>
        <View style={styles.tasteBar}>
          <View 
            style={[
              styles.tasteProgress, 
              { 
                width: `${(tasteProfile[taste.key] / 5) * 100}%`,
                backgroundColor: taste.color 
              }
            ]} 
          />
        </View>
        <Text style={styles.tasteScore}>{tasteProfile[taste.key]}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageHeader}>
          <Image 
            source={{ uri: selectedMenu ? selectedMenu.image : restaurant.image }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
          
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Text style={styles.backButtonIcon}>←</Text>
            </TouchableOpacity>
            
            <View style={styles.headerRightButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleLike}>
                <Text style={styles.iconButtonText}>{isLiked ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                <Text style={styles.iconButtonText}>📤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          
          {selectedMenu ? (
            <>
              {/* 메뉴 상세 정보 */}
              <View style={styles.titleSection}>
                <Text style={styles.menuName}>{selectedMenu.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                </View>
              </View>

              <Text style={styles.price}>{selectedMenu.price.toLocaleString()}원</Text>
              
              <Text style={styles.menuDescription}>{selectedMenu.description}</Text>

              {/* ⭐ 메뉴 상세 페이지에서도 리뷰 작성 버튼이 있었던 원래 코드 부분 */}
              <TouchableOpacity style={styles.writeReviewButton} onPress={writeReview}>
                <Text style={styles.writeReviewText}>⭐ 리뷰 작성하기</Text>
              </TouchableOpacity>

              <View style={styles.tasteProfileSection}>
                <Text style={styles.sectionTitle}>맛 프로필</Text>
                <View style={styles.tasteProfileContainer}>
                  {renderTasteProfile(selectedMenu.tasteProfile)}
                </View>
              </View>

              <View style={styles.reviewsSection}>
                <Text style={styles.sectionTitle}>리뷰 ({selectedMenu.reviews.length})</Text>
                {selectedMenu.reviews.map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      <Text style={styles.reviewStars}>{'⭐'.repeat(review.rating)}</Text>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* 음식점 상세 정보 */}
              <View style={styles.titleSection}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                </View>
              </View>

              {/* ⭐ 음식점 상세 페이지 상단에 리뷰 작성 버튼 추가 */}
              <TouchableOpacity style={styles.writeReviewButton} onPress={writeReview}>
                <Text style={styles.writeReviewText}>⭐ 리뷰 작성하기</Text>
              </TouchableOpacity>

              <Text style={styles.mainMenu}>대표 메뉴: {restaurant.specialties[0]}</Text>

              <View style={styles.locationSection}>
                <Text style={styles.address}>📍 서울시 강남구 테헤란로 123</Text>
                <Text style={styles.distance}>{restaurant.distance}</Text>
              </View>

              <View style={styles.categorySection}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{restaurant.category}</Text>
                </View>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>배달</Text>
                </View>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>포장</Text>
                </View>
              </View>

              <View style={styles.introSection}>
                <Text style={styles.sectionTitle}>사장님 한마디</Text>
                <Text style={styles.introText}>
                  안녕하세요! {restaurant.name} 사장입니다. 
                  저희는 신선한 재료와 정성으로 만든 음식을 제공합니다. 
                  특히 {restaurant.specialties[0]}은 자신있게 추천드려요! 
                  많은 사랑 부탁드립니다.
                </Text>
              </View>

              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>메뉴</Text>
                {menuItems.map((menu) => (
                  <TouchableOpacity 
                    key={menu.id} 
                    style={styles.menuItem}
                    onPress={() => selectMenu(menu)}
                  >
                    <Image source={{ uri: menu.image }} style={styles.menuImage} />
                    <View style={styles.menuContent}>
                      <Text style={styles.menuItemName}>{menu.name}</Text>
                      <Text style={styles.menuItemDescription}>{menu.description}</Text>
                      <Text style={styles.menuItemPrice}>{menu.price.toLocaleString()}원</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

