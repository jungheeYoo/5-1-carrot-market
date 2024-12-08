// //////////////////////////////////////////////////
// // ✅ 2024 Optimistic Updates
// // ✅ 14-2. Likes and Dislikes
// // 게시물 상세 페이지 UI 구현

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToTimeAgo } from '@/lib/utils';
// import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
// import { revalidatePath } from 'next/cache';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// // 게시물 조회수 추적

// // 이 함수는 getProduct 함수와 거의 비슷
// // 이 함수가 호출될 때마다 조회수를 증가시키는 작업 방법은?
// // 두 가지 방법이 있음
// // 📍 두 번째는 findUnique 대신에 update 를 사용
// // ⚡ update
// // 이 메소드는 database 안의 record 를 수정하고 나서, 수정된 record 를 return 해줌
// // post 를 update 해서 조회수를 올리고, update method 가 그 post 를 return 해줄 것임
// // update 에는 필요한 것이 세 가지 있음
// // where : 업데이트할 record 가 무엇인지를 나타냄
// // data : 어떻게 업데이트 할지 나타내는 data 필요
// // 한 가지 주의할 점은, update method 는 업데이트할 post 를 찾지 못하면 에러를 발생시킴
// // 따라서 유저가 존재하지 않는 잘못된 id 를 보내면 해당 post 가 존재하지 않기 때문에 update 되지 ㅇ낳고 에러가 발생함
// // 그것 때문에 전체가 터지는 것을 방지하기 위해서 try... catch 함
// async function getPost(id: number) {
//   try {
//     const post = await db.post.update({
//       // 여기서 오는 id 를 가진 post 를 updatae 함
//       // post 의 id 가 여기 argument 의 id 와 같은 것을 찾음. id: id
//       where: {
//         id,
//       },
//       // data 는 조회수이다
//       // 근데 현재 조회수가 몇인지 모름
//       // 이 값을 모르기 때문에, 이걸 위한 atomic operation 이 있다
//       // views 의 현재 값을 모르더라도 더하기, 나누기, 빼기, 곱하기 등을 할 수 있다
//       data: {
//         views: {
//           increment: 1, // views 를 1씩 증가시킴
//         },
//       },
//       // 이 post 를 업로드한 user 를 include 함
//       include: {
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//             likes: true,
//           },
//         },
//       },
//     });
//     // 📍 첫 번째 방법
//     // post 를 받아왔으니 post 가 존재하면 db.post.update 를 trigger 할 수 있음
//     // 두 개의 database query 가 필요함
//     // if(post) {
//     //   await db.post.update({

//     //   })
//     // }
//     return post;
//   } catch (e) {
//     return null;
//   }
// }

// // 🔷 isLiked 얻는 방법
// // URL 에서 오는 post 의 id 를 받음
// async function getIsLiked(postId: number) {
//   // 현재 로그인한 유저가 생성한 like 를 찾음
//   const session = await getSession();
//   // 이 유저가 이 postId 에 대해 이미 like 를 생성했는지 알아봄
//   const like = await db.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId: session.id!,
//       },
//     },
//   });
//   // 따라서 이 like 가 존재한다면 true 를 리턴할 거고, 이건 이 post 가 이미 like 되었다는 뜻
//   return Boolean(like);
// }

// export default async function PostDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   // 🔷 post 찾기
//   const post = await getPost(id);
//   if (!post) {
//     return notFound();
//   }
//   // 👌 우리가 받은 post 를 console.log 해서 조회수가 올라가는지 확인
//   console.log(post);

//   // 🔷  server action 2개 만들기 (나중에 옮길 예정)
//   // 🔷 likePost
//   // dislikePost 처럼 하면 됨
//   // 하지만 여기서 에러가 발생할 수 있다. 유저가 좋아요를 두 번 연속으로 누를 수도 있다
//   // 그럼 create 에서 에러가 발생한다
//   // 일단 likePost action 을 form action 에 넣어줌
//   // 무슨 오류냐면 나는 이미 로그인 되어 있고 이 게시물에 좋아요를 누르려고 함
//   // 하지만 이 post 는 내가 만든 것이다. like 도 내가 만들었고, 이 post 를 like 했다
//   // 그러니까 나는 같은 게시물에 좋아요를 두 번 누르려고 시도한 것. 그래서 에러 발생
//   // 그래서 에러 잡음. try...catch
//   const likePost = async () => {
//     'use server';
//     const session = await getSession();
//     try {
//       await db.like.create({
//         data: {
//           postId: id,
//           userId: session.id!,
//         },
//       });
//       // 새로고침해야 확인가능한 것을 바꿔줌. 나쁜 해결책
//       // revalidatePath 를 사용하면 URL 전체를 revalidate 할 수 있음
//       // liek 를 추가하거나 삭제한 후 이 URL 을 revalidate 할 수 있다
//       // 이 id 는 URL 에서 오고 숫자로 변환된다
//       // 하지만 문제 있음. 이 경로로 revalidate 하니 조회수가 계속 늘어남
//       // revalidate 할 때마다 Next.js 가 getPost 함수도 호출하기 때문
//       // revalidate 할 때마다 이 페이지 전체가 다시 빌드 된다
//       revalidatePath(`/post/${id}`);
//     } catch (e) {}
//   };
//   // 🔷 dislikePost
//   // 여기 getPost(id) 이 URL 에 있는 id 를 가진 특정 post 에 한해서
//   // 현재 로그인한 유저가 만든 like 를 삭제하기만 하면 됨
//   // 현재 로그인한 유저가 이 post 에 누른 like 를 삭제하면 됨
//   const dislikePost = async () => {
//     'use server';
//     try {
//       const session = await getSession(); // 이렇게 하면 userId 가져올 수 있음
//       await db.like.delete({
//         where: {
//           // ✨ composite id key 가 필요함!
//           // id 에는 postId 와 userId 가 있음
//           id: {
//             postId: id, // URL 에 있는 id 넣음
//             userId: session.id!, // 느낌표를 붙임. 타입스크립트는 session 에 id 가 없을 수도 있다고 생각함. 맞는 얘기임. 하지만 로그인하지 않은 유저는 아예 이 페이지를 들어올 수 있다. 그러니 이렇게 '!' 붙이면 됨
//           },
//         },
//       });
//       revalidatePath(`/post/${id}`);
//     } catch (e) {}
//   };

//   // URL 에서 오는 id 를 넣어줌
//   // isLiked 현재 로그인한 유저가 이 post 에 대해 생성한 like 가 database 에 존재하는지 알려 줌
//   const isLiked = await getIsLiked(id);
//   return (
//     <div className="p-5 text-white">
//       <div className="flex items-center gap-2 mb-2">
//         <Image
//           width={28}
//           height={28}
//           className="size-7 rounded-full"
//           src={post.user.avatar!}
//           alt={post.user.username}
//         />
//         <div>
//           <span className="text-sm font-semibold">{post.user.username}</span>
//           <div className="text-xs">
//             <span>{formatToTimeAgo(post.created_at.toString())}</span>
//           </div>
//         </div>
//       </div>
//       <h2 className="text-lg font-semibold">{post.title}</h2>
//       <p className="mb-5">{post.description}</p>
//       <div className="flex flex-col gap-5 items-start">
//         <div className="flex items-center gap-2 text-neutral-400 text-sm">
//           <EyeIcon className="size-5" />
//           <span>조회 {post.views}</span>
//         </div>
//         {/* 일단 likePost action 을 form action 에 넣어줌 */}
//         {/* post 를 like 한 상태이면 dislikePost 를 실행하고 */}
//         {/* 아직 like 하지 않았다면 likePost action 을 실행해야 함 */}
//         <form action={isLiked ? dislikePost : likePost}>
//           {/* 이 버튼을 클릭하면 action 이 trigger 됨 */}
//           <button
//             className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors`}
//           >
//             <HandThumbUpIcon className="size-5" />
//             <span>공감하기 ({post._count.likes})</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Optimistic Updates
// ✅ 14-3. Cache Tags

// 🚨 문제점
// 클릭할 때마다 경로를 revalidate 하기 때문에 페이지 전체가 재실행 됨
// 따라서 조회수가 또 올라감
// 🔨 해결 방법
// 버튼에 필요한 정보인 isLiked 와 like 개수만 별도의 cache 로 분리함
// 그리고 나머지 모든 정보를 다른 cache 로 분리함
// post cache 하고, like 개수와 isLiked 여부도 cache 함
// 그래서 필요한 데이터 분리
// 이 버튼에 필요한 데이터는 post 의 like 여부와 like 의 개수
// 그리고 이 게시물을 작성한 유저의 아바타, 게시물의 제목, 조회수, 상세설명 등 나머지는 cache 의 다른 곳으로 분리

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { EyeIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            // 🧹 likes count 이건 다른 데서 쓸거니 지워줌.
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

// ✨ getPost cache
const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60, // 이렇게 하면 cache 를 revalidate 하지 않더라도, 이 시간마다 자동으로 revalidate 됨. 그래서 조회수가 실시간처럼 보일 것임. 완전 실시간은 아니지만.
});

// 😫 getSession 과 관련해서 에러가 발생해서 고침
// getSession 과 nextCache 를 같이 쓰면 안된다고 함! (노마드 코드 강의 댓글)
async function getLikeStatus(postId: number, userId: number) {
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

// ✨ getLikeStatus cache
// params: { id: string }; 이 URL 에 들어있는 이 id 를 어떻게 tag 에 전달할까?
// nextCache 를 호출하는 이 부분을, 이 id 를 받는 함수 안에 넣어주면 된다
// 보다시피 postId 를 받게 되었으니 이걸 tag 에 넣을 수 있다
async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

// 🔹 두 가지를 계산함
// post 가 이미 like 되었는지 알려줌
// like 개수도 세서 알려줌
// async function getLikeStatus(postId: number) {
//   const session = await getSession();
//   const isLiked = await db.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId: session.id!,
//       },
//     },
//   });
//   // 이 postId 에 대해 생성 된 like 개수를 셀 수 있음
//   // 이게 URL 에서 얻은 id 를 가진 post 에 대해 생성된 like 개수를 알려줌
//   const likeCount = await db.like.count({
//     where: {
//       postId,
//     },
//   });
//   return {
//     likeCount,
//     isLiked: Boolean(isLiked),
//   };
// }

// // ✨ getLikeStatus cache
// function getCachedLikeStatus(postId: number) {
//   const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
//     tags: [`like-status-${postId}`],
//   });
//   return cachedOperation(postId);
// }

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }
  const likePost = async () => {
    'use server';
    await new Promise((r) => setTimeout(r, 5000)); // 5초 시간 줌
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });
      // ✨ 더이상 revalidatePath 사용하지 않음
      // catch 된 데이터를 revalidate 하는 방법은 revalidateTag 사용
      // 우선 like-status-(post id) 인 tag 만 revalidate 하도록 함. 다시 고칠 예정
      // post id 는 여기 URL 에서 가져온 1이 된다
      // ✨ URL 에서 온 id 를 가진 post 의 like status 만 revalidate 함
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const dislikePost = async () => {
    'use server';
    try {
      const session = await getSession();
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });
      // ✨ URL 에서 온 id 를 가진 post 의 like status 만 revalidate 함
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  // getCachedLikeStatus 는 likeCount 와 isLiked 알려줌
  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
              isLiked
                ? 'bg-orange-500 text-white border-orange-500'
                : 'hover:bg-neutral-800'
            }`}
          >
            {isLiked ? (
              <HandThumbUpIcon className="size-5" />
            ) : (
              <OutlineHandThumbUpIcon className="size-5" />
            )}
            {isLiked ? (
              <span> {likeCount}</span>
            ) : (
              <span>공감하기 ({likeCount})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
