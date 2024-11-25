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

//////////////////////////////////////////////////
// ✅ 2024 SERVER ACTIONS
// ✅ 5-0. Route Handlers

// 🔶 form 처리 방법
// 사용자가 뭔가를 쓸 수 있게 하려면?
// 로그인을 클릭하면 백엔드에서 어떻게 그 정보를 가져오고 확인하고 사용자를 로그인 시킬 수 있는지 알아봄
// 이 작업은 백엔드에서 일어남 그렇다면 무엇을 사용해야 하나?
// 리액트 개발자라면 API URL 을 사용해서 데이터 전송
// 이전 버전의 NextJS 사용한다면 API URL 만듦. 이 url 로 POST request 를 보낼 것이다
// ReactJS 에서 state 를 사용해서 데이터를 처리하고 사용자가 로그인 버튼을 누르면
// axios 나 fetch 등을 사용해서 데이터를 전송. 데이터는 /api/login 으로 보내고 거기서 모든 것을 처리함. 이건 최신 버전의 NextJS 에서도 여전히 잘 작동. 하지만 이것은 더이상 필수가 아님
// Server Action 을 지원하지 않는 이전 버전의 NextJS 에서는 API route를 만드는 것이 유일한 선택지였다
// 이걸 통해서 POST, DELTE, GET 등의 요청을 보냄

// 👵 옛날 API route (/api/login 이렇게 생긴 url) 를 만드는 방식
// 현재 route handler 라고 불린다
// 제삼자가 제공하는 Webhook 을 사용한다면 이런 API url 을 만들어야 하기 때문에 보여줌
// 다른 개발자를 위한 API 를 제작하는 중일 수도 있고
// API 를 필요로하는 IOS, Android, Flutter 클라이언트가 있을 수 있다
// API route 는 화면에 어떤 UI 도 실제로 렌더링 되지 않음
// 다른 서버가 사용하거나 IOS, Android, Flutter 로 만들어진 클라이언트를 위해 만들어진 것
// GET, DELETE, PUT, POST 같은 HTTP Method 를 listen 하고 있는 것

// 🔶 잠시 use client 씀
// Server Action을 사용하지 않는다면 어떻게 해야 하는지 확인해 보기 위해서
'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function Login() {
  // 서버가 이 url을 통해서 돌려준 json을 읽는 것임
  // IOS 앱을 위한 백엔드를 제작한다면 이 방법이 유용
  // API route를 만들어야 함
  const onClick = async () => {
    const response = await fetch('/www/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'nico',
        password: '1234',
      }),
    });
    console.log(await response.json());
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
      </form>
      <span onClick={onClick}>
        <FormButton loading={false} text="Log In" />
      </span>
      <SocialLogin />
    </div>
  );
}
