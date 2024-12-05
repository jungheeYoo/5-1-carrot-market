// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-1. Tab Bar
// // 탭바 만들기 위해 폴더 생성 및 그룹핑

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   HomeIcon as SolidHomeIcon,
//   NewspaperIcon as SolidNewspaperIcon,
//   ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
//   VideoCameraIcon as SolidVideoCameraIcon,
//   UserIcon as SolidUserIcon,
// } from '@heroicons/react/24/solid';
// import {
//   HomeIcon as OutlineHomeIcon,
//   NewspaperIcon as OutlineNewspaperIcon,
//   ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
//   VideoCameraIcon as OutlineVideoCameraIcon,
//   UserIcon as OutlineUserIcon,
// } from '@heroicons/react/24/outline';

// // 🔶 usePathname 사용
// // usePathname next/navigation 에 있는데 지금 컴포넌트가 interactive 하다는 의미이므로
// // 'use client'; 선언해야 함
// // user 가 /products 에 있다면 solid 버전
// // user 가 /products 에 없다면 ouline 버전
// // solid 와 outlin, 두 icon 은 별도의 폴더에 있다
// // 그리고
// // import { HomeIcon } from '@heroicons/react/24/solid';
// // import { HomeIcon } from '@heroicons/react/24/outline';
// // 이런식으로 사용할 수 없음. HomeIcon 이 중복 됨.
// // icon의 이름이 같기 때문에, 별칭(alias)을 줘야 함

// export default function TabBar() {
//   const pathname = usePathname();
//   return (
//     <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
//       <Link href="/products" className="flex flex-col items-center gap-px">
//         {/* ✨ pathname 이 /products 같으면? SolidHomeIcon 아니면 OutlineHomeIcon */}
//         {pathname === '/products' ? (
//           <SolidHomeIcon className="w-7 h-7" />
//         ) : (
//           <OutlineHomeIcon className="w-7 h-7" />
//         )}
//         <span>홈</span>
//       </Link>
//       <Link href="/life" className="flex flex-col items-center gap-px">
//         {pathname === '/life' ? (
//           <SolidNewspaperIcon className="w-7 h-7" />
//         ) : (
//           <OutlineNewspaperIcon className="w-7 h-7" />
//         )}
//         <span>동네생활</span>
//       </Link>
//       <Link href="/chat" className="flex flex-col items-center gap-px">
//         {pathname === '/chat' ? (
//           <SolidChatIcon className="w-7 h-7" />
//         ) : (
//           <OutlineChatIcon className="w-7 h-7" />
//         )}
//         <span>채팅</span>
//       </Link>
//       <Link href="/live" className="flex flex-col items-center gap-px">
//         {pathname === '/live' ? (
//           <SolidVideoCameraIcon className="w-7 h-7" />
//         ) : (
//           <OutlineVideoCameraIcon className="w-7 h-7" />
//         )}
//         <span>쇼핑</span>
//       </Link>
//       <Link href="/profile" className="flex flex-col items-center gap-px">
//         {pathname === '/profile' ? (
//           <SolidUserIcon className="w-7 h-7" />
//         ) : (
//           <OutlineUserIcon className="w-7 h-7" />
//         )}
//         <span>나의 당근</span>
//       </Link>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-9. Infinite Scrolling
// ✅ 12-1. Intercepting Routes : product => home 으로 바꿈 이 부분만 우선 수정

'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    // 배경색 넣음
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800 ">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === '/home' ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathname === '/life' ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        {pathname === '/chat' ? (
          <SolidChatIcon className="w-7 h-7" />
        ) : (
          <OutlineChatIcon className="w-7 h-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname === '/live' ? (
          <SolidVideoCameraIcon className="w-7 h-7" />
        ) : (
          <OutlineVideoCameraIcon className="w-7 h-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === '/profile' ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
