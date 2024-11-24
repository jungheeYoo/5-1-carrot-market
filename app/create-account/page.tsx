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

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication UI
// 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// ✅ 4-2. Form Components
// UI 요소들을 각각 별도의 component로 만들어
// props로 component를 커스텀 할 수 있도록 함
// ✨ tailwind 는 기본적으로 components 폴더도 보도록 되어 괜찮다

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Create Account Screen
export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
