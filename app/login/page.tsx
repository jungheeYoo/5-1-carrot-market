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

//////////////////////////////////////////////////
// ✅ 2024 SERVER ACTIONS
// ✅ 5-1. Server Actions

// 🔶 NextJS 의 Server Action 을 사용해 form 처리하는 방법
// router 핸들러를 생성하고 POST 를 fetch 하는 대신
// Login 컴포넌트 안에서 handleForm 함수 만듦

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

// 🔹 위에 적었던 'use client'; 처럼 use server 적어줌
// use server는 이 함수가 서버에서만 실행되도록 만들어 줌
// Server action 은 async function(비동기 함수)여야 함

// 🔹 네트워크 탭으로 이동하면 클릭할 때 무슨일이 일어나는지 볼 수 있다
// 클릭하면 POST request 가 발생
// 즉, NextJS 가 POST method를 위한 route 핸들러를 만든다는 뜻
// NextJS 가 이런 작업을 자동으로 하고 있음. 오직 use server 만 적으면 된다
// 그럼 NextJS 는 이 코드가 console.log('i run in the server baby!');
// 로그인 form 이 submit 되었을 때 실행되어야 한다는 것을 알 수 있다
// 조금 더 자세히 보면 Payload 를 볼 수 있는데 여기에는 보이는 데이터가 들어있지 않다
// ✨ 그 이유는 Server action 으로 작업할 때는 input 에는 name 속성이 필요하다

// 🔹 로그인 다시 하고 네트워크 탭을 다시 보면 Sever Action 을 통해서 데이터를 즉시 전송함
// 내 데이터가 자동으로 백엔드로 보내짐!!
// state 로 데이터를 모을 필요도 없고 onChange 나 fetch 할 필요도 없음!

// 🔹 넘겨진 데이터 가져오는 방법
// Server action 을 만드는 순간, () 여기서 데이터를 받을 수 있다
// 데이터 타입은 FormData
// 이건 FormData constructor 내부에서 오는 것
// formData 이름은 상관없고: 타입은 FormData 이어야 함

// useState 나 어떤 ReactJS 의 기능은 사용하지 않고
// useEffect 도 없고 useState 도 없고 onchange 도 없음
// 하지만 백엔드에서 실행되고 있다
// route 핸들러를 만들 필요가 없이 async function handleForm(formData: FormData) {} 여기서 다 일어남
// NextJS 가 여기 코드를 route 핸들러 안에 넣을 것임

export default function Login() {
  // 🔶 Server action
  async function handleForm(formData: FormData) {
    // const handleForm = async() => { 화살표 함수
    'use server';
    console.log(formData.get('email'), formData.get('password'));
    console.log('i run in the server baby!');
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      {/* 🔶 handleForm 복사해 form 에 action 에 handleForm 넣어줌 */}
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
