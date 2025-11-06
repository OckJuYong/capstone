// dd 스타일의 마이페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { userService, authService } from '../../../services';

export default function MyInfoNew({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [couponCount, setCouponCount] = useState(0);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      console.log('👤 사용자 정보 로딩 중...');
      setLoading(true);

      // userService.getMyInfo() 호출
      const userInfo = await userService.getMyInfo();

      console.log('✅ 사용자 정보 로드 완료');
      setUser(userInfo);

    } catch (error) {
      console.error('❌ 사용자 정보 로딩 실패:', error);
      // 에러가 발생해도 계속 진행 (기본값 사용)
      setUser({ name: '사용자' });
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      id: "coupon",
      name: "쿠폰함",
      description: `사용 가능한 쿠폰 ${couponCount}장`,
      icon: "🎁",
      onPress: () => navigation.navigate('Coupons'),
    },
    {
      id: "taste",
      name: "내 입맛 분석",
      description: "나의 맛 선호도를 확인해보세요",
      icon: "👅",
      onPress: () => navigation.navigate('TasteMemories'),
    },
    {
      id: "reviews",
      name: "내가 쓴 리뷰",
      description: "작성한 리뷰 내역을 확인하세요",
      icon: "📝",
      onPress: () => navigation.navigate('MyReviews'),
    },
    {
      id: "notice",
      name: "공지사항",
      description: "앱 업데이트 및 공지사항을 확인하세요",
      icon: "🔔",
      onPress: () => navigation.navigate('Notices'),
    },
    {
      id: "event",
      name: "이벤트",
      description: "진행 중인 이벤트를 확인하세요",
      icon: "🎉",
      onPress: () => navigation.navigate('Event'),
    },
    {
      id: "support",
      name: "고객센터",
      description: "문의사항이 있으신가요?",
      icon: "❓",
      onPress: () => {},
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('👋 로그아웃 중...');

              // authService.logout() 호출
              await authService.logout();

              console.log('✅ 로그아웃 완료');

              // 로그인 화면으로 이동
              navigation.replace('Login');

            } catch (error) {
              console.error('❌ 로그아웃 실패:', error);
              Alert.alert('오류', '로그아웃에 실패했습니다.');
            }
          }
        }
      ]
    );
  };

  // 로딩 중일 때
  if (loading || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>사용자 정보를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userName = user.name || user.nickname || '사용자';

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <TouchableOpacity
                style={styles.profileManageButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.profileManageText}>프로필 관리</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.name}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 로그아웃 버튼 */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#c4b5fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  profileManageButton: {
    alignSelf: 'flex-start',
  },
  profileManageText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  logoutSection: {
    padding: 16,
    marginTop: 16,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#6b7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
});