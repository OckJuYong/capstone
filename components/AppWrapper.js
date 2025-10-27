// 모든 화면을 감싸는 래퍼 컴포넌트 - 하단 네비게이션 포함
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from './BottomNavigation';

export default function AppWrapper({ children, showBottomNav = true }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      {showBottomNav && <BottomNavigation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingBottom: 70, // BottomNavigation 높이만큼 여백 추가
  },
});