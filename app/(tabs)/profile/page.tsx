// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication
// // ✅ 8-3. Iron Session
// // 🔶 사용자 로그인 시키기

// export default function Profile() {
//   return <h1>welcome to your profile</h1>;
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication
// // ✅ 8-7. Log Out
// // 🔶 테스팅 - log in, logout
// // 유저가 로그아웃 할 수 있도록 action 만들지만 최종 profile 페이지는 아님

// // 🔶 이 페이지에는 user 에 관련한 정보 보여주기
// // 🔶 user 가 logout 하도록 클릭 버튼 만들기

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { cookies } from 'next/headers';
// import { notFound, redirect } from 'next/navigation';

// // 📍 user 함수
// async function getUser() {
//   const session = await getSession();
//   if (session.id) {
//     // 🔹 user id 가 있다면?
//     // user id 와 세션안의 id 를 확인하고 일치하는 USer 찾는다
//     const user = await db.user.findUnique({
//       where: {
//         id: session.id,
//       },
//     });
//     if (user) {
//       return user;
//     }
//   }
//   notFound();
// }

// //❓ user 를 찾을 수 없는 경우는?
// // user 가 어떻게 cookie 를 갖고 있고, 그 cookie 가 id 를 갖고 있더라도
// // 여전히 user 를 찾을 수 없을 때 어떤 일이 벌어지는지 알 필요가 있다
// // 또한, user 가 session 을 갖고 있지 않다면?

// // ⚡ notFound()
// // redirect 를 사용할 수 있는 것과 똑같이 notFound() 를 import 할 수 있고
// // 이건 notFound response 를 trigger 할 것임
// // 만약 looged out user 가 profile page 로 가려고 할 때 session ID 가 없다면
// // 혹은 user 를 찾을 수 없다면, session 이 있지만 user 를 찾지 못하거나 session 이 없는 경우
// // notFound 함수를 trigger 함
// // http://localhost:3000/profile 이렇게 들어가면 page 를 찾을 수 없다고 나온다. page 를 보호해준다

// export default async function Profile() {
//   // 🔷 user 데이터 얻기
//   const user = await getUser();
//   const logOut = async () => {
//     'use server';
//     const session = await getSession();
//     await session.destroy();
//     redirect('/');
//   };
//   return (
//     <div>
//       <h1>Welcome! {user?.username}!</h1>
//       <form action={logOut}>
//         <button>Log out</button>
//       </form>
//       {/* <form action={logOut}>
//         <input type="submit" value={'Log out'} />
//       </form> */}
//     </div>
//   );
// }

// // ✨ user 가 누군지 보이는 과정
// // 우리가 profile 페이지로 갈 때 NextJS 는 request 요청을 생성하고
// // Cookie 를 우리 back-end 에 보낸다
// // 우리server 안에 async function getUser() {} 여기 이 code 들이 동작하고 있다
// //  그러므로 여기 이 코드들이 서버에 작동하니까 lib/session 파일 안에
// // function getSession() 을 여기서 호출할 때
// // 우리는 Cookies 를 사용하고 있으며 lib/session 파일 안에 Cookies 를 콘솔로그 할 수 있다
// // 따라서 새로고침 하면 cookies 를 볼 수 있다
// // 보면 getSession() function 이 이 browser 의 Cookies 를 받고 있다
// // 이것이 우리가 delicious-karrot 이라는 Cookies 를 암호화를 이용해서 열 수 있고
// // Cookies 안에서 ID 를 얻을 수 있고 user 가 누군지 알 수 있는 것이다
// // 이렇게 우리는 user 가 누군지 알 수 있다

// // 🔶 로그 아웃 버튼 만들기
// // <button></button> 버튼 만들기
// // onClick 을 예상했을 수 있으나 form 안에 button 을 넣음
// // 그럼 이 button 이 클릭될 때마다 이 form 을 submit 할 것임
// // 그 의미는 inline server action 을 만들 수 있다
// // 여기 안에서 session 을 없앨 것임
// // 다시 말해 cookie 를 없애는 것이다. 그러므로 user 는 logged in 상태가 아닌 것
// // 그럼 cookie 는 사라지고 유저를 home 으로 redirect 시킬 것이다
// // 이 form 의 action 은 logOut sever 동작이라고 알려주는 것임
// // 이것은 작은 팁이다
// // action 을 트리거하는 버튼이 있으면 항상 onClick 을 사용한다
// // 그래서 client component 를 사용해야 한다
// // 그 대신에 button 을 form 안에 넣고 만약 form 안에 다른 button 이 없다면 이 버튼은 form 을 제출할 것이다
// // 다른 방법도 있다. 똑같이 form 을 제출하지만 button 을 만드는 것이 더 좋은 방법이다
// // <input type='submit' value={'Log out'} />

//////////////////////////////////////////////////
// ✅ 2024 Caching
// ✅ 13-9. Recap part Two

import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

async function Username() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const user = await getUser();
  return <h1>Welcome! {user?.username}!</h1>;
}

export default async function Profile() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <div>
      <Suspense fallback={'Welcome!'}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
