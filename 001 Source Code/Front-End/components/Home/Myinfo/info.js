
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './InfoStyles';

export default function Info({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🙋‍♂️ 내 정보</Text>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>🎟 내 쿠폰 확인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>👅 내 입맛 성향 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>🔐 비밀번호 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>📝 내가 쓴 리뷰</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>⚙️ 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
