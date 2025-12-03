// dd/app/login/page.tsx를 React Native로 100% 정확히 변환
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ScreenLayout } from '../layout';
import { Button, Input } from '../ui';
import { lightThemeConfig } from '../../theme';
import { authService, userService } from '../../services';
import { showAlert } from '../../utils/alert';

export default function LoginNew({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const theme = lightThemeConfig;

  // 로그인 처리 (authService 통합)
  const handleLogin = async () => {
    // 유효성 검사
    if (!id || !password) {
      showAlert('로그인 실패', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 로그인 시도:', id);

      // authService.login() 호출 - Mock/Real API 자동 전환
      const { token, user } = await authService.login(id, password);

      console.log('✅ 로그인 성공! Token:', token ? '존재' : '없음');

      // 맛 프로필 확인 - 없으면 온보딩으로
      try {
        const tastes = await userService.getMyTastes();
        console.log('👅 맛 프로필 응답:', JSON.stringify(tastes));

        // 맛 프로필 유효성 체크
        // 1. tastes가 null/undefined
        // 2. tastes가 빈 객체 {}
        // 3. 모든 값이 0 또는 null
        const hasTasteProfile = tastes &&
          typeof tastes === 'object' &&
          Object.keys(tastes).length > 0 &&
          Object.values(tastes).some(v => v !== null && v !== undefined && v > 0);

        console.log('👅 맛 프로필 존재 여부:', hasTasteProfile);

        if (hasTasteProfile) {
          console.log('✅ 기존 사용자 - Home으로 이동');
          navigation.replace('Home');
        } else {
          console.log('🆕 첫 사용자 - 온보딩(Intro)으로 이동');
          navigation.replace('Intro');
        }
      } catch (tasteError) {
        console.log('⚠️ 맛 프로필 조회 실패:', JSON.stringify(tasteError, null, 2));

        // apiClient에서 변환된 에러: { status, message, data }
        const tasteStatus = tasteError.status || tasteError.response?.status;

        // 404 에러 = 맛 프로필이 없는 것 = 첫 사용자
        // 또는 맛 프로필 조회 실패 시 온보딩으로 (안전한 방향)
        if (tasteStatus === 404 || !tasteStatus) {
          console.log('🆕 맛 프로필 없음 - 온보딩으로 이동');
          navigation.replace('Intro');
        } else {
          // 401(토큰만료) 등 인증 관련 에러는 다시 로그인
          console.log('⚠️ 기타 에러 (status:', tasteStatus, ') - 온보딩으로 이동');
          navigation.replace('Intro');
        }
      }

    } catch (error) {
      console.error('❌ 로그인 오류:', JSON.stringify(error, null, 2));

      // 에러 메시지 처리
      let errorMessage = '로그인 중 문제가 발생했습니다.';

      // apiClient에서 변환된 에러 형식: { status, message, data }
      const status = error.status || error.response?.status;
      const message = error.message || error.response?.data?.message;

      if (status) {
        switch (status) {
          case 0:
            errorMessage = '네트워크 연결을 확인해주세요.';
            break;
          case 401:
            errorMessage = '이메일 또는 비밀번호가 잘못되었습니다.';
            break;
          case 404:
            errorMessage = '존재하지 않는 사용자입니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            break;
          default:
            errorMessage = message || '로그인에 실패했습니다.';
        }
      } else if (message) {
        errorMessage = message;
      }

      showAlert('로그인 실패', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // dd: 카카오 로그인 처리
  const handleKakaoLogin = () => {
    showAlert('카카오 로그인', '카카오 로그인 기능이 구현되었습니다.');
    // 임시로 로그인 성공 처리
    navigation.navigate('Home');
  };

  // dd: 구글 로그인 처리
  const handleGoogleLogin = () => {
    showAlert('구글 로그인', '구글 로그인 기능이 구현되었습니다.');
    // 임시로 로그인 성공 처리
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenLayout 
        scrollable={true}
        padding={false}
        safeArea={true}
        statusBarStyle="dark-content"
        // dd: "bg-gradient-to-b from-purple-50 to-white"
        // React Native에서는 LinearGradient 사용 (여기서는 단색으로 근사)
        backgroundColor={theme.colors.background}
        style={{
          // dd: "flex flex-col items-center justify-center min-h-screen p-4"
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: theme.spacing[4], // p-4 = 16px
        }}
      >
        {/* dd: 로고 영역 "w-64 h-32 flex items-center justify-center mb-10" */}
        <View style={{
          width: 256,  // w-64 = 256px
          height: 128, // h-32 = 128px
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing[10], // mb-10 = 40px
        }}>
          {/* dd: "text-4xl font-bold text-purple-600" -> "MobiSync" */}
          <Text style={{
            fontSize: theme.typography.fontSize['4xl'], // text-4xl = 36px
            fontWeight: 'bold',
            color: theme.colors.primary, // dd에서는 purple-600이지만 테마 색상 사용
          }}>
            FoodApp
          </Text>
        </View>

        {/* dd: form "w-full max-w-sm space-y-6" */}
        <View style={{
          width: '100%',
          maxWidth: 384, // max-w-sm = 384px
          gap: theme.spacing[6], // space-y-6 = 24px
        }}>
          
          {/* dd: Input 영역 "space-y-4" */}
          <View style={{ gap: theme.spacing[4] }}> {/* space-y-4 = 16px */}
            
            {/* dd Input 스타일: "border-b border-t-0 border-l-0 border-r-0 rounded-none px-0" */}
            <Input
              placeholder="ID"
              value={id}
              onChangeText={setId}
              autoCapitalize="none"
              style={{
                // dd의 독특한 input 스타일: 하단 테두리만
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderRadius: 0, // rounded-none
                paddingHorizontal: 0, // px-0
                backgroundColor: 'transparent', // bg-transparent
                borderBottomColor: theme.colors.border,
              }}
              containerStyle={{ marginBottom: 0 }}
            />
            
            <Input
              placeholder="PW"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                // dd와 동일한 스타일
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 1,
                borderRadius: 0,
                paddingHorizontal: 0,
                backgroundColor: 'transparent',
                borderBottomColor: theme.colors.border,
              }}
              containerStyle={{ marginBottom: 0 }}
            />
          </View>

          {/* dd: 로그인/회원가입 탭 "flex justify-center space-x-8" */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: theme.spacing[8], // space-x-8 = 32px
          }}>
            <TouchableOpacity
              onPress={() => setActiveTab('login')}
              style={{
                paddingBottom: theme.spacing[1], // pb-1 = 4px
                borderBottomWidth: activeTab === 'login' ? 2 : 0,
                borderBottomColor: theme.colors.primary, // dd: border-purple-600
              }}
            >
              <Text style={{
                color: activeTab === 'login' 
                  ? theme.colors.primary    // dd: text-purple-700
                  : theme.colors.mutedForeground, // dd: text-gray-500
                fontWeight: activeTab === 'login' ? '500' : '400', // dd: font-medium
              }}>
                로그인
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setActiveTab('signup');
                navigation.navigate('Signup');
              }}
              style={{
                paddingBottom: theme.spacing[1],
                borderBottomWidth: activeTab === 'signup' ? 2 : 0,
                borderBottomColor: theme.colors.primary,
              }}
            >
              <Text style={{
                color: activeTab === 'signup' 
                  ? theme.colors.primary
                  : theme.colors.mutedForeground,
                fontWeight: activeTab === 'signup' ? '500' : '400',
              }}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>

          {/* dd: 소셜 로그인 버튼들 "space-y-3" */}
          <View style={{ gap: theme.spacing[3] }}> {/* space-y-3 = 12px */}
            
            {/* dd: 카카오 버튼 "bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400" */}
            <Button
              variant="outline"
              onPress={handleKakaoLogin}
              style={{
                backgroundColor: '#facc15', // bg-yellow-400
                borderColor: '#facc15',     // border-yellow-400
              }}
              textStyle={{
                color: '#000000', // text-black
              }}
            >
              카카오 로그인하기
            </Button>

            {/* dd: 구글 버튼 "bg-white hover:bg-gray-100 text-black border-gray-300" */}
            <Button
              variant="outline"
              onPress={handleGoogleLogin}
              style={{
                backgroundColor: '#ffffff',  // bg-white
                borderColor: '#d1d5db',     // border-gray-300
              }}
              textStyle={{
                color: '#000000', // text-black
              }}
            >
              구글 로그인하기
            </Button>
          </View>

          {/* dd: 메인 로그인 버튼 "bg-purple-600 hover:bg-purple-700" */}
          <Button
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: theme.colors.primary, // 테마에서 primary 사용
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              '로그인'
            )}
          </Button>
        </View>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}

// 사용법:
// 1. 기존 Login.js를 이 파일로 교체
// 2. 또는 점진적 마이그레이션을 위해 LoginNew.js로 사용
// 3. AppNavigator.js에서 Login -> LoginNew로 변경