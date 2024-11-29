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

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-7. Coerce

// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { useFormState } from 'react-dom';
// import { smsLogin } from './actions';

// // Create Account Screen
// export default function SMSLogin() {
//   const [state, dispatch] = useFormState(smsLogin, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">SMS Login</h1>
//         <h2 className="text-xl">Verify your phone number.</h2>
//       </div>
//       <form action={dispatch} className="flex flex-col gap-3">
//         {/* phone input 의 type 은 number 가 아니라 text 여야 함 이유는 나중에 */}
//         <Input name="phone" type="text" placeholder="Phone number" required />
//         <Input
//           name="token"
//           type="number"
//           placeholder="Verification code"
//           required
//           min={100000} // string 이나 text 가 아니라 number 에 대한 거니 min, max 써야함
//           max={999999}
//         />
//         <Button text="Verify" />
//       </form>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-8. SMS Validation
// interactive form 만들기 - prevState 사용

// 🔶 prevState
// useFormState 를 사용할 때, 첫 번째 argument 는 실행하고 싶은 action 이고
// 두 번째는 useFormState hook 의 initial state 였다
// 두 번째는 useFormState hook의 initial state이다 => null
// 이 initial state는, 이 함수를 최초 호출할 때의 prevState 값이 된다
// const [state, dispatch] = useFormState(smsLogin, null);
// 이 함수를 처음으로 호출할 때, prevState 는 null 여기에 initial state 로 넣은 값과 같다는 것이다
// null 을 수정 - initialState
// 이게 뭐냐면 이 페이지가 처음 render 되면 state.token 의 값은 false 가 된다
// 이 말은, 여기서 input 을 숨기는 데 이걸 사용할 수 있다는 것이다
// state.token이 true이면 input을 보여주고, false이면 null
// 이러면 token 숨겨짐

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogIn } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {/* ✨ input 숨기기 */}
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          // 유저가 전화번호를 바꾸는 걸 방지하기 위해서 여기에 붙임
          <Input
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        {/* state.token이 true이면 '토큰 인증하기', false이면 '인증 문자 보내기' */}
        <Button
          text={state.token ? 'Verify Token' : 'Send Veriffication SMS'}
        />
      </form>
    </div>
  );
}
