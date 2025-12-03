// utils/alert.js
// 웹과 앱 모두 호환되는 Alert 유틸리티
import { Alert, Platform } from 'react-native';

/**
 * 크로스 플랫폼 Alert
 * - 네이티브(iOS/Android): React Native Alert 사용
 * - 웹: window.confirm/alert 사용 후 콜백 실행
 *
 * @param {string} title - 알림 제목
 * @param {string} message - 알림 메시지
 * @param {Array} buttons - 버튼 배열 [{text, onPress, style}]
 * @param {Object} options - 추가 옵션
 */
export const showAlert = (title, message, buttons = [{ text: '확인' }], options = {}) => {
  if (Platform.OS === 'web') {
    // 웹 환경
    if (buttons.length === 1) {
      // 단일 버튼 (확인만)
      window.alert(`${title}\n\n${message}`);
      if (buttons[0].onPress) {
        buttons[0].onPress();
      }
    } else if (buttons.length === 2) {
      // 두 버튼 (취소/확인)
      const result = window.confirm(`${title}\n\n${message}`);
      if (result) {
        // 확인 클릭 - 보통 두 번째 버튼이 확인
        const confirmBtn = buttons.find(b => b.style !== 'cancel') || buttons[1];
        if (confirmBtn?.onPress) {
          confirmBtn.onPress();
        }
      } else {
        // 취소 클릭
        const cancelBtn = buttons.find(b => b.style === 'cancel') || buttons[0];
        if (cancelBtn?.onPress) {
          cancelBtn.onPress();
        }
      }
    } else {
      // 3개 이상 버튼 - 첫 번째 버튼만 실행 (웹 제한)
      window.alert(`${title}\n\n${message}`);
      if (buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    }
  } else {
    // 네이티브 환경 (iOS/Android)
    Alert.alert(title, message, buttons, options);
  }
};

/**
 * 간단한 알림 (확인 버튼만)
 * @param {string} title
 * @param {string} message
 * @param {Function} onConfirm - 확인 후 콜백
 */
export const showSimpleAlert = (title, message, onConfirm) => {
  showAlert(title, message, [
    { text: '확인', onPress: onConfirm }
  ]);
};

/**
 * 확인/취소 알림
 * @param {string} title
 * @param {string} message
 * @param {Function} onConfirm - 확인 콜백
 * @param {Function} onCancel - 취소 콜백 (선택)
 */
export const showConfirmAlert = (title, message, onConfirm, onCancel) => {
  showAlert(title, message, [
    { text: '취소', style: 'cancel', onPress: onCancel },
    { text: '확인', onPress: onConfirm }
  ]);
};

export default {
  show: showAlert,
  simple: showSimpleAlert,
  confirm: showConfirmAlert
};
