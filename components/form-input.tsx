// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Authentication UI
// // 사용자가 애플리케이션이나 웹사이트에 접근하기 위한 인증 과정을 거칠 때 제공되는 사용자 인터페이스
// // ✅ 4-2. Form Components
// // UI 요소들을 각각 별도의 component로 만들어
// // props로 component를 커스텀 할 수 있도록 함
// // ✨ tailwind 는 기본적으로 components 폴더도 보도록 되어 괜찮다
// // ❌ useState, onChange, event handler 은 필요 없다

// // ❓ props 를 선언할 때 interface 를 쓸 지 type 을 쓸 지?
// // 취향차이 원하는대로 해도 됨. 왜냐하면 이런 경우엔 type 이든, interface 든 똑같은 동작을 한다
// // 타입스크립트 공식 문서를 보면
// // type 의 기능이 필요하기 전까지는 interface 를 사용할 것을 권장하고 있다
// // 그래서 딱히 이유가 없다면 그냥 인터페이스를 사용하면 됨

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors: string[];
//   // error 는 string 배열이 된다
//   // 문자[배열] 여러 개의 error를 가질 수 있기 때문
// }

// // 🔥 외부에서 커스텀 할 수 있는 부분은?
// // input 의 type, placeholder, required, error
// // 이 모든 값들은 모두 props 에서 가져와야 함

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {/* 🔹 에러 배열 모두 보여주기 */}
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 SERVER ACTIONS
// ✅ 5-1. Server Actions

// 🔶 NextJS 의 Server Action 을 사용해 form 처리하는 방법
// ✨ Server action 으로 작업할 때는 input 에는 name 속성이 필요하다

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[]; // 문자[배열] 여러 개의 error를 가질 수 있기 때문
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
