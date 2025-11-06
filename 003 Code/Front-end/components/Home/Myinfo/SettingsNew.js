// dd 스타일의 설정 페이지
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Switch, Alert } from 'react-native';

export default function SettingsNew({ navigation }) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    marketingNotifications: false,
    orderNotifications: true,
    reviewNotifications: true,
    darkMode: false,
    locationServices: true,
    autoLogin: true,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    Alert.alert(
      '설정 변경됨',
      '설정이 성공적으로 변경되었습니다.',
      [{ text: '확인' }]
    );
  };

  const handleTerms = () => {
    Alert.alert(
      '이용약관',
      '이용약관 페이지로 이동합니다.\\n\\n실제 앱에서는 웹뷰나 별도 페이지가 열립니다.',
      [{ text: '확인' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      '개인정보 처리방침',
      '개인정보 처리방침 페이지로 이동합니다.\\n\\n실제 앱에서는 웹뷰나 별도 페이지가 열립니다.',
      [{ text: '확인' }]
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 회원탈퇴를 하시겠습니까?\\n\\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '탈퇴하기', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('탈퇴 완료', '회원탈퇴가 완료되었습니다.');
          }
        }
      ]
    );
  };

  const SettingItem = ({ title, description, value, onToggle }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e5e7eb', true: '#c084fc' }}
        thumbColor={value ? '#8b5cf6' : '#f4f4f5'}
        ios_backgroundColor="#e5e7eb"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 설정</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="푸시 알림"
              description="앱 푸시 알림을 받습니다"
              value={settings.pushNotifications}
              onToggle={() => handleToggle('pushNotifications')}
            />
            <SettingItem
              title="마케팅 알림"
              description="프로모션 및 마케팅 알림을 받습니다"
              value={settings.marketingNotifications}
              onToggle={() => handleToggle('marketingNotifications')}
            />
            <SettingItem
              title="주문 알림"
              description="주문 상태 변경 알림을 받습니다"
              value={settings.orderNotifications}
              onToggle={() => handleToggle('orderNotifications')}
            />
            <SettingItem
              title="리뷰 알림"
              description="리뷰 관련 알림을 받습니다"
              value={settings.reviewNotifications}
              onToggle={() => handleToggle('reviewNotifications')}
            />
          </View>
        </View>

        {/* 앱 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 설정</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="다크 모드"
              description="어두운 테마를 사용합니다"
              value={settings.darkMode}
              onToggle={() => handleToggle('darkMode')}
            />
            <SettingItem
              title="위치 서비스"
              description="현재 위치 기반 서비스를 사용합니다"
              value={settings.locationServices}
              onToggle={() => handleToggle('locationServices')}
            />
            <SettingItem
              title="자동 로그인"
              description="앱 실행 시 자동으로 로그인합니다"
              value={settings.autoLogin}
              onToggle={() => handleToggle('autoLogin')}
            />
          </View>
        </View>

        {/* 계정 관리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 관리</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.menuItemText}>프로필 수정</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleTerms}>
              <Text style={styles.menuItemText}>이용약관</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
              <Text style={styles.menuItemText}>개인정보 처리방침</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, styles.dangerItem]} 
              onPress={handleWithdraw}
            >
              <Text style={styles.dangerText}>회원탈퇴</Text>
              <Text style={[styles.arrowIcon, styles.dangerText]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <View style={styles.sectionContent}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>버전</Text>
              <Text style={styles.infoValue}>1.3.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>최근 업데이트</Text>
              <Text style={styles.infoValue}>2024-01-15</Text>
            </View>
          </View>
        </View>

        {/* 도움말 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>설정 도움말</Text>
              <Text style={styles.infoText}>
                • 알림 설정은 언제든지 변경 가능합니다{'\n'}
                • 위치 서비스를 끄면 주변 맛집 추천이 제한됩니다{'\n'}
                • 다크 모드는 배터리 절약에 도움이 됩니다{'\n'}
                • 문제가 있으시면 고객센터로 문의해주세요
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionContent: {
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#ef4444',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9ca3af',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  infoValue: {
    fontSize: 16,
    color: '#6b7280',
  },
  infoSection: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});