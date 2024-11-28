// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-0.Home Screen

// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen p-6">
//       <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
//         <span className="text-9xl">🥕</span>
//         <h1 className="text-4xl ">당근</h1>
//         <h2 className="text-2xl">당근 마겟에 어서오세요!</h2>
//       </div>
//       <div className="flex flex-col items-center gap-3 w-full">
//         <Link
//           href="/create-account"
//           className="w-full bg-orange-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors"
//         >
//           시작하기
//         </Link>
//         <div className="flex gap-2">
//           <span>이미 계정이 있나요?</span>
//           <Link href="/login" className="hover:underline">
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Prisma
// // ✅ 7-2. Prisma Client
// // 🔶 만들어진 Client 사용 방법

// import Link from 'next/link';
// // import '@/lib/db';
// // ✨ DB 불러옴
// // DB 파일을 이런식으로 불러오면 새로고침할 때, 최소 한 번 실행되도록 할 수 있다
// // 이제 새로고침 하면 방금 DB 에서 생성한 사용자를 콘솔에서 JS 로 확인할 수 있다
// // id 는 자동으로 부여가 됨
// // created_at, updated_at 역시 자동으로 생성 됨
// // 나머지는 보내지 않아서 null

// // {
// //   id: 1,
// //   username: 'test',
// //   email: null,
// //   password: null,
// //   phone: null,
// //   github_id: null,
// //   avatar: null,
// //   created_at: 2024-11-28T10:41:50.387Z,
// //   updated_at: 2024-11-28T10:41:50.387Z
// // }

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen p-6">
//       <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
//         <span className="text-9xl">🥕</span>
//         <h1 className="text-4xl">당근</h1>
//         <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
//       </div>
//       <div className="flex flex-col items-center gap-3 w-full">
//         <Link href="/create-account" className="primary-btn text-lg py-2.5 ">
//           시작하기
//         </Link>
//         <div className="flex gap-2">
//           <span>이미 계정이 있나요?</span>
//           <Link href="/login" className="hover:underline">
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Prisma
// ✅ 7-4. Relationships
// 🔶 SMSToken 모델 만들기
// 이 모델은 User 모델과 연결 됨. 그리고 SMS 인증을 위해서 사용할 것임

import Link from 'next/link';
import '@/lib/db';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn text-lg py-2.5 ">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
