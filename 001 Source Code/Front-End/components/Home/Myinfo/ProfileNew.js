// dd 스타일의 프로필 관리 페이지
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { userService } from '../../../services';

export default function ProfileNew({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    nickname: '',
    address: '',
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    nickname: false,
    address: false,
  });

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

      setProfile({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phoneNumber || '',
        nickname: userInfo.nickname || '',
        address: userInfo.address || '',
      });

    } catch (error) {
      console.error('❌ 사용자 정보 로딩 실패:', error);
      Alert.alert('오류', '사용자 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      console.log('💾 프로필 저장 중...');
      setSaving(true);

      // userService.updateMyInfo() 호출
      const updateData = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
        nickname: profile.nickname,
        address: profile.address,
      };

      await userService.updateMyInfo(updateData);

      console.log('✅ 프로필 저장 완료');

      Alert.alert(
        '프로필 저장 완료',
        '프로필이 성공적으로 저장되었습니다.',
        [{ text: '확인', onPress: () => navigation.goBack() }]
      );

    } catch (error) {
      console.error('❌ 프로필 저장 실패:', error);
      Alert.alert('오류', '프로필 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleProfilePhoto = () => {
    Alert.alert(
      '프로필 사진 변경',
      '프로필 사진 기능은 준비 중입니다.',
      [{ text: '확인' }]
    );
  };

  const EditableField = ({ label, field, value, placeholder, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing[field] ? (
        <View style={styles.editingContainer}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => handleChange(field, text)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoFocus
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsEditing(prev => ({ ...prev, [field]: false }))}
          >
            <Text style={styles.saveButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.fieldValue}
          onPress={() => setIsEditing(prev => ({ ...prev, [field]: true }))}
        >
          <Text style={styles.fieldText}>{value || '입력해주세요'}</Text>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // 로딩 중일 때
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로필 관리</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8b5cf6" />
          <Text style={styles.loadingText}>프로필 정보를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>프로필 관리</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 프로필 사진 */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profilePhotoText}>
                {profile.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleProfilePhoto}
            >
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 기본 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          <View style={styles.sectionContent}>
            <EditableField
              label="이름"
              field="name"
              value={profile.name}
              placeholder="이름을 입력하세요"
            />
            <EditableField
              label="이메일"
              field="email"
              value={profile.email}
              placeholder="이메일을 입력하세요"
              keyboardType="email-address"
            />
            <EditableField
              label="전화번호"
              field="phone"
              value={profile.phone}
              placeholder="전화번호를 입력하세요"
              keyboardType="phone-pad"
            />
            <EditableField
              label="닉네임"
              field="nickname"
              value={profile.nickname}
              placeholder="닉네임을 입력하세요"
            />
            <EditableField
              label="주소"
              field="address"
              value={profile.address}
              placeholder="주소를 입력하세요"
            />
          </View>
        </View>

        {/* 프로필 관리 안내 */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>프로필 관리 안내</Text>
              <Text style={styles.infoText}>
                • 정확한 정보는 더 나은 맛집 추천에 도움이 됩니다{'\n'}
                • 개인정보는 안전하게 암호화되어 보관됩니다{'\n'}
                • 언제든지 정보를 수정하거나 삭제할 수 있습니다
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 저장 버튼 */}
      <View style={styles.saveSection}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>저장하기</Text>
          )}
        </TouchableOpacity>
      </View>
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
  photoSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 96,
    height: 96,
    backgroundColor: '#c7d2fe',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4338ca',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 16,
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
  allergyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  addButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  addButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  fieldContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  fieldValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  editIcon: {
    fontSize: 14,
    marginLeft: 8,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#9ca3af',
    marginLeft: 8,
  },
  editingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#8b5cf6',
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  allergiesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  allergyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  allergyText: {
    fontSize: 14,
    color: '#7c3aed',
    marginRight: 4,
  },
  removeButton: {
    marginLeft: 4,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  emptyAllergies: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  addFirstText: {
    fontSize: 14,
    color: '#8b5cf6',
    textDecorationLine: 'underline',
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
  saveSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.7,
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