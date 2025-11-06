/**
 * API 서비스 통합 Export
 *
 * 모든 API 서비스를 한 곳에서 import 할 수 있도록 통합
 *
 * 사용 예시:
 * import { authService, restaurantService } from '../services';
 * await authService.login(email, password);
 */

// 각 서비스 import
import authService from './auth.service';
import restaurantService from './restaurant.service';
import orderService from './order.service';
import userService from './user.service';
import reviewService from './review.service';
import dibsService from './dibs.service';
import couponService from './coupon.service';

// 기존 추천 서비스 (로컬 알고리즘 - 백엔드와 병행 사용 가능)
import * as recommendationService from './recommendationService';

// 통합 Export
export {
  authService,
  restaurantService,
  orderService,
  userService,
  reviewService,
  dibsService,
  couponService,
  recommendationService,
};

// Default Export (전체 서비스 객체)
export default {
  auth: authService,
  restaurant: restaurantService,
  order: orderService,
  user: userService,
  review: reviewService,
  dibs: dibsService,
  coupon: couponService,
  recommendation: recommendationService,
};
