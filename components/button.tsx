// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-2. Form Components
// // UI 요소들을 각각 별도의 component로 만들어
// // props로 component를 커스텀 할 수 있도록 함

// import { useFormStatus } from 'react-dom';

// interface FormButtonProps {
//   loading: boolean;
//   text: string;
// }

// // 🔥 외부에서 커스텀 할 수 있는 부분은?
// // button 의 text, loading
// // 이 모든 값들은 모두 props 에서 가져와야 함

// export default function FormButton({ loading, text }: FormButtonProps) {
//   return (
//     <button
//       disabled={loading}
//       className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
//     >
//       {loading ? '로딩 중' : text}
//     </button>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-2. useFormStatus
// // Server Action 경과와 UI가 서로 소통하는 방법

// // loading: boolean; 은 필요 없다
// // 이제는 hook이 form의 로딩 상태를 알려줌

// 'use client';

// import { useFormStatus } from 'react-dom';

// interface FormButtonProps {
//   text: string;
// }

// export default function FormButton({ text }: FormButtonProps) {
//   // 🔶 useFormStatus
//   // 이 hook 은 form 의 자식 요소에서 사용해야 함
//   // form 과 같은 곳에서 사용할 수 없다
//   // 이 hook 은 form 의 내부에서 호출되고 사용되어야 함
//   // 이 경우에는 FormButton 이 form 내부에서 렌더링될 것임
//   // 그리고 이 component 를 interactive 하게 만들었기 때문에 use client 선언해야 함
//   const { pending } = useFormStatus();
//   return (
//     // 🔹 이 버튼은 form이 pending 상태라면 비활성화 됨
//     <button
//       disabled={pending}
//       className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
//     >
//       {pending ? '로딩 중' : text}
//     </button>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-4. Refactor
// FormButton 의 이름을 Button 으로 변경

'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  // useFormStatus
  const { pending } = useFormStatus();
  return (
    // 이 버튼은 form이 pending 상태라면 비활성화 됨
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? '로딩 중' : text}
    </button>
  );
}
