// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication
// // ✅ 8-9. Middleware

// // ⚡ Middleware
// // 로그인하지 않은 user 나 인증되지 않은 user 에게
// // 어떻게 private page 를 보호하게 해주는지 ?
// // Middleware 는 이름처럼 중간에서 동작하는 일종의 software 를 뜻함
// // 어떤 것과 다른 것 사이에서 실행 됨. 어떤 것 사이에서 작동하는 Code
// // NextJS 의 middleware 경우에는
// // request 하는 source 즉 User 와 그 대상의 request 사이에서 작동한다.
// // middleware 의 장점은 임의의 코드를 실행할 수 있지만 이후 어떤 일이 일어날지 수정할 수도 있다
// // user 가 원하는 곳으로 가게 허가하거나 다른 곳으로 redirect 시킬 수도 있다

// // 🔶 방법
// // app 폴더 옆에 새 파일 만들기
// // app 폴더와 동일한 레벨이다. 내부 아님.

// // 콘솔로그로 찍어보면 7번이나 실행된다. 이유는 페이지를 변경할 때마다 middleware 가 실행될 뿐만 아니라
// // 웹 사이트의 모든 request 마다 middleware 가 실행되기 때문이다. 모든 것에 대해 실행 됨
// // image 를 가져올 때, JavaScript 코드를 다운로드하려고 할 때 실행 되고 브라우저가 CSS 코드, JavaScript 파일 등을 다운받을 때 실행되고 등등

// import { NextRequest, NextResponse } from 'next/server';
// import getSession from '@/lib/session';
// import { cookies } from 'next/headers';

// export async function middleware(request: NextRequest) {
//   // console.log('Hi im middleware');
//   // console.log(request.url);
//   // console.log(request.nextUrl.pathname);
//   // console.log(request.nextUrl);

//   // 🔹 만약 request.nexUrl 의 pathname 이 /profile 과 같다면
//   // 이 프로필 페이지를 보호 할 것임. 누구도 가는 것을 허락하지 않음
//   // response 를 return 할 것이고 이 response 는 NextJS 개념이 아님
//   // 이건 response 를 나타내는 fetch API 인터페이스이다
//   // json 을 사용한 다음 Redirect 해서 작동하는지 확인
//   // 이제 누구든 /profile 로 가야하는 사람은 이 response 를 받게 될 것임
//   // middleware 가 request 를 가로채서 profile 페이지로 가려는 request 를 완전히 중단시킴
//   // 그리고 error: 'you are not allowed here', 을 리턴시킴
//   // 이렇게 프로필 페이지가 응답하도록 허용하는 대신 middleware 가 대신 응답할 수 있다

//   // if (request.nextUrl.pathname === '/profile') {
//   //   return Response.json({
//   //     error: 'you are not allowed here',
//   //   });
//   // }

//   // 🔹 redirect 하기
//   // http://localhost:3000/profile 다시 해보면 http://localhost:3000 로 즉시 redirect 됨. response 를 변경하고 있다

//   // console.log(request.cookies.getAll()); // request 의 cookie 도 얻을 수 있다
//   // console.log(cookies()); // cookie function 은 이렇게도 작동. 이 뜻은 getSession 을 할수도 있다는 것
//   const session = await getSession();
//   console.log(session);
//   // { id: 5 } cookie 볼 수 있다! 로그인 안하면 {}
//   // 즉 user 가 로그인했는지 여부 확인할 수 있음

//   if (request.nextUrl.pathname === '/profile') {
//     // 여기에 새로운 URL 을 보내는데 이건 Javascript 의 constructor 이다
//     // user 가 이동하기를 원하는 URL 입력, url 의 base 로 request.url
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication
// // ✅ 8-10. Matcher

// // 🔶 미들웨어가 특정 페이지에서만 실행되도록 하는 방법
// // 🔶 cookie 들을 설정하는 방법
// // user 가 특정 행동을 하거나, 특정 페이지로 이동할 때를 위해 cookie 설정할 수 있어서
// // 예를 들어 dark mode 를 위한 cookie 를 추가하거나
// // cookie 를 확인해서 user 의 국가에 따라 특정 페이지로 redirect 시키는 등등

// import { NextRequest, NextResponse } from 'next/server';
// import getSession from './lib/session';

// export async function middleware(request: NextRequest) {
//   console.log('hello');
//   // 🔹 옵션 1 - 여기에 와서 if 그리고 URL을 확인
//   // 🔹 user 가 홈페이지로 이동하고 싶다
//   // const pathname = request.nextUrl.pathname;
//   // if (pathname === '/') {
//   //   // ✨ cookie 설정
//   //   // cookie를 설정하려면, 먼저 우리가 user 에게 실제로 제공할 response 를 가져와야 함
//   //   // 왜냐하면 우리는 user 에게 제공할 response 를 가져와서, 우리가 원하는 cookie 를 그 response 에 넣기를 원하기 때문

//   //   // 여기에 user 에 주기를 원하는 response 를 가져옴. NextResponse 는 우리에게 user 에게 제공할 response 를 줌. // 📍 여기서 request 를 가졌고
//   //   const response = NextResponse.next();
//   //   // response.cookies.set 으로 cookie 를 설정할 수 있다. middleware-cookie hello 나옴 // request 를 가로 챔.  // 📍 request 에 정보를 추가하고
//   //   response.cookies.set('middleware-cookie', 'hello'); // 📍 수정한 뒤에 그 request 를 user 에게 제공
//   //   return response;
//   // }
//   // if (pathname === '/profile') {
//   //   return NextResponse.redirect(new URL('/', request.url));
//   // }
// }

// // 🔹 옵션 2 - matcher 사용
// export const config = {
//   matcher: ['/', '/profile', '/create-account', '/user/:path*'],
//   // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// // middleware 가 특정 request 에서 실행되지 않도록 하는 방법
// // middleware 에게 실행할 위치와 실행하지 않을 위치를 알려주면
// // 이름은 middleware , config 꼭 이렇게 사용해야 함
// // matcher array 는
// // matcher: ['/', '/profile', '/create-account'],
// // Middleware가 실행되어야 하는 페이지를 지정할 수 있다
// // 그리고 middleware 를 user 로 시작하는 모든 단일 URL 에서 실행하고 싶다고 말할 수도 있다
// // '/user/:path*'
// // /use/profile
// // /use/reviews
// // /use/reviews/add
// // 아니면 regular expression(정규 방정식)을 붙여 넣을 수도 있다
// // /api, Next.js 가 static file 을 저장하는 /_next, /_next/image, fivicon 을 제외하고 모든 페이지에서 이 middleware 를 실행하고 싶다
// // 이건 공식문서 페이지에서 찾은 것이므로 똑같이 따라할 필요는 없다

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication
// ✅ 8-11. Edge Runtime

// 🔶 Edge Runtime
// Edge Runtime 은 일종의 제한된 버전의 node.js 로 생각하면 된다
// javascript 도 실행할 수 있고, Cookie 도 볼 수 있고 할 수 있지만
// NodeJs 가 할 수 있는 걸 모두 하진 못한다
// 이유는 ? middleware 가 모든 단일 request 에 대해 실행되어야 하기 때문이다
// 이 의미는 만약 우리가 여기에 그냥 NodeJs code 를 작성할 수 있다면
// middleware 는 엄청 빠르게 시작하지 않을 것이다
// 왜냐면 더 무거운 nodeJs runtime 전체를 시작해야 하기 때문이다
// Edge Runtime 은 node.js API 의 경량 버전
// 이것이 바로 여기서 Prisma 를 사용할 수 없는 이유이다
// middleware 에서 할 수 있는 것은 많지 않음
// 강력하지만 속도에 대한 타협 때문에 NodeJs 에서 구동하지 않음
// node.js 의 더 작은, 말하자면 경량 버전과 같은 Edge 런타임에서 실행 된다
// 이것이 The Edge 런타임이다

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication
// ✅ 8-12. Authentication Middleware
// ✅ 12-1. Intercepting Routes : product => home 으로 바꿈 이 부분만 우선 수정
// 🔶 인증된 사용자만 접근할 수 있도록 하는 미들웨어 만들기

import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

// 🔶 코드 순서
// 사용자가 쿠키에 ID 를 갖고 있는지 확인
// session 이 id 가 없다면 user 는 로그아웃 상태라는 뜻
// 다음 단계는 user 가 어디로 가려고 하는지 알아내야함
// 사용자는 어디로 가는걸까?
// 이걸 찾기 위해 public 으로 접근 간으한 url 담은 object 만들기
// 여기서 인증되지 않은 user 가 갈 수 있는 URL 을 저장할 것임
// 여기서 Array 로 저장하는 것이 아닌 object 를 저장하고 있다.
// 왜냐하면 만약 object 내에서 뭔가를 포함하고 있는지 검색하는 것이
// Array 내에서 뭔가를 포함하고 있나 검색하는 것 보다 약간 더 빠르기 때문
// exists 에 user 가 갈 예정인 url 넣음
// pathname 은 URL 의 /create-account 이 부분을 말함
// domain name 과 HTTPs 같은 것들은 포함되지 않으며
// 어디든 user 가 가려하는 페이지이다
// 여기서 타입스크립트는 이것들이 유일한 옵션이라는 것을 알고 있기 때문에 불평함
// 인터페이스 만들어줌
// 이제 user 가 publicOnlyUrls 로 이동하는지 알 수 있다
// 이제 만약 user 가 login 상태가 아니라면 publicOnlyUrls 로 이동하지 못 할 것이다
// user 를 redirect 해야 함. 홈페이지로 돌아옴
// 그럼 사용자가 로그인 되어 있다면?
// 로그인 되어 있다면 publicOnlyUrls 이 페이지로 이동할 수 있어선 안된다
// user 가 publicOnlyUrls 로 가려고 한다면 user 에게 /login 으로 갈 수 없다는 사실을 알려 줄 것임

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
