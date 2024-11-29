//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication
// ✅ 8-5. Email Log In
// 🔶 이메일과 비밀번호로 로그인 하기

// iron session 이 NextJS 로부터 오는 쿠키를 받아서
// delicious-karrot 라는 쿠키가 존재하는지 검사
// 만약 존재하지 않으면 새로 만들고
// 존재한다면 이 비밀번호를 사용해서 내용을 복호화 함
// password: process.env.COOKIE_PASSWORD!,
// 그 쿠키의 내용을 수정한 뒤 저장하면 내용을 암호화하는 데에도 같은 비밀번호를 씀
// 그래서 유저는 쿠키 내용을 수정할 수 없고, 무슨 내용이 있는지도 알 수 없다
// 하지만 그말은 우리가 iron session 을 사용하고 싶은 모든 곳에서
// 우리가 쿠키를 얻고 싶은 모든 곳에서, 쿠키를 수정하고 저장하고 싶은 곳에서
// 모든 곳에 이걸 복붙해서 사용해야 한다는 뜻이다
// 쿠키의 이름과 비밀번호가 항상 같아야 하기 때문이다
// 그래서 lib 폴더 안에 함수로 넣음

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// 쿠키가 id 가 없을 수도 있다 (로그아웃 상태). 세션에 id 가 없을 수도 있기 때문
interface SessionContent {
  id?: number;
}

export default function getSession() {
  // console.log(cookies());

  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-karrot',
    password: process.env.COOKIE_PASSWORD!,
  });
}
