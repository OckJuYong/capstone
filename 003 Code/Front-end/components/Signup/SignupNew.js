// dd 스타일을 적용한 회원가입 페이지 (dd에는 별도 signup 페이지가 없어서 Login 스타일 기반으로 구현)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { ScreenLayout } from '../layout';
import { Button, Input } from '../ui';
import { AppHeader } from '../layout/Header';
import { lightThemeConfig } from '../../theme';
import { authService } from '../../services';
import { showAlert } from '../../utils/alert';

export default function SignupNew({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = lightThemeConfig;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 초기화
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
    }

    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('📝 회원가입 시도:', formData.email);

      // authService.signup() 호출 - 기본 맛 프로필 포함
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        address: formData.address,
        phoneNumber: formData.phone,
        // 기본 맛 프로필 (Intro에서 수정 가능)
        userTaste: {
          spicy: 3.0,
          umami: 3.0,
          sour: 3.0,
          sweet: 3.0,
          salty: 3.0,
          bitter: 3.0,
        },
      };

      const { token } = await authService.signup(signupData);

      console.log('✅ 회원가입 성공! Token:', token ? '존재' : '없음');

      // 회원가입 성공 - 맛 프로필 설정 화면으로 이동 (웹/앱 호환)
      showAlert(
        '회원가입 성공',
        '환영합니다! 당신의 입맛을 알려주세요.',
        [
          {
            text: '확인',
            onPress: () => navigation.replace('Intro')
          }
        ]
      );

    } catch (error) {
      console.error('❌ 회원가입 오류:', error);

      // 에러 메시지 처리
      let errorMessage = '회원가입 중 문제가 발생했습니다.';

      if (error.response) {
        switch (error.response.status) {
          case 409:
            errorMessage = '이미 존재하는 이메일입니다.';
            break;
          case 400:
            errorMessage = error.response.data?.message || '입력 정보를 확인해주세요.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            break;
          default:
            errorMessage = error.response.data?.message || '회원가입에 실패했습니다.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      showAlert('회원가입 실패', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      safeArea={true}
      scrollable={false}
      padding={false}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.background}
      header={
        <AppHeader
          title="회원가입"
          showBackButton={true}
          navigation={navigation}
        />
      }
    >
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: theme.spacing[4], // p-4
            paddingVertical: theme.spacing[6],   // py-6
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* dd Login 스타일 기반의 회원가입 폼 */}
          <View style={{
            width: '100%',
            maxWidth: 384, // max-w-sm
            alignSelf: 'center',
            gap: theme.spacing[6], // space-y-6
          }}>
            
            {/* 로고 영역 (Login과 동일하지만 작게) */}
            <View style={{
              alignItems: 'center',
              marginBottom: theme.spacing[6],
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize['2xl'], // 조금 작게
                fontWeight: 'bold',
                color: theme.colors.primary,
              }}>
                FoodApp
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.mutedForeground,
                marginTop: theme.spacing[2],
              }}>
                새 계정을 만들어보세요
              </Text>
            </View>

            {/* 입력 필드들 */}
            <View style={{ gap: theme.spacing[4] }}>

              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                error={errors.name}
                autoCapitalize="words"
              />

              <Input
                label="닉네임"
                placeholder="닉네임을 입력하세요"
                value={formData.nickname}
                onChangeText={(value) => handleInputChange('nickname', value)}
                error={errors.nickname}
                autoCapitalize="none"
              />

              <Input
                label="이메일"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="전화번호"
                placeholder="전화번호를 입력하세요"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                error={errors.phone}
                keyboardType="phone-pad"
              />

              <Input
                label="주소"
                placeholder="주소를 입력하세요"
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                error={errors.address}
                autoCapitalize="words"
              />

              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력하세요 (6자 이상)"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                error={errors.password}
                secureTextEntry
              />

              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                error={errors.confirmPassword}
                secureTextEntry
              />
            </View>

            {/* 약관 동의 영역 */}
            <View style={{
              padding: theme.spacing[4],
              backgroundColor: theme.colors.muted,
              borderRadius: theme.borderRadius.md,
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.mutedForeground,
                textAlign: 'center',
                lineHeight: 16,
              }}>
                회원가입을 진행하시면 서비스 이용약관 및{'\n'}
                개인정보처리방침에 동의하는 것으로 간주됩니다.
              </Text>
            </View>

            {/* 회원가입 버튼 (dd Login 메인 버튼 스타일) */}
            <Button
              onPress={handleSignup}
              disabled={loading}
              style={{
                backgroundColor: theme.colors.primary,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                '회원가입'
              )}
            </Button>

            {/* 로그인으로 이동 */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: theme.spacing[2],
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.mutedForeground,
              }}>
                이미 계정이 있으신가요?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.primary,
                  fontWeight: '500',
                }}>
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}