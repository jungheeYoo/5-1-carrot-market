//////////////////////////////////////////////////
// ✅ 2024 UPDATE Authentication UI
// 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// ✅ 4-2. Form Components
// UI 요소들을 각각 별도의 component로 만들어
// props로 component를 커스텀 할 수 있도록 함

import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  loading: boolean;
  text: string;
}

// 🔥 외부에서 커스텀 할 수 있는 부분은?
// button 의 text, loading
// 이 모든 값들은 모두 props 에서 가져와야 함

export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {loading ? '로딩 중' : text}
    </button>
  );
}
