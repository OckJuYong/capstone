// components/Splash/Splash.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { authService } from '../../services';

export default function Splash({ navigation }) {
  useEffect(() => {
    checkAutoLogin();
  }, [navigation]);

  const checkAutoLogin = async () => {
    try {
      console.log('🔍 자동 로그인 확인 중...');

      // 최소 1.5초 splash 표시 (UX 개선)
      const [authResult] = await Promise.all([
        authService.checkAutoLogin(),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);

      // authResult는 객체 { isLoggedIn, token, role, userInfo }
      if (authResult && authResult.isLoggedIn) {
        console.log('✅ 자동 로그인 성공 - Home으로 이동');
        navigation.replace('Home');
      } else {
        console.log('ℹ️ 로그인 필요 - Login 화면으로 이동');
        navigation.replace('Login');
      }

    } catch (error) {
      console.error('❌ 자동 로그인 확인 실패:', error);
      // 에러 발생 시 Login 화면으로
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>맛집 추천 앱</Text>
      <Text style={styles.subtitle}>당신의 입맛을 찾아드려요</Text>
      <ActivityIndicator
        size="large"
        color="#007AFF"
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  loader: {
    marginTop: 30,
  },
});