// dd 디자인 시스템을 적용한 앱 헤더 컴포넌트들
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightThemeConfig } from '../../theme';

/**
 * dd 스타일의 기본 앱 헤더
 */
export const AppHeader = ({ 
  title,
  leftAction,
  rightAction,
  showBackButton = false,
  onBackPress,
  navigation,
  style 
}) => {
  const theme = lightThemeConfig;
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={[
      headerStyles.container,
      { paddingTop: insets.top + theme.spacing[2] }, // Safe area + 8px
      style
    ]}>
      <View style={headerStyles.content}>
        {/* 좌측 영역 */}
        <View style={headerStyles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={headerStyles.iconButton}
            >
              <Text style={headerStyles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          {leftAction}
        </View>

        {/* 중앙 타이틀 */}
        {title && (
          <View style={headerStyles.titleSection}>
            <Text style={headerStyles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}

        {/* 우측 영역 */}
        <View style={headerStyles.rightSection}>
          {rightAction}
        </View>
      </View>
    </View>
  );
};

/**
 * dd Home 페이지 스타일의 헤더 (로고 + 검색 + 프로필)
 */
export const HomeHeader = ({ 
  userName = '사용자',
  onSearchPress,
  onProfilePress,
  style 
}) => {
  const theme = lightThemeConfig;

  return (
    <View style={[headerStyles.container, style]}>
      <View style={headerStyles.content}>
        {/* 좌측 로고 */}
        <View style={headerStyles.leftSection}>
          <Text style={headerStyles.logo}>FoodApp</Text>
        </View>

        {/* 우측 아이콘들 */}
        <View style={headerStyles.rightSection}>
          {/* 검색 버튼 */}
          <TouchableOpacity
            onPress={onSearchPress}
            style={headerStyles.iconButton}
          >
            <Text style={headerStyles.icon}>🔍</Text>
          </TouchableOpacity>

          {/* 프로필 버튼 */}
          <TouchableOpacity
            onPress={onProfilePress}
            style={headerStyles.profileButton}
          >
            <View style={headerStyles.profileCircle}>
              <Text style={headerStyles.profileText}>
                {userName.charAt(0)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 인사말 섹션 */}
      <View style={headerStyles.greetingSection}>
        <Text style={headerStyles.greetingText}>
          안녕하세요, {userName}님!
        </Text>
        <Text style={headerStyles.greetingSubText}>
          오늘은 무엇을 드실까요?
        </Text>
      </View>
    </View>
  );
};

/**
 * dd 검색 헤더 (검색 페이지용)
 */
export const SearchHeader = ({ 
  searchValue,
  onSearchChange,
  onSearchSubmit,
  placeholder = '음식, 식당 검색',
  onBackPress,
  style 
}) => {
  const theme = lightThemeConfig;

  return (
    <View style={[headerStyles.container, style]}>
      <View style={headerStyles.searchContainer}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={onBackPress}
          style={headerStyles.iconButton}
        >
          <Text style={headerStyles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* 검색 입력창 (dd Input 스타일 적용) */}
        <View style={headerStyles.searchInputContainer}>
          <TextInput
            style={headerStyles.searchInput}
            value={searchValue}
            onChangeText={onSearchChange}
            onSubmitEditing={onSearchSubmit}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.mutedForeground}
            returnKeyType="search"
          />
        </View>

        {/* 검색 버튼 */}
        <TouchableOpacity
          onPress={onSearchSubmit}
          style={headerStyles.searchButton}
        >
          <Text style={headerStyles.icon}>🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// dd 디자인을 정확히 따른 헤더 스타일들
const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: lightThemeConfig.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: lightThemeConfig.colors.border,
    paddingHorizontal: lightThemeConfig.containerPadding.mobile,
    paddingBottom: lightThemeConfig.spacing[4], // 16px
    ...lightThemeConfig.shadows.sm,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44, // 터치 가능한 최소 높이
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  titleSection: {
    flex: 2,
    alignItems: 'center',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  title: {
    fontSize: lightThemeConfig.typography.textStyles.h4.fontSize,
    fontWeight: lightThemeConfig.typography.textStyles.h4.fontWeight,
    color: lightThemeConfig.colors.foreground,
    textAlign: 'center',
  },

  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: lightThemeConfig.colors.primary,
  },

  iconButton: {
    padding: lightThemeConfig.spacing[2],
    marginRight: lightThemeConfig.spacing[2],
  },

  backIcon: {
    fontSize: 18,
    color: lightThemeConfig.colors.foreground,
  },

  icon: {
    fontSize: 16,
  },

  profileButton: {
    marginLeft: lightThemeConfig.spacing[2],
  },

  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: lightThemeConfig.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: lightThemeConfig.colors.primaryForeground,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Home 헤더 인사말 섹션
  greetingSection: {
    marginTop: lightThemeConfig.spacing[4], // 16px
    alignItems: 'flex-start',
  },

  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightThemeConfig.colors.foreground,
    marginBottom: lightThemeConfig.spacing[1], // 4px
  },

  greetingSubText: {
    fontSize: 14,
    color: lightThemeConfig.colors.mutedForeground,
  },

  // 검색 헤더 스타일들
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: lightThemeConfig.spacing[3], // 12px
  },

  searchInputContainer: {
    flex: 1,
  },

  searchInput: {
    height: lightThemeConfig.constants.heights.input,
    borderRadius: lightThemeConfig.borderRadius.md,
    borderWidth: 1,
    borderColor: lightThemeConfig.colors.input,
    paddingHorizontal: lightThemeConfig.constants.padding.input.horizontal,
    fontSize: lightThemeConfig.typography.textStyles.input.fontSize,
    color: lightThemeConfig.colors.foreground,
    backgroundColor: lightThemeConfig.colors.background,
  },

  searchButton: {
    width: 44,
    height: 44,
    borderRadius: lightThemeConfig.borderRadius.md,
    backgroundColor: lightThemeConfig.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { AppHeader as default };