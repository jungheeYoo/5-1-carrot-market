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

// //////////////////////////////////////////////////
// // ✅ 2024 SERVER ACTIONS
// // ✅ 5-1. Server Actions

// // 🔶 NextJS 의 Server Action 을 사용해 form 처리하는 방법
// // ✨ Server action 으로 작업할 때는 input 에는 name 속성이 필요하다

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors: string[]; // 문자[배열] 여러 개의 error를 가질 수 있기 때문
//   name: string;
// }

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors,
//   name,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         name={name}
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-0. Introduction to Zod

// // 🔶 zod 유효성 검사 라이브러리 사용
// // errors를 이렇게 수정하면 create acount page에서 FormInput에 errors를 꼭 넣을 필요 없음

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   required: boolean;
//   errors?: string[]; // errors는 있을 수도 있고, 없을 수도 있다고 수정
//   name: string;
// }

// export default function FormInput({
//   type,
//   placeholder,
//   required,
//   errors = [], // 그리고 기본 값 준다
//   name,
// }: FormInputProps) {
//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         name={name}
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         type={type}
//         placeholder={placeholder}
//         required={required}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-4. Refactor
// // FormInput 리팩토링
// // Input 컴포넌트를 더 확장성 있고 커스텀 가능하게 만들기 위해서
// // FormInput 의 이름을 Input 으로 변경

// // 🔶 input HTML element 가 가진 모든 속성을 FormInput 에 props 로 넘겨주고 싶다
// // 예를 들면, input HTML element 가 number 를 받을 땐 min 이나 max 를 설정할 수 있다등..
// // input 은 여러 가지 props 를 받을 수 있다
// // 하지만 모든 props 를 타입스크립트 인터페이스에 넣을 순 없으니까
// // 타입스크립트에게 FormInput 이 여기 있는 props 뿐만 아니라
// // input 이 받을 수 있는 모든 attributes 도 props 로 받을 수 있다고 알려줄 것임

// // FormInput 은 FormInputProps 를 props 로 받는데
// // 거기에 추가로 & 로 적고 InputHTMLAttributes 라고 적음
// // HTMLInputElement 의 모든 attributes
// // <HTMLInputElement> 이건 타입스크립트의 제네릭이다
// // 여기서 한 것은, FormInput 컴포넌트는 type, placeholder...이것들을 props로 받는데
// // 그것뿐만 아니라 input이 받을 수 있는 모든 attributes 또한 받을 수 있다고 하는 것이다
// // 이렇게 하면 인터페이스에서 type, placeholder, required 지울 수 있음
// // 왜냐면 지운 것들은 전부 input 이 받는 attribute 에 있는 것들이기 때문
// // 얘네들을 InputHTMLAttributes<HTMLInputElement> 선언했으니 지워도 됨
// // 그러니 FormInputProps 에는 적을 필요가 없다
// // 필요 없는 것들은 지우고, errors와 name을 제외하고 모든 props 갖고 오기
// // name 은 남겨둔다 왜냐면, 타입 에러가 남

// import { InputHTMLAttributes } from 'react';

// interface InputProps {
//   errors?: string[]; // errors는 있을 수도 있고, 없을 수도 있다
//   name: string; // 이것도 html에 있지만 남겨둠 input에 name 지정 잊으면 안됨
// }

// // 🔹 errors와 name을 제외하고 모든 props 갖고 오기
// // rest 라는 변수 하나에 모든 props 담는다

// export default function Input({
//   name,
//   errors = [], // 기본 값 주기
//   ...rest
// }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
//   console.log(rest);

//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         name={name}
//         className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
//         // 🔹 나머지 props 를 input 에 전달
//         {...rest}
//       />
//       {errors.map((error, index) => (
//         <span key={index} className="text-red-500 font-medium">
//           {error}
//         </span>
//       ))}
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Product Upload
// ✅ 11-9. Recap

import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  {
    name,
    errors = [],
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
