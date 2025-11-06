// dd 디자인 시스템을 적용한 표준 Screen Layout 컴포넌트
import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightThemeConfig } from '../../theme';

/**
 * dd 디자인 가이드라인을 따르는 표준 화면 레이아웃
 * 
 * Props:
 * - children: 화면 내용
 * - scrollable: 스크롤 가능 여부 (기본: true)
 * - padding: 기본 패딩 적용 여부 (기본: true)
 * - backgroundColor: 배경색 (기본: theme.colors.background)
 * - safeArea: SafeArea 적용 여부 (기본: true)
 * - statusBarStyle: 상태바 스타일 ('light-content' | 'dark-content')
 * - header: 헤더 컴포넌트
 * - footer: 푸터 컴포넌트
 */
export const ScreenLayout = ({
  children,
  scrollable = true,
  padding = true,
  backgroundColor,
  safeArea = true,
  statusBarStyle = 'dark-content',
  header,
  footer,
  style,
  contentContainerStyle,
  ...props
}) => {
  const theme = lightThemeConfig;
  const insets = useSafeAreaInsets();

  // dd의 기본 배경색 (globals.css: bg-background)
  const defaultBackgroundColor = backgroundColor || theme.colors.background;

  // dd의 container padding: "2rem" = 32px -> 모바일에서는 16px로 조정
  const containerPadding = padding ? theme.containerPadding.mobile : 0;

  // 기본 컨테이너 스타일
  const containerStyle = {
    flex: 1,
    backgroundColor: defaultBackgroundColor,
  };

  // 콘텐츠 영역 스타일
  const contentStyle = {
    flex: 1,
    paddingHorizontal: containerPadding,
  };

  // 스크롤뷰 콘텐츠 컨테이너 스타일
  const scrollContentStyle = {
    flexGrow: 1,
    paddingHorizontal: containerPadding,
    // dd의 기본 하단 간격
    paddingBottom: theme.spacing[6], // 24px
    ...contentContainerStyle,
  };

  const Container = safeArea ? SafeAreaView : View;
  const ContentContainer = scrollable ? ScrollView : View;

  return (
    <Container style={[containerStyle, style]} {...props}>
      {/* dd에서는 상태바가 자동 처리되지만 RN에서는 명시적 설정 */}
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={defaultBackgroundColor}
      />
      
      {/* 헤더 영역 */}
      {header && (
        <View style={headerStyles.container}>
          {header}
        </View>
      )}

      {/* 메인 콘텐츠 영역 */}
      <ContentContainer
        style={scrollable ? { flex: 1 } : contentStyle}
        contentContainerStyle={scrollable ? scrollContentStyle : undefined}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ContentContainer>

      {/* 푸터 영역 */}
      {footer && (
        <View style={footerStyles.container}>
          {footer}
        </View>
      )}
    </Container>
  );
};

// dd의 일반적인 헤더 스타일
const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: lightThemeConfig.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: lightThemeConfig.colors.border,
    // dd의 기본 헤더 패딩
    paddingHorizontal: lightThemeConfig.containerPadding.mobile,
    paddingVertical: lightThemeConfig.spacing[4], // 16px
  },
});

// dd의 일반적인 푸터 스타일
const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: lightThemeConfig.colors.background,
    borderTopWidth: 1,
    borderTopColor: lightThemeConfig.colors.border,
    paddingHorizontal: lightThemeConfig.containerPadding.mobile,
    paddingVertical: lightThemeConfig.spacing[4], // 16px
  },
});

/**
 * dd App Layout의 특정 섹션들을 구현한 레이아웃 컴포넌트들
 */

// dd의 카드 섹션 레이아웃 (Home 페이지 등에서 사용)
export const SectionLayout = ({ 
  title, 
  moreAction,
  children,
  backgroundColor = 'transparent',
  style 
}) => {
  const theme = lightThemeConfig;
  
  return (
    <View style={[
      {
        backgroundColor: backgroundColor === 'white' ? theme.colors.background : backgroundColor,
        paddingHorizontal: theme.containerPadding.mobile,
        paddingVertical: theme.spacing[5], // 20px
      },
      style
    ]}>
      {/* dd의 섹션 헤더: "flex justify-between items-center mb-4" */}
      {(title || moreAction) && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing[4], // 16px
        }}>
          {title && (
            <Text style={{
              fontSize: theme.typography.textStyles.h3.fontSize,
              fontWeight: theme.typography.textStyles.h3.fontWeight,
              color: theme.colors.foreground,
            }}>
              {title}
            </Text>
          )}
          {moreAction}
        </View>
      )}
      
      {children}
    </View>
  );
};

// dd의 그리드 레이아웃 (카테고리 등에서 사용)
export const GridLayout = ({ 
  columns = 2, 
  gap = 16, 
  children,
  style 
}) => {
  const theme = lightThemeConfig;
  
  return (
    <View style={[
      {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: gap,
        // CSS Grid의 justify-content: space-between 효과
        justifyContent: columns > 2 ? 'space-between' : 'space-around',
      },
      style
    ]}>
      {React.Children.map(children, (child, index) => (
        <View style={{
          width: columns === 1 ? '100%' : 
                 columns === 2 ? `${(100 - (gap / 10)) / 2}%` :
                 columns === 3 ? `${(100 - (gap / 5)) / 3}%` :
                 `${(100 - (gap * (columns - 1) / 10)) / columns}%`,
        }}>
          {child}
        </View>
      ))}
    </View>
  );
};

// dd의 스택 레이아웃 (수직 배치)
export const StackLayout = ({ 
  gap = 16, 
  children,
  horizontal = false,
  style 
}) => {
  return (
    <View style={[
      {
        flexDirection: horizontal ? 'row' : 'column',
        gap: gap,
      },
      style
    ]}>
      {children}
    </View>
  );
};

export default ScreenLayout;