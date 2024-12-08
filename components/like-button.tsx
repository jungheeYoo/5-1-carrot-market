//////////////////////////////////////////////////
// ✅ 2024 Optimistic Updates
// ✅ 14-4. useOptimistic

'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import { dislikePost, likePost } from '@/app/posts/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  // ✨ useOptimistic 사용
  // 이 hook 은 두 개의 parameter 를 받음
  // 첫 번째 : mutation 이 발생하기 전에 유저에게 보여주고 시은 데이터
  // 그럼 유저에게 보여줘야 할 initial data 는 무엇일까?
  // 그건 서버에서 보낸 데이터이다. props 로 받고 있는 isLiked 와 likeCount
  // 그래서 이 오브젝트를 복사 { isLiked, likeCount }
  // 숫자만 카운팅한다면 숫자를 넣어도 되고, true or false 등 아무거나 가능
  // 이게 initial data 이다. 이것이 action 이 실행되기 전에 유저가 봐야 하는 데이터이다. mutation 이 시작되기 전에
  // 두 번째 : reducer 라는 함수
  // 이 함수가 하는 일은 기본적으로 이 isLiked, likeCount 데이터를 수정하는 것임. 이게 끝.
  // 이 데이터를 어떻게 수정할까?
  // reducer 는 두 개의 parameter 와 함께 호출되는 함수이다.
  // 첫 번째 파라미터는 state, previousState 또는 currentState 라고 하면 됨
  // 두 번째 파라미터는 action payload 이다.
  // reducer 함수는 반드시 새로운 state 를 return 해야 함
  // { isLiked, likeCount } 이게 initial state 고, 타입스크립트는 알고 있다
  // 이 함수가 이런 형태의 state 를 return  해야 한다는 것을
  // 값은 다를 수 있지만 모양은 이렇게 생겨야 함
  // useOptimistic 은 useState 와 아주 비슷하다
  // return 하는 배열의 첫 번째 항목은 state 이고, 최초 렌더링 시 여기로 전달될 것임
  // 그리고 이 state 를 수정하는 함수가 있다.
  // 그 다음 항목은 바로 여기에 작성한 reducer 함수이다
  // (previousState, payload) => ({
  //   isLiked: !previousState.isLiked,
  //   likeCount: previousState.isLiked
  //     ? previousState.likeCount - 1
  //     : previousState.likeCount + 1,
  // })
  // 이 전체가 여기로 reducerFn 올 것임
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      // 여기서 서버가 실제로 생성할 데이터를 리턴
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  // ✨ 이제 이 버튼이 server action 을 호출할 수 있게 onClick handler 를 달아줌
  const onClick = async () => {
    // 아래가 시작되기도 전에 reducer 함수 호출
    // reducer 함수에는 action 이라는 argument 가 필요함
    // 여기서 reducer 함수에 값을 전달할 수 있다
    // reducer 함수는 previousState, payload 와 함께 호출 됨
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
        // ✨ UI 를 이 state 에 연결해야 함
        // UI 에서 props { isLiked, likeCount } 대신이 이 state 를 사용하면 됨
        state.isLiked
          ? 'bg-orange-500 text-white border-orange-500'
          : 'hover:bg-neutral-800'
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>공감하기 ({state.likeCount})</span>
      )}
    </button>
  );
}
