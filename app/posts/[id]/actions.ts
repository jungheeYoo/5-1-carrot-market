//////////////////////////////////////////////////
// ✅ 2024 Optimistic Updates
// ✅ 14-4. useOptimistic

'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';

// ✨ postId 를 받음. 이전에는 URL 에서 id 를 갖고 왔고 함수가 거기에 있었으니 이게 필요 없었음. 이제 actions 에서는 argument 로 받아야 함
export async function likePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}
