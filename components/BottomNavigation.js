// dd 스타일 하단 네비게이션 바 - 모든 페이지에서 공통으로 사용
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavItem = ({ icon, label, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function BottomNavigation() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => {
    return route.name === routeName;
  };

  const navItems = [
    {
      icon: '🏠',
      label: '홈',
      routeName: 'Home',
      onPress: () => navigation.navigate('Home')
    },
    {
      icon: '🔍',
      label: '검색',
      routeName: 'Search',
      onPress: () => navigation.navigate('Search')
    },
    {
      icon: '❤️',
      label: '찜',
      routeName: 'Favorite',
      onPress: () => navigation.navigate('Favorite')
    },
    {
      icon: '🗺️',
      label: '지도',
      routeName: 'Map',
      onPress: () => navigation.navigate('Map')
    },
    {
      icon: '👤',
      label: '마이',
      routeName: 'MyInfo',
      onPress: () => navigation.navigate('MyInfo')
    }
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.routeName)}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    // iOS safe area 대응
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navIconActive: {
    // 활성화 상태에서는 색상 변경 없이 이모지 유지
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  navLabelActive: {
    color: '#8b5cf6',
    fontWeight: '600',
  },
});