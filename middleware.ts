//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication
// ✅ 8-9. Middleware

// ⚡ Middleware
// 로그인하지 않은 user 나 인증되지 않은 user 에게
// 어떻게 private page 를 보호하게 해주는지 ?
// Middleware 는 이름처럼 중간에서 동작하는 일종의 software 를 뜻함
// 어떤 것과 다른 것 사이에서 실행 됨. 어떤 것 사이에서 작동하는 Code
// NextJS 의 middleware 경우에는
// request 하는 source 즉 User 와 그 대상의 request 사이에서 작동한다.
// middleware 의 장점은 임의의 코드를 실행할 수 있지만 이후 어떤 일이 일어날지 수정할 수도 있다
// user 가 원하는 곳으로 가게 허가하거나 다른 곳으로 redirect 시킬 수도 있다

// 🔶 방법
// app 폴더 옆에 새 파일 만들기
// app 폴더와 동일한 레벨이다. 내부 아님.

// 콘솔로그로 찍어보면 7번이나 실행된다. 이유는 페이지를 변경할 때마다 middleware 가 실행될 뿐만 아니라
// 웹 사이트의 모든 request 마다 middleware 가 실행되기 때문이다. 모든 것에 대해 실행 됨
// image 를 가져올 때, JavaScript 코드를 다운로드하려고 할 때 실행 되고 브라우저가 CSS 코드, JavaScript 파일 등을 다운받을 때 실행되고 등등

import { NextRequest, NextResponse } from 'next/server';
import getSession from '@/lib/session';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  // console.log('Hi im middleware');
  // console.log(request.url);
  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl);

  // 🔹 만약 request.nexUrl 의 pathname 이 /profile 과 같다면
  // 이 프로필 페이지를 보호 할 것임. 누구도 가는 것을 허락하지 않음
  // response 를 return 할 것이고 이 response 는 NextJS 개념이 아님
  // 이건 response 를 나타내는 fetch API 인터페이스이다
  // json 을 사용한 다음 Redirect 해서 작동하는지 확인
  // 이제 누구든 /profile 로 가야하는 사람은 이 response 를 받게 될 것임
  // middleware 가 request 를 가로채서 profile 페이지로 가려는 request 를 완전히 중단시킴
  // 그리고 error: 'you are not allowed here', 을 리턴시킴
  // 이렇게 프로필 페이지가 응답하도록 허용하는 대신 middleware 가 대신 응답할 수 있다

  // if (request.nextUrl.pathname === '/profile') {
  //   return Response.json({
  //     error: 'you are not allowed here',
  //   });
  // }

  // 🔹 redirect 하기
  // http://localhost:3000/profile 다시 해보면 http://localhost:3000 로 즉시 redirect 됨. response 를 변경하고 있다

  // console.log(request.cookies.getAll()); // request 의 cookie 도 얻을 수 있다
  // console.log(cookies()); // cookie function 은 이렇게도 작동. 이 뜻은 getSession 을 할수도 있다는 것
  const session = await getSession();
  console.log(session);
  // { id: 5 } cookie 볼 수 있다! 로그인 안하면 {}
  // 즉 user 가 로그인했는지 여부 확인할 수 있음

  if (request.nextUrl.pathname === '/profile') {
    // 여기에 새로운 URL 을 보내는데 이건 Javascript 의 constructor 이다
    // user 가 이동하기를 원하는 URL 입력, url 의 base 로 request.url
    return NextResponse.redirect(new URL('/', request.url));
  }
}
