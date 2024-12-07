// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-1. Tab Bar
// // 탭바 만들기 위해 폴더 생성 및 그룹핑

// export default function life() {
//   return (
//     <div>
//       <h1 className="text-white text-4xl">Life!</h1>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Optimistic Updates
// ✅ 14-1. See Posts

import db from '@/lib/db';
import { formatToTimeAgo } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

async function getPosts() {
  // await new Promise((r) => setTimeout(r, 100000));
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        // ⚡ _count 는 이걸 통해 reverse relationship 을 계산할 수 있다
        // 이걸 사용하면 Post 를 가리키는 좋아요와 댓글의 개수를 알 수 있다
        // 이 Post 를 가리키는 comments 와 likes 의 개수를 세어달라고 할 것임
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = {
  title: '동네생활',
};

export default async function Life() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0"
        >
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
              <span>·</span>
              <span>조회 {post.views}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
