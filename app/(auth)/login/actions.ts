// // import { redirect } from 'next/navigation';
// redirect('/'); // home으로 감 작동하기 위해서 navigation 썼음
// ✨ action은 사용자를 다른 곳으로 redirect도 할 수 있다

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-3. useFormState
// // // Server Action 의 결과를 UI로 전달하는 방법
// // ✨ login/page.tsx 에서 옮겨 옴
// // ✨ actions.ts 라는 새로운 파일 만들어서 옮겨줌 use server 옮겨줌
// // client component 에서도 server action 을 호출할 수 있지만 그 로직이 여기 있을 수는 없다
// // use server 로 시작하는, 분리된 파일에 있어야 함
// // 여기 있는 모든 함수들은 전부 서버에서 실행 됨
// 'use server';

// export async function handleForm(prevState: any, formData: FormData) {
//   console.log(prevState);
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   // redirect('/'); // home으로 감
//   return {
//     errors: ['wrong password', 'password too short'],
//   };
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-0. Introduction to Zod

// // 🔶 zod 유효성 검사 라이브러리 사용

// 'use server';

// export async function handleForm(prevState: any, formData: FormData) {
//   return {
//     errors: ['wrong password', 'password too short'],
//   };
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-6. Log In Validation
// // 🔶 로그인 검증

// 'use server';

// import { z } from 'zod';
// import {
//   PASSWORD_MIN_LENGTH,
//   PASSWORD_REGEX,
//   PASSWORD_REGEX_ERROR,
// } from '../../lib/constants';

// const formSchema = z.object({
//   email: z.string().email().toLowerCase(),
//   password: z
//     .string({
//       required_error: 'Password is required',
//     })
//     .min(PASSWORD_MIN_LENGTH)
//     .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
// });

// export async function login(prevState: any, formData: FormData) {
//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   };
//   const result = formSchema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error.flatten());
//     return result.error.flatten();
//   } else {
//     console.log(result.data);
//   }
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication
// ✅ 8-5. Email Log In
// 🔶 이메일과 비밀번호로 로그인 하기

'use server';

import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  // 🔹 find a user with the email
  // 🔹 이메일로 사용자 찾기
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An accout with this email.'),
  password: z.string({
    required_error: 'Password is required',
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  // ✨ safeParseAsync = spa 같음
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 🔹 if the user is found, check password hash
    // 🔹 사용자를 찾았을때만 비밀번호의 해시값 확인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    // 이 user 로 password 를 검사하면 됨
    // 다시 bcrypt 호출
    // compare 은 사용자가 보낸 비밀번호를 받음 (패스워드에 작성한 비밀번호)
    // 그걸 데이터베이스의 해시값과 비교함
    // 사용자가 보낸 비밀번호로 데이터베이스의 해시 값을 만들 수 있는지 확인함
    // 이 값이 true 라면 비밀번호가 일치한다는 것
    // 첫 번째 인자 : 평문 비밀번호 (사용자가 나에게 보내는 것)
    // 두 번째 인자 : 데이터베이스의 해시 값
    // 그 값은 const user = await db.user.findUnique({}); 여기서 조회
    // 이 전체 코드가 실행될 때는 refine method 가 checkEmailExists 함수를 실행하고
    // 이미 true 를 return 했을 것이다
    // 이 말은 이 유저가 이미 데이터베이스에 존재한다는 것이고
    // 이게 const user = await db.user.findUnique({}); 실행될 때는 유저가 데이터베이스에 확실히 존재한다는 것을 알고 있음
    // 그래서 if else 를 할 필요가 없다
    // 대신 Prisma 에게 user 가 존재한다는 것이 확실히다고 말해줌 user!
    // 그리고 password 가 null일 수 있다 (string | null)
    // 왜냐면 schema 에서 Prisma 에게 이렇게 알려줬음
    // 유저가 전화번호나 GitHub id 로 로그인할 수도 있기 때문이었음
    // 그래서 지금은 이렇게 함. 일단 지금만. (타입스크립트를 만족시키기 위해)
    // user 의 password 가 없다면, 빈 문자열 해시 값과 비교한다는 것
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx'
    );

    // 🔹 log the user in
    // 🔹 만약 비밀번호의 해시값이 일치한다면, 비밀번호가 정확하다면 사용자를 로그인 시킴
    // 로그인시키기 위해서는 세션을 가져와야 함
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      // 🔹 redirect '/profile'
      // 🔹 사용자를 /profile로 보냄
      redirect('/profile');
    } else {
      // Zod 인척 하기
      return {
        fieldErrors: {
          password: ['Wrong password'],
          email: [],
        },
      };
    }
  }
}
