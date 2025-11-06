// 가장 기본적인 테스트 홈 페이지
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeTest({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
      }}>
        홈페이지 테스트
      </Text>
      <Text style={{
        fontSize: 16,
        color: '#666666',
        marginTop: 10,
        textAlign: 'center',
      }}>
        로그인이 성공적으로 완료되었습니다!
      </Text>
    </View>
  );
}