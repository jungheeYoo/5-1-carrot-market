// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-1. Create Account Screen
// // 계정 생성, 로그인, SMS 로그인에서 사용할 모든 component 생성

// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link';

// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <div className="flex flex-col gap-2">
//           <input
//             className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//             type="text"
//             placeholder="Username"
//             required
//           />
//           <span className="text-red-500 font-medium">Input error</span>
//         </div>
//         <button className="primary-btn h-10">Create account</button>
//       </form>
//       <div className="w-full h-px bg-neutral-500" />
//       <div>
//         <Link
//           className="primary-btn flex h-10 items-center justify-center gap-2"
//           href="/sms"
//         >
//           <span>
//             <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
//           </span>
//           <span>Sign up with SMS</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-2. Form Components
// // UI 요소들을 각각 별도의 component로 만들어
// // props로 component를 커스텀 할 수 있도록 함
// // ✨ tailwind 는 기본적으로 components 폴더도 보도록 되어 괜찮다

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link';

// // Create Account Screen
// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="text" placeholder="Username" required errors={[]} />
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="password"
//           placeholder="Confirm Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Create account" />
//       </form>
//       <div className="w-full h-px bg-neutral-500" />
//       <div>
//         <Link
//           className="primary-btn flex h-10 items-center justify-center gap-3"
//           href="/sms"
//         >
//           <span>
//             <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
//           </span>
//           <span>Sign up with SMS</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-3. Log in Screen
// // 소셜 로그인 버튼 분리
// // 분리 후 계정 생성하는 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // Create Account Screen
// export default function CreateAccount() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="text" placeholder="Username" required errors={[]} />
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="password"
//           placeholder="Confirm Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-0. Introduction to Zod

// // 🔶 zod 유효성 검사 라이브러리 사용
// // 사용자가 Server action 으로 보내는 데이터의 유효성 검사에 도움을 줌
// // action 을 dispatch 로 변경. action 을 처리한다는 의미
// // FormButton 은 더이상 loading 갖지 않음. loading={false} 삭제
// // 모든 FormInput 에 name 이 있어야 함. 왜냐면 Server action 에 form 데이터를 넘겨줘야 하기 때문에
// // errors={[]} 일단 삭제

// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { createAccount } from './actions';

// export default function CreateAccount() {
//   const [state, dispatch] = useFormState(createAccount, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <FormInput
//           name="username"
//           type="text"
//           placeholder="Username"
//           required
//         />
//         <FormInput name="email" type="email" placeholder="Email" required />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <FormInput
//           name="confirm_password"
//           type="password"
//           placeholder="Confirm Password"
//           required
//         />
//         <FormButton text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-1. Validation Errors
// // 모든 값 검사하기
// // 데이터 검증 에러를 다루는 방법

// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { createAccount } from './actions';

// // ✨ 타입스크립트는 매우 똑똑해서
// // page 로 와서 state 에 마우스를 올려보면
// // const state: typeToFlattenedError<{
// //   username: string;
// //   email: string;
// //   password: string;
// //   confirm_password: string;
// // }, string> | null | undefined
// // 이렇게 CreateAccount action 의 state 를 안다는 것을 볼 수 있고
// // 기본적으로 CreateAccount action 의 return 값이
// // zod 의 FlattenedError 타입이라는 것을 볼 수 있다
// // 이제 매우 쉽게 각 input 에 error 를 줄 수 있다

// export default function CreateAccount() {
//   const [state, dispatch] = useFormState(createAccount, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <FormInput
//           name="username"
//           type="text"
//           placeholder="Username"
//           required
//           // ✨ 물음표를 넣는 이유는, 값이 string이거나 undefined일 수 있기 때문에
//           errors={state?.fieldErrors.username}
//         />
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={state?.fieldErrors.email}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           errors={state?.fieldErrors.password}
//         />
//         <FormInput
//           name="confirm_password"
//           type="password"
//           placeholder="Confirm Password"
//           required
//           errors={state?.fieldErrors.confirm_password}
//         />
//         <FormButton text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// // 🔥 정리
// // Zod 를 사용해서 에러를 catch 하고 있다
// // 먼저 모든 값을 검사하고, 그 에러를 사용자에게 return 한다
// // 실제로 검증하지 않고 zod 와 NesxtJS 가 모든 것을 해줌
// // 어떤 유효성 검사 로직도 작성하지 않고
// // FormInput 을 errors prop 을 받게 만들었고
// // errors prop 은 string array 이거나 아무 것도 없어야 함
// // 이제 Create accout 를 누르면 UI 에 에러 표시가 됨

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-4. Refactor
// // FormInput 리팩토링
// // Input 컴포넌트를 더 확장성 있고 커스텀 가능하게 만들기 위해서

// // 이제 브라우저에서 제공하는 validation 을 input 에 사용할 수 있다
// // FormInput 의 이름을 Input 으로 변경

// 'use client';

// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { createAccount } from './actions';
// import Input from '@/components/input';
// import Button from '@/components/button';

// export default function CreateAccount() {
//   const [state, dispatch] = useFormState(createAccount, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Fill in the form below to join!</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <Input
//           name="username"
//           type="text"
//           placeholder="Username"
//           required
//           errors={state?.fieldErrors.username}
//           minLength={3}
//           maxLength={10}
//         />
//         <Input
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={state?.fieldErrors.email}
//         />
//         <Input
//           name="password"
//           type="password"
//           placeholder="Password"
//           minLength={4}
//           required
//           errors={state?.fieldErrors.password}
//         />
//         <Input
//           name="confirm_password"
//           type="password"
//           placeholder="Confirm Password"
//           required
//           minLength={4}
//           errors={state?.fieldErrors.confirm_password}
//         />
//         <Button text="Create account" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-6. Log In Validation
// 🔶 로그인 검증

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '../lib/constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
