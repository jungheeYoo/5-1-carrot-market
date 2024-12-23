// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-6. Log In Validation
// // 🔶 로그인 검증

// 'use server';

// export async function smsVerification(prevState: any, formData: FormData) {}

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-7. Coerce

// // 🔶 SMS 로그인 프로세스는 두 단계로 되어 있음
// // 1. 유저에게 전화번호 input만 보여주고, token을 보냄
// // 2. 인증번호 input을 보여주고, 거기서 token을 인증함
// // 이 인증번호 input 은 처음엔 안 보이게 할 것임

// // validator : 자바스크립트로 만들어진 라이브러리
// // npm install validator 설치
// // 타입을 알수 없어 에러 남
// // npm i --save-dev @types/validator 설치

// 'use server';

// import { z } from 'zod';
// import validator from 'validator';

// // ✨ token 과 phone 을 검사하는데
// // login action 에서 사용한 formSchema 처럼 꼭 object 안에 넣을 필요는 없다
// // 왜냐하면 이번엔 이 둘을 같이 검사하지 않는다
// // phone 을 먼저 검사한 다음 token 을 검사할 거라, 둘을 같이 둘 필요 없음
// const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// // ✨ tokenSchema 는 number 가 아니다.
// // 유저가 여기에 숫자를 입력할 거니까 number 이긴 하지만
// // 유저가 input 에 무언가를 입력하면 그건 자동으로 string 을 변환될 것이다
// // smsLogin 함수에 formData 가 들어오면 자동으로 string 으로 변환된다는 말이다

// // tokenSchema 를 number 라고 하면 작동하지 않는다. 왜냐하면 유저로부터 받는 것이 string 이기 때문이다
// // 그래서 여기에는 coerce 를 사용해야 함

// // 🔶 coerce(강제)
// // 이렇게 하면 유저가 입력한 string을 number로 변환하려고 시도한다.
// // .min(100000) : 여섯 자로 된 token 을 생성한다
// // .max(999999)
// const tokenSchema = z.coerce.number().min(100000).max(999999);

// export async function smsLogin(prevState: any, formData: FormData) {
//   // 🔹 formData 안의 token 의 type 을 가져옴
//   console.log(typeof formData.get('token')); // string : 숫자를 입력 하지만 사실은 문자
//   // 🔹 coerce 가 있는 tokenSchema 를 사용해 token 을 parse 한 결과의 type 을 가져옴
//   console.log(typeof tokenSchema.parse(formData.get('token'))); // number 로 변환됨
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-8. SMS Validation
// interactive form 만들기 - prevState 사용

'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    'Wrong phone format'
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

/* 
{
  token: false,
  error: undefined,
};
*/
// 이것과 같다
// 그 다음부터 prevState는 내가 return하는 값과 같아진다

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  // ✨ 이 코드는
  // 잘못된 전화번호를 입력하면 validation이 실패하고, token false를 return 한다는 의미
  // token false를 return 한다는 것은, token: false, 이 return 값이 곧 state 가 된다는 거고
  // token input 이 여전히 보이지 않는다는 것
  // prevState.token이 false인 경우, 즉 전화번호를 입력 받고 있다는 것
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
    // token이 true 경우, token을 받고 있다는 것
  } else {
    const result = tokenSchema.safeParse(token); // 토큰 검증
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect('/');
    }
  }
}
