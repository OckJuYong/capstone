// components/Login/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 기본 유효성 검사
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 여기에 실제 로그인 API 호출 로직을 추가하세요
      console.log('로그인 시도:', email, password);
      
      // 임시로 로그인 성공으로 처리
      // 실제로는 서버 응답을 받아서 처리해야 합니다
      const loginSuccess = true;
      
      if (loginSuccess) {
        // 첫 사용자인지 판별하는 로직
        // 실제로는 서버에서 사용자 정보를 받아와서 판별해야 합니다
        const isFirstTime = checkIfFirstTimeUser(email);
        
        if (isFirstTime) {
          // 첫 사용자라면 입맛 측정 화면으로
          navigation.navigate('Intro');
        } else {
          // 기존 사용자라면 홈 화면으로
          navigation.navigate('Home');
        }
      } else {
        Alert.alert('로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('오류', '로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 첫 사용자인지 판별하는 함수 (임시)
  const checkIfFirstTimeUser = (email) => {
    // 실제로는 서버에서 사용자 정보를 확인해야 합니다
    // 임시로 localStorage나 AsyncStorage에서 확인하거나
    // 서버 API를 호출해서 사용자의 입맛 설정 여부를 확인
    
    // 예시: 특정 이메일은 기존 사용자로 처리
    const existingUsers = ['existing@example.com', 'user@test.com'];
    return !existingUsers.includes(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupButtonText}>회원가입하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    paddingVertical: 15,
  },
  signupButtonText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});