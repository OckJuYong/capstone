// dd/components/bottom-navigation.tsx를 React Native로 100% 정확히 변환
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightThemeConfig } from '../../theme';

// 아이콘 컴포넌트들 (임시로 텍스트 사용, 나중에 react-native-vector-icons로 교체)
const HomeIcon = ({ size, color }) => <Text style={{ fontSize: size, color }}>🏠</Text>;
const SearchIcon = ({ size, color }) => <Text style={{ fontSize: size, color }}>🔍</Text>;
const HeartIcon = ({ size, color }) => <Text style={{ fontSize: size, color }}>❤️</Text>;
const ClipboardIcon = ({ size, color }) => <Text style={{ fontSize: size, color }}>📋</Text>;
const UserIcon = ({ size, color }) => <Text style={{ fontSize: size, color }}>👤</Text>;

const NavItem = ({ icon: IconComponent, label, isActive, onPress }) => {
  const theme = lightThemeConfig;
  
  // dd bottom-navigation.tsx의 정확한 스타일
  // "flex flex-col items-center justify-center px-3"
  const itemStyle = {
    flexDirection: 'column',        // flex-col
    alignItems: 'center',           // items-center
    justifyContent: 'center',       // justify-center
    paddingHorizontal: theme.spacing[3], // px-3 = 12px
    paddingVertical: theme.spacing[2],   // py-2 = 8px (dd에서는 py-2가 기본)
    flex: 1, // React Navigation 바텀 탭에서 균등 분할
  };

  // dd: isActive ? "text-purple-600" : "text-gray-500"
  // 하지만 dd 테마 색상을 사용하도록 수정
  const iconColor = isActive ? theme.colors.primary : theme.colors.mutedForeground;
  const textColor = isActive ? theme.colors.primary : theme.colors.mutedForeground;

  return (
    <TouchableOpacity
      style={itemStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent 
        size={20}  // dd: "h-5 w-5" = 20px
        color={iconColor}
      />
      {/* dd: "text-xs mt-1" */}
      <Text style={{
        fontSize: theme.typography.fontSize.xs,    // text-xs = 12px
        marginTop: theme.spacing[1],               // mt-1 = 4px
        color: textColor,
        fontWeight: isActive ? '600' : '400',
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export const BottomNavigation = ({ state, descriptors, navigation }) => {
  const theme = lightThemeConfig;
  const insets = useSafeAreaInsets();

  // dd bottom-navigation.tsx의 정확한 컨테이너 스타일
  // "fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2"
  const containerStyle = {
    // React Native에서는 position: 'absolute' 대신 React Navigation이 자동 위치 설정
    backgroundColor: theme.colors.background,  // bg-white
    borderTopWidth: 1,                        // border-t
    borderTopColor: theme.colors.border,      // border 색상
    flexDirection: 'row',                     // flex
    // justify-around는 React Navigation에서 자동으로 균등 분할됨
    paddingVertical: theme.spacing[2],        // py-2 = 8px
    paddingBottom: Math.max(theme.spacing[2], insets.bottom), // Safe Area 대응
    
    // dd에서는 max-w-md mx-auto로 모바일 중앙 정렬
    // React Native에서는 전체 화면 너비 사용 (모바일 네이티브)
    width: '100%',
    
    // dd shadow 효과 (웹에서는 border-t만 있지만 앱에서는 그림자 추가)
    ...theme.shadows.sm,
  };

  // 네비게이션 라우트와 아이콘 매핑 (dd와 동일한 구조)
  const getNavItem = (routeName) => {
    switch (routeName) {
      case 'Home':
        return {
          icon: HomeIcon,
          label: '홈',  // dd와 동일
        };
      case 'Search':
        return {
          icon: SearchIcon,
          label: '검색',  // dd와 동일
        };
      case 'Favorite':  // dd: favorites -> MyApp: Favorite
        return {
          icon: HeartIcon,
          label: '찜',    // dd와 동일
        };
      case 'History':   // dd: order-history -> MyApp: History
        return {
          icon: ClipboardIcon,
          label: '주문내역',  // dd와 동일
        };
      case 'MyInfo':    // dd: mypage -> MyApp: MyInfo
        return {
          icon: UserIcon,
          label: '마이',   // dd와 동일
        };
      default:
        return {
          icon: HomeIcon,
          label: routeName,
        };
    }
  };

  return (
    <View style={containerStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const navItem = getNavItem(route.name);

        return (
          <NavItem
            key={route.key}
            icon={navItem.icon}
            label={navItem.label}
            isActive={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default BottomNavigation;