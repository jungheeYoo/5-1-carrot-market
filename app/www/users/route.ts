//////////////////////////////////////////////////
// ✅ 2024 SERVER ACTIONS
// ✅ 5-0. Route Handlers

// 폴더명은 www 로 안하고 api 로 해도 된다 자유
// route.ts 파일명은 매우 스페셜함
// route.ts 라는 파일을 생성하면 NextJS 에게 이 파일이 API route 라고 알려줌
// page.tsx 와는 다르다. 이것은 리액트 컴포넌트를 렌더링 한다
// route.ts 이건 리액트 컴포넌트를 렌더링 하는 것이 아님
// HTTP 요청을 받아서 json 같은 것을 반환하거나 아니면 사용자를 다른 어디가로 이동 시킴
// 핵심은 route.ts 는 UI를 렌더링하지 않는다

// 🔶 여러 HTTP Method 처리하는 방법
// 🔹 GET 요청
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

// 🔹 POST 요청
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('log the user in!!!');
  return Response.json(data);
}
