// //////////////////////////////////////////////////
// // ✅ 2024 Prisma
// // ✅ 7-2. Prisma Client
// // 🔶 만들어진 Client 사용 방법
// // 이 Client 는 나의 데이터베이스를 바탕으로 생성 되었음
// // Prisma 는 기본적으로 node modules 폴더 안에 생성됨
// // .prisma 안의 client 의 index.d.ts 를 보면
// // 실제로 schema.prisma 에 작성한 내용을 바탕으로 작성 된 Typescript 코드가 있다
// // UserCreateInput 보면 나옴
// // 기본적으로 보호하기 위해 만들어진 Typescript 코드
// // 그럼 이 Client 를 어떻게 사용할 수 있을까 ?
// // lib/db.ts 파일 새로 만듦 여기서 PrismaClient 불러옴
// // 그리고 Client 를 초기화

// // 🔥 정리
// // Typescript를 사용해서 만들었고, 그건 SQL로서 DB로 전달 되었음
// // 그리고 DB는 SQL 객체로 응답했다
// // 그러면 Prisma는 그걸 Typescript 객체로 변경한다

// import { PrismaClient } from '@prisma/client';

// const db = new PrismaClient();

// // 🔶 코드 테스트
// // 새로고침 했을 때 이 파일이 최소 한 번은 실행되는지 확인하기 위해서 page 로 이동
// async function test() {
//   // 🔹 사용자 생성
//   const user = await db.user.create({
//     data: {
//       username: 'test',
//     },
//   });
//   console.log(user);
// }
// test();

// // // 🔶 findMany
// // // 많은 사용자들로 이루어진 배열을 반환
// // async function test() {
// //   const users = await db.user.findMany({
// //     where: {
// //       username: {
// //         contains: 'est',
// //       },
// //     },
// //   });
// //   console.log(users);
// // }

// // test();

// export default db;

//////////////////////////////////////////////////
// ✅ 2024 Prisma
// ✅ 7-4. Relationships
// SMSToken 모델 만들기
// 이 모델은 User 모델과 연결 됨. 그리고 SMS 인증을 위해서 사용할 것임

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// 🔶 SMSToken 확인 가능
// 1 이라는 id 를 생성했고, userId: 3 확인
// user 는 DB 에 저장되지 않는다. 이건 그냥 DB 와 Prisma 를 위한 힌트일 뿐이다
// userId 속성은 user id 를 참고하고 있다

// {
//   id: 1,
//   token: '1212112',
//   created_at: 2024-11-28T11:33:15.774Z,
//   updated_at: 2024-11-28T11:33:15.774Z,
//   userId: 3
// }

// async function test() {
//   const token = await db.sMSToken.create({
//     data: {
//       token: '1212112',
//       user: {
//         connect: {
//           id: 3,
//         },
//       },
//     },
//   });
//   console.log(token);
// }
// test();

// 🔶 findUnique
// 토큰 찾기
// id: 1 이 id를 갖고 token id 가 1인 토큰을 찾을 것임
// Prisam 에게 user 를 포함하라고 말하는 순간
// Prisma 가 DB 에 있는 사용자를 userId 다음에 포함한다
// include 객체는 관계를 포함하는 데 사용된다
// 만약 SMSToken 이 사용자를 갖고 있다면
// SMSToken 을 검색할 때 사용자를 포함시킬 수 있다
// 어떤 상품을 가진다고 해도 user 를 포함시킬 수 있다
// 또는 어떤 상품의 댓글을 포함할 수도 있다

// {
//   id: 1,
//   token: '1212112',
//   created_at: 2024-11-28T11:33:15.774Z,
//   updated_at: 2024-11-28T11:33:15.774Z,
//   userId: 3,
//   user: {
//     id: 3,
//     username: 'test',
//     email: null,
//     password: null,
//     phone: null,
//     github_id: null,
//     avatar: null,
//     created_at: 2024-11-28T10:56:51.655Z,
//     updated_at: 2024-11-28T10:56:51.655Z
//   }
// }

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
  console.log(token);
}
test();

export default db;

// 🔥 정리
// userId 3 을 확인했다
// 그리고 Prisma 와 DB 는 이 userId 가 사실은
// user 의 id 를 참조하고 있단 것을 알기 때문에
// DB 가 실제로 userId 가 참조하고 있는 사용자를 찾아서 가져올 수 있는 것이다
// 이것이 Prisma 에서 관계를 맺는 방법이다
// user 가 없는 SMSToken 은 없다
// 모든 SMSToken 은 사용자가 필요하다. 이것이 문제점.
// 스튜디오에서 사용자를 삭제한다면 메세지 나오면서 지울 수 없다
// 이건 관계 때문이다
