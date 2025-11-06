// dd 스타일의 식재료 관리 페이지
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet,
  Alert,
  TextInput 
} from 'react-native';

export default function IngredientNew({ navigation }) {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: '대파',
      category: '채소',
      expiryDate: '2024.01.20',
      daysLeft: 3,
      status: 'fresh',
      emoji: '🥬',
      location: '냉장고'
    },
    {
      id: 2,
      name: '우유',
      category: '유제품',
      expiryDate: '2024.01.18',
      daysLeft: 1,
      status: 'warning',
      emoji: '🥛',
      location: '냉장고'
    },
    {
      id: 3,
      name: '계란',
      category: '단백질',
      expiryDate: '2024.01.25',
      daysLeft: 8,
      status: 'fresh',
      emoji: '🥚',
      location: '냉장고'
    },
    {
      id: 4,
      name: '토마토',
      category: '채소',
      expiryDate: '2024.01.17',
      daysLeft: 0,
      status: 'expired',
      emoji: '🍅',
      location: '냉장고'
    },
    {
      id: 5,
      name: '쌀',
      category: '곡류',
      expiryDate: '2024.03.15',
      daysLeft: 60,
      status: 'fresh',
      emoji: '🍚',
      location: '상온'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newIngredientName, setNewIngredientName] = useState('');

  const categories = [
    { id: 'all', name: '전체', emoji: '📋' },
    { id: '채소', name: '채소', emoji: '🥬' },
    { id: '유제품', name: '유제품', emoji: '🥛' },
    { id: '단백질', name: '단백질', emoji: '🍖' },
    { id: '곡류', name: '곡류', emoji: '🍚' },
    { id: '과일', name: '과일', emoji: '🍎' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'fresh': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'expired': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (daysLeft, status) => {
    if (status === 'expired') return '유통기한 만료';
    if (daysLeft === 0) return '오늘까지';
    if (daysLeft === 1) return '내일까지';
    return `${daysLeft}일 남음`;
  };

  const filteredIngredients = selectedCategory === 'all' 
    ? ingredients 
    : ingredients.filter(item => item.category === selectedCategory);

  const removeIngredient = (id) => {
    Alert.alert(
      '식재료 제거',
      '이 식재료를 목록에서 제거하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '제거', 
          onPress: () => {
            setIngredients(ingredients.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const addIngredient = () => {
    if (!newIngredientName.trim()) {
      Alert.alert('알림', '식재료 이름을 입력해주세요.');
      return;
    }

    const newId = Math.max(...ingredients.map(i => i.id)) + 1;
    const newIngredient = {
      id: newId,
      name: newIngredientName.trim(),
      category: '기타',
      expiryDate: '2024.01.30',
      daysLeft: 13,
      status: 'fresh',
      emoji: '🥄',
      location: '냉장고'
    };

    setIngredients([...ingredients, newIngredient]);
    setNewIngredientName('');
    Alert.alert('완료', '식재료가 추가되었습니다.');
  };

  const findRecipes = () => {
    const expiringSoon = ingredients.filter(item => 
      item.status === 'warning' || item.status === 'expired'
    );
    
    if (expiringSoon.length === 0) {
      Alert.alert('알림', '유통기한이 임박한 식재료가 없습니다.');
      return;
    }

    Alert.alert(
      '레시피 추천',
      `${expiringSoon.map(item => item.name).join(', ')}를 활용한 레시피를 찾아보시겠습니까?\\n\\n실제 앱에서는 레시피 페이지로 이동합니다.`,
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => console.log('레시피 검색') }
      ]
    );
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
        <Text style={styles.headerTitle}>식재료 관리</Text>
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 요약 통계 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>📊</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>식재료 현황</Text>
              <View style={styles.summaryStats}>
                <Text style={styles.summaryText}>
                  전체 {ingredients.length}개 • 
                  <Text style={{ color: '#ef4444' }}> 만료 {ingredients.filter(i => i.status === 'expired').length}개</Text> • 
                  <Text style={{ color: '#f59e0b' }}> 주의 {ingredients.filter(i => i.status === 'warning').length}개</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 카테고리 필터 */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 식재료 추가 */}
        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>새 식재료 추가</Text>
          <View style={styles.addInputContainer}>
            <TextInput
              style={styles.addInput}
              placeholder="식재료 이름을 입력하세요"
              placeholderTextColor="#9ca3af"
              value={newIngredientName}
              onChangeText={setNewIngredientName}
            />
            <TouchableOpacity 
              style={styles.addInputButton} 
              onPress={addIngredient}
            >
              <Text style={styles.addInputButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 식재료 목록 */}
        <View style={styles.ingredientsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? '전체 식재료' : `${selectedCategory} 목록`}
            </Text>
            <TouchableOpacity style={styles.recipeButton} onPress={findRecipes}>
              <Text style={styles.recipeButtonText}>🍳 레시피 찾기</Text>
            </TouchableOpacity>
          </View>
          
          {filteredIngredients.length > 0 ? (
            <View style={styles.ingredientsList}>
              {filteredIngredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientCard}>
                  <View style={styles.ingredientContent}>
                    <View style={styles.ingredientHeader}>
                      <Text style={styles.ingredientEmoji}>{ingredient.emoji}</Text>
                      <View style={styles.ingredientInfo}>
                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        <Text style={styles.ingredientCategory}>{ingredient.category} • {ingredient.location}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.ingredientFooter}>
                      <View style={styles.expiryInfo}>
                        <Text style={styles.expiryDate}>유통기한: {ingredient.expiryDate}</Text>
                        <Text style={[
                          styles.expiryStatus,
                          { color: getStatusColor(ingredient.status) }
                        ]}>
                          {getStatusText(ingredient.daysLeft, ingredient.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeIngredient(ingredient.id)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🥄</Text>
              <Text style={styles.emptyTitle}>등록된 식재료가 없습니다</Text>
              <Text style={styles.emptyDescription}>
                {selectedCategory === 'all' 
                  ? '새로운 식재료를 추가해보세요' 
                  : `${selectedCategory} 카테고리에 식재료가 없습니다`
                }
              </Text>
            </View>
          )}
        </View>

        {/* 사용 가이드 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>식재료 관리 팁</Text>
              <Text style={styles.infoText}>
                • 유통기한이 임박한 식재료를 우선적으로 사용하세요{'\n'}
                • 레시피 찾기로 남은 식재료를 활용해보세요{'\n'}
                • 정기적으로 냉장고를 정리하여 식품 낭비를 줄이세요{'\n'}
                • 구매 전에 보유 식재료를 확인하세요
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  summarySection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  summaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
  },
  categorySection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    minWidth: 70,
  },
  categoryButtonActive: {
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
  },
  categoryEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#8b5cf6',
  },
  addSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  addInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  addInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  addInputButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addInputButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  ingredientsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    marginBottom: 8,
  },
  recipeButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  recipeButtonText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  ingredientsList: {
    paddingHorizontal: 16,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
  },
  ingredientContent: {
    flex: 1,
  },
  ingredientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  ingredientCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  ingredientFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryInfo: {
    flex: 1,
  },
  expiryDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  expiryStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    width: 24,
    height: 24,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoSection: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});