// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-3. Log in Screen
// // 소셜 로그인 버튼 분리
// // 분리 후 계정 생성하는 화면과 로그인 화면에서 모두 사용

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// export default function Login() {
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
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
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-0. Route Handlers

// // 🔶 form 처리 방법
// // 사용자가 뭔가를 쓸 수 있게 하려면?
// // 로그인을 클릭하면 백엔드에서 어떻게 그 정보를 가져오고 확인하고 사용자를 로그인 시킬 수 있는지 알아봄
// // 이 작업은 백엔드에서 일어남 그렇다면 무엇을 사용해야 하나?
// // 리액트 개발자라면 API URL 을 사용해서 데이터 전송
// // 이전 버전의 NextJS 사용한다면 API URL 만듦. 이 url 로 POST request 를 보낼 것이다
// // ReactJS 에서 state 를 사용해서 데이터를 처리하고 사용자가 로그인 버튼을 누르면
// // axios 나 fetch 등을 사용해서 데이터를 전송. 데이터는 /api/login 으로 보내고 거기서 모든 것을 처리함. 이건 최신 버전의 NextJS 에서도 여전히 잘 작동. 하지만 이것은 더이상 필수가 아님
// // Server Action 을 지원하지 않는 이전 버전의 NextJS 에서는 API route를 만드는 것이 유일한 선택지였다
// // 이걸 통해서 POST, DELTE, GET 등의 요청을 보냄

// // 👵 옛날 API route (/api/login 이렇게 생긴 url) 를 만드는 방식
// // 현재 route handler 라고 불린다
// // 제삼자가 제공하는 Webhook 을 사용한다면 이런 API url 을 만들어야 하기 때문에 보여줌
// // 다른 개발자를 위한 API 를 제작하는 중일 수도 있고
// // API 를 필요로하는 IOS, Android, Flutter 클라이언트가 있을 수 있다
// // API route 는 화면에 어떤 UI 도 실제로 렌더링 되지 않음
// // 다른 서버가 사용하거나 IOS, Android, Flutter 로 만들어진 클라이언트를 위해 만들어진 것
// // GET, DELETE, PUT, POST 같은 HTTP Method 를 listen 하고 있는 것

// // 🔶 잠시 use client 씀
// // Server Action을 사용하지 않는다면 어떻게 해야 하는지 확인해 보기 위해서
// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// export default function Login() {
//   // 서버가 이 url을 통해서 돌려준 json을 읽는 것임
//   // IOS 앱을 위한 백엔드를 제작한다면 이 방법이 유용
//   // API route를 만들어야 함
//   const onClick = async () => {
//     const response = await fetch('/www/users', {
//       method: 'POST',
//       body: JSON.stringify({
//         username: 'nico',
//         password: '1234',
//       }),
//     });
//     console.log(await response.json());
//   };
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form className="flex flex-col gap-3">
//         <FormInput type="email" placeholder="Email" required errors={[]} />
//         <FormInput
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//       </form>
//       <span onClick={onClick}>
//         <FormButton loading={false} text="Log In" />
//       </span>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-1. Server Actions

// // 🔶 NextJS 의 Server Action 을 사용해 form 처리하는 방법
// // router 핸들러를 생성하고 POST 를 fetch 하는 대신
// // Login 컴포넌트 안에서 handleForm 함수 만듦

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// // 🔹 위에 적었던 'use client'; 처럼 use server 적어줌
// // use server는 이 함수가 서버에서만 실행되도록 만들어 줌
// // Server action 은 async function(비동기 함수)여야 함

// // 🔹 네트워크 탭으로 이동하면 클릭할 때 무슨일이 일어나는지 볼 수 있다
// // 클릭하면 POST request 가 발생
// // 즉, NextJS 가 POST method를 위한 route 핸들러를 만든다는 뜻
// // NextJS 가 이런 작업을 자동으로 하고 있음. 오직 use server 만 적으면 된다
// // 그럼 NextJS 는 이 코드가 console.log('i run in the server baby!');
// // 로그인 form 이 submit 되었을 때 실행되어야 한다는 것을 알 수 있다
// // 조금 더 자세히 보면 Payload 를 볼 수 있는데 여기에는 보이는 데이터가 들어있지 않다
// // ✨ 그 이유는 Server action 으로 작업할 때는 input 에는 name 속성이 필요하다

// // 🔹 로그인 다시 하고 네트워크 탭을 다시 보면 Sever Action 을 통해서 데이터를 즉시 전송함
// // 내 데이터가 자동으로 백엔드로 보내짐!!
// // state 로 데이터를 모을 필요도 없고 onChange 나 fetch 할 필요도 없음!

// // 🔹 넘겨진 데이터 가져오는 방법
// // Server action 을 만드는 순간, () 여기서 데이터를 받을 수 있다
// // 데이터 타입은 FormData
// // 이건 FormData constructor 내부에서 오는 것
// // formData 이름은 상관없고: 타입은 FormData 이어야 함

// // useState 나 어떤 ReactJS 의 기능은 사용하지 않고
// // useEffect 도 없고 useState 도 없고 onchange 도 없음
// // 하지만 백엔드에서 실행되고 있다
// // route 핸들러를 만들 필요가 없이 async function handleForm(formData: FormData) {} 여기서 다 일어남
// // NextJS 가 여기 코드를 route 핸들러 안에 넣을 것임

// export default function Login() {
//   // 🔶 Server action
//   async function handleForm(formData: FormData) {
//     // const handleForm = async() => { 화살표 함수
//     'use server';
//     console.log(formData.get('email'), formData.get('password'));
//     console.log('i run in the server baby!');
//   }
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       {/* 🔶 handleForm 복사해 form 에 action 에 handleForm 넣어줌 */}
//       <form action={handleForm} className="flex flex-col gap-3">
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={[]}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormButton loading={false} text="Log in" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-2. useFormStatus
// // Server Action 경과와 UI가 서로 소통하는 방법
// // 예를 들어, Server Action 이 로딩중일 때 버튼을 비활성화

// // 사용자에게 이 Server Action 에 시간이 좀 걸린다는 것을 알려줘야 함
// // 그리고 버튼을 비활성화 해야 함

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';

// export default function Login() {
//   async function handleForm(formData: FormData) {
//     'use server';
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     console.log('logged in!');
//   }
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form action={handleForm} className="flex flex-col gap-3">
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={[]}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           errors={[]}
//         />
//         <FormButton text="Log in" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-3. useFormState
// // Server Action 의 결과를 UI로 전달하는 방법

// 'use client';

// import FormButton from '@/components/form-btn';
// import FormInput from '@/components/form-input';
// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { handleForm } from './actions';

// // Server Action에서 오류가 발생한다면? 아이디나 비밀번호가 틀렸다면? 이럴 때 useFormState hook을 사용
// // 이 hook을 사용하기 위해서는 결과를 알고 싶은 action을 인자로 넘겨줘야 함
// // 예를 들어 이 action이 뭔가 return 하도록 해봄
// // 잘못된 비밀번호라는 error 를 보낸다
// // 그리고 이 action 을 useFormState 에게 넘겨줌

// export default function Login() {
//   // 🔶 배열의 첫 번째 아이템은 state 가 됨
//   // 이 경우에, stat는 action의 return 값이 될 것임
//   // 두 번째 아이템은 action
//   // 이것은 handleForm 이 함수 action을 실행시킬 것임
//   // useState 를 사용하는 것과 비슷함
//   // action을 useFormState로 넘겨주면
//   // useFormState hook은 action의 결과를 돌려 줌
//   // 그리고 action 을 실행하는 트리거도 준다
//   // useFormState 을 쓴다는 것은 UI 를 interactive 하게 만들겠다는 것이다
//   // 왜냐하면, 사용자에게 에러 메세지를 보여주길 원하기 때문이다
//   // 그럼 이것은 interactive UI 이다. 에러는 나중에 보일테니까
//   // 따라서 이것을 client component 로 바꿔줘야 함
//   // 하지만 에러남. 이유는 client component 내부에서 use server 를 선언할 수 없기 때문이다
//   // 이 use server action 은 server component 안에서만 작동한다
//   // ✨ actions.ts 라는 새로운 파일 만들어서 옮겨줌 use server 옮겨줌
//   // client component 에서도 server action 을 호출할 수 있지만 그 로직이 여기 있을 수는 없다
//   // use server 로 시작하는, 분리된 파일에 있어야 함
//   // 하지만 타입스크립트가 여전히 불평한다
//   // 그 이유는 useFormState 를 쓸 때 실행하고자 하는 action 을 전달하는 것 뿐만 아니라
//   // 초기값도 필수적으로 제공해야 한다
//   // useState 에 초기값을 넘겨줄 수 있는 것 처럼 useFormState 에도 초기 값을 넘겨줘야 한다
//   // useFormState에도 초기값도 필수적으로 넘겨 줘야 함
//   // 보통은 null을 넘김
//   // 그래도 타입스크립트가 불명하는데
//   // 이 에러는 useFormState에도 를 사용할 때 하나가 아니라 두 개의 인자를 사용해서 action 을 호출해서 발생한건데
//   // 이 hook 을 사용하기 전에는 여기 form 의 hook 이 아니라 우리가 만든 action 을 넣었을 때는
//   // NextJS 가 우리 action 을 호출하느 방식을 생각해보면 이런식이다
//   // handleForm(formData)
//   // 전에 본 것 처럼 이렇게 formData와 함께 호출될 것이다
//   // 문제는 이제 useFormState 을 사용하고 있다는 것이다
//   // 이제 action 은 실제로는 action 의 이전 state 와 함께 호출될 것이다
//   // state 를 return 하는 action 은 유용하게 사용될 수 있다
//   // 사용자가 submit 한 다음, 다시 action 을 트리거 할 때 이전의 state 도 가져올 수 있기 때문이다
//   // 지금 알아야 할 것은, useFormState 가 aciton 을 호출하면
//   // action은 formData와 함께 이전에 반환한 state, 또는 처음에 설정해둔 state 와 실행될 것이다
//   // action은 formData와 함께 호출되는데
//   // 처음에는, 초기 값 state와 함께 호출되고
//   // 다음부터는 이전 action에서 return된 state와 함께 호출 됨

//   const [state, action] = useFormState(handleForm, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       {/* 만약에 여기에 handleForm을 그대로 넣어버리면
//       useFormState을 쓰는 이유가 없다. 결과를 알 수 없다
//       대신 우리가 만든 action을 useFormState에게 넘겨주고
//       트리거를 받아서 action에 넘겨줌
//       */}
//       <form action={action} className="flex flex-col gap-3">
//         <FormInput
//           name="email"
//           type="email"
//           placeholder="Email"
//           required
//           errors={[]}
//         />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           // 에러가 존재하지 않는다면, 빈 배열을 반환
//           errors={state?.errors ?? []}
//         />
//         <FormButton text="Log in" />
//       </form>
//       <SocialLogin />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-0. Introduction to Zod

// // 🔶 zod 유효성 검사 라이브러리 사용
// // form-input 에러 수정. 이러면 errors 를 꼭 넣을 필요 없음
// // errors={[]} 에러 삭제

// 'use client';

// import FormButton from '@/components/button';
// import FormInput from '@/components/input';
// import SocialLogin from '@/components/social-login';
// import { useFormState } from 'react-dom';
// import { handleForm } from './actions';

// export default function Login() {
//   const [state, action] = useFormState(handleForm, null);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       <div className="flex flex-col gap-2 *:font-medium">
//         <h1 className="text-2xl">안녕하세요!</h1>
//         <h2 className="text-xl">Log in with email and password.</h2>
//       </div>
//       <form action={action} className="flex flex-col gap-3">
//         <FormInput name="email" type="email" placeholder="Email" required />
//         <FormInput
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <FormButton text="Log in" />
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

import FormButton from '@/components/button';
import FormInput from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';
import { PASSWORD_MIN_LENGTH } from '../../../lib/constants';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
