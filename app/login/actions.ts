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

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-0. Introduction to Zod

// 🔶 zod 유효성 검사 라이브러리 사용

'use server';

export async function handleForm(prevState: any, formData: FormData) {
  return {
    errors: ['wrong password', 'password too short'],
  };
}
