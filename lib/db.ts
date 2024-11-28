//////////////////////////////////////////////////
// ✅ 2024 Prisma
// ✅ 7-2. Prisma Client
// 🔶 만들어진 Client 사용 방법
// 이 Client 는 나의 데이터베이스를 바탕으로 생성 되었음
// Prisma 는 기본적으로 node modules 폴더 안에 생성됨
// .prisma 안의 client 의 index.d.ts 를 보면
// 실제로 schema.prisma 에 작성한 내용을 바탕으로 작성 된 Typescript 코드가 있다
// UserCreateInput 보면 나옴
// 기본적으로 보호하기 위해 만들어진 Typescript 코드
// 그럼 이 Client 를 어떻게 사용할 수 있을까 ?
// lib/db.ts 파일 새로 만듦 여기서 PrismaClient 불러옴
// 그리고 Client 를 초기화

// 🔥 정리
// Typescript를 사용해서 만들었고, 그건 SQL로서 DB로 전달 되었음
// 그리고 DB는 SQL 객체로 응답했다
// 그러면 Prisma는 그걸 Typescript 객체로 변경한다

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// 🔶 코드 테스트
// 새로고침 했을 때 이 파일이 최소 한 번은 실행되는지 확인하기 위해서 page 로 이동
async function test() {
  // 🔹 사용자 생성
  const user = await db.user.create({
    data: {
      username: 'test',
    },
  });
  console.log(user);
}
test();

// // 🔶 findMany
// // 많은 사용자들로 이루어진 배열을 반환
// async function test() {
//   const users = await db.user.findMany({
//     where: {
//       username: {
//         contains: 'est',
//       },
//     },
//   });
//   console.log(users);
// }

// test();

export default db;
