//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-6. Log In Validation
// 🔶 로그인 검증

// ✨ constant(상수) 를 따로 모아두는 파일 생성
// 비밀번호 정규 표현식은 뒤에서도 사용할 예정이므로 재사용 할 수 있도록 만듦

import { z } from 'zod';

export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
// 🔨개선 : 에러 메세지도 constant 로 만들 수 있다
export const PASSWORD_REGEX_ERROR =
  'Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-';
