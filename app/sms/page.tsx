// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-3. Log in Screen
// // 소셜 로그인 버튼 분리
// // 분리 후 계정 생성하는 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/button';
// import FormInput from '@/components/input';

// export default function SMSLogin() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput
//           type="number"
//           placeholder="Phone number"
//           required
//           errors={[]}
//         />
//         <FormInput
//           type="number"
//           placeholder="Verification code"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Verify" />
//       </form>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-6. Log In Validation
// // 🔶 로그인 검증

// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { useFormState } from 'react-dom';
// import { smsVerification } from './actions';

// export default function SMSLogin() {
//   const [state, dispatch] = useFormState(smsVerification, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         <Input name="phone" type="number" placeholder="Phone number" required />
//         <Input
//           name="token" // verification token 을 받을거니까 name 을 token 이라고 함
//           type="number"
//           placeholder="Verification code"
//           required
//         />
//         <Button text="Verify" />
//       </form>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-7. Coerce

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

// Create Account Screen
export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {/* phone input 의 type 은 number 가 아니라 text 여야 함 이유는 나중에 */}
        <Input name="phone" type="text" placeholder="Phone number" required />
        <Input
          name="token"
          type="number"
          placeholder="Verification code"
          required
          min={100000} // string 이나 text 가 아니라 number 에 대한 거니 min, max 써야함
          max={999999}
        />
        <Button text="Verify" />
      </form>
    </div>
  );
}
