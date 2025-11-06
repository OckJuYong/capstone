import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import RiviewStyles from './RiviewStyles';

export default function Riview({ route, navigation }) {
  const { restaurantName } = route.params; // House 컴포넌트에서 전달받은 음식점 이름
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = (star) => {
    setRating(star);
  };

  const handleReviewSubmit = () => {
    // 여기에 리뷰 제출 로직을 구현하세요 (예: API 호출)
    console.log('리뷰 제출:', { restaurantName, rating, reviewText });
    alert('리뷰가 제출되었습니다!');
    navigation.goBack(); // 제출 후 이전 화면으로 돌아가기
  };

  return (
    <SafeAreaView style={RiviewStyles.container}>
      <ScrollView contentContainerStyle={RiviewStyles.scrollViewContent}>
        {/* 헤더 */}
        <View style={RiviewStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={RiviewStyles.backButton}>
            <Text style={RiviewStyles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={RiviewStyles.headerTitle}>리뷰 작성</Text>
          <View style={RiviewStyles.headerPlaceholder} />
        </View>

        {/* 음식점 이름 */}
        <View style={RiviewStyles.restaurantInfo}>
          <Text style={RiviewStyles.restaurantName}>{restaurantName}</Text>
        </View>

        {/* 별점 섹션 */}
        <View style={RiviewStyles.section}>
          <Text style={RiviewStyles.sectionTitle}>별점</Text>
          <View style={RiviewStyles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Text style={RiviewStyles.star}>
                  {star <= rating ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 리뷰 내용 입력 섹션 */}
        <View style={RiviewStyles.section}>
          <Text style={RiviewStyles.sectionTitle}>리뷰 내용</Text>
          <TextInput
            style={RiviewStyles.reviewInput}
            multiline
            placeholder="솔직한 리뷰를 작성해주세요! (최소 10자 이상)"
            placeholderTextColor="#adb5bd"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>
        
        {/* 사진 첨부 섹션 */}
        <View style={RiviewStyles.section}>
          <Text style={RiviewStyles.sectionTitle}>사진 첨부 (선택)</Text>
          <TouchableOpacity style={RiviewStyles.photoButton}>
            <Text style={RiviewStyles.photoButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 리뷰 제출 버튼 */}
      <TouchableOpacity 
        style={[
          RiviewStyles.submitButton,
          reviewText.length < 10 && RiviewStyles.submitButtonDisabled
        ]}
        onPress={handleReviewSubmit}
        disabled={reviewText.length < 10}
      >
        <Text style={RiviewStyles.submitButtonText}>리뷰 제출하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}