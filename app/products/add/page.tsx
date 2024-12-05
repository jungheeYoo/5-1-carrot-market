// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-0. Introduction
// // 🔶 React Hook Form 사용하기 이전 사용 방식 사용
// // 🔶 component 와 Zod, Server Actions 만 사용

// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { PhotoIcon } from '@heroicons/react/24/solid';
// import { useState } from 'react';

// // ✨ file 은 스타일이 별로
// // 그래서 label for 속성 사용, React 에서는 htmlFor 라고 함
// // label 에 for photo 라고 되어 있고, 이 input 은 id photo 라고 되어있으니
// // label 을 클릭하는 것은 input 을 클릭하는 것과 동일함
// // 이건 HTML 기본 개념이다
// // HTML 에서 input 에 id 가 있으면, 그 input 을 위한 label 을 만들 수 있다
// // for 가 input 의 id 와 같으면 label 을 클릭할 때마다 input 이 focus 된다

// // ✨ 'use client'; 사용
// // 유저가 업로드하려는 이미지 미리보기 보여주기 1

// export default function AddProduct() {
//   const [preview, setPreview] = useState('');
//   const onImageChange = () => {};
//   return (
//     <div>
//       <form className="p-5 flex flex-col gap-5">
//         <label
//           htmlFor="photo"
//           className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
//         >
//           <PhotoIcon className="w-20" />
//           <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
//         </label>
//         <input
//           onChange={onImageChange}
//           type="file"
//           id="photo"
//           name="photo"
//           accept="image/*"
//           className="hidden"
//         />

//         <Input name="title" required placeholder="제목" type="text" />
//         <Input name="price" type="number" required placeholder="가격" />
//         <Input
//           name="description"
//           type="text"
//           required
//           placeholder="자세한 설명"
//         />
//         <Button text="작성 완료" />
//       </form>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-1. Form Action
// // 🔶 업로드 이미지 미리보기 보여주기 완성

// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { PhotoIcon } from '@heroicons/react/24/solid';
// import { useState } from 'react';
// import { uploadProduct } from './actions';

// // 🔶 기초 복습
// // input에서 type="file" 은 너무 못생겼기 때문에 숨기고 label을 활용
// // input에 onChange={onImageChange} onChange 리스너가 있으면 체인지 될 때마다 React.js가 이 함수를 실행
// // const onImageChange = (여기에) => {체인지 대상}; change event에 관한 정보를 넣어주면 됨
// // input 에 onChange 리스너가 있으면 change 될 때마다 React.js 가 onImageChange 함수를 실행한다
// // () 여기에 Change event 에 관한 정보를 넣어주면 됨
// // 대상도 적어줌. HTMLInputElement 가 change 할 element 이다

// export default function AddProduct() {
//   const [preview, setPreview] = useState('');
//   const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // console.log(event.target.files); // 파일 업로드 하고 콘솔로그 하면 파일 들어가 있음 확인
//     // 🔹 파일 가져오기
//     const {
//       target: { files },
//     } = event;
//     // 🔹 files 가 존재하지 않을 수도 있어 타입 에러남
//     // 만약 files 이 없다면 return
//     if (!files) {
//       return;
//     }
//     // 🔹 file 은 files 의 첫 번째 item 에 있음
//     const file = files[0];

//     // 🔹 file을 가져왔고 이 file을 유저에게 실제로 보여주기
//     // URL.createObjectURL() API 사용
//     // URL을 생성한다. 우리 브라우저에만 존재하고, 다른 사람들은 볼 수 없음
//     // 이 URL은 이 파일이 업로드 된 메모리를 참조한다
//     // 다시 말해, 우리가 여기에 파일을 업로드했고, 브라우저가 이 파일에 엑세스할 수 있다는 뜻임
//     // 우리가 원하는 것은 URL 을 가져오는 것 (화면에 파일을 보여주고 싶으니). 이 파일을 가리키는 URL

//     const url = URL.createObjectURL(file);
//     // 🔹 console.log(url);
//     // blob:http://localhost:3000/5139fb2b-4956-4914-b2df-2ca4caec77f1
//     // 이 URL 은 나만 볼 수 있는 링크
//     // 이 링크는 유저가 방금 업로드한 파일을 우리가 볼 수 있게 해줌
//     // 자바스크립트 는 유저의 컴퓨너에 있는 그 어떤 파일도 절대 그냥 가져올 수 없다
//     // 유저가 어떤 파일을 브라우저와 공유하고 싶은지 선택해야 함
//     // 파일 선택하고 올리는 것이 브라우저와 공유하는 것이다
//     // 파일이 브라우저 메모리 어딘가에 저장된다는 의미
//     // 그래서 파일을 볼 수 있게 그 메모리의 URL 을 달라고 한 것
//     // 이 URL 을 보면 브라우저 메모리의 어딘가를 가리키고 있음
//     // 내 문서에 들어가거나 실제 파일을 읽는 것이 아님 이 파일은 내가 브라우저와 공유하기로 한 파일
//     // 내 문서 어디에 들어가서 실제 파일을 읽는 것은 아님. 브라우저 메모리에 저장해놓음
//     // 이 파일은 내가 브라우저와 공유하기로 선택한 파일
//     // 그래서 파일이 브라우저의 메모리에 업로드 되었고, 페이지를 새로고침할 때까지 그곳에 저장 됨
//     // 그리고 우리는 그 파일이 저장된 메모리의 URL을 알려달라고 하면 되는 것
//     setPreview(url);
//   };
//   return (
//     <div>
//       <form action={uploadProduct} className="p-5 flex flex-col gap-5">
//         <label
//           htmlFor="photo"
//           className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
//           style={{
//             backgroundImage: `url(${preview})`,
//           }}
//         >
//           {/* preview 가 빈 문자열이라면 이걸 보여주고 아니라면 숨김 */}
//           {preview === '' ? (
//             <>
//               <PhotoIcon className="w-20" />
//               <div className="text-neutral-400 text-sm">
//                 사진을 추가해주세요.
//               </div>
//             </>
//           ) : null}
//         </label>
//         <input
//           onChange={onImageChange}
//           type="file"
//           id="photo"
//           name="photo"
//           accept="image/*"
//           className="hidden"
//         />

//         <Input name="title" required placeholder="제목" type="text" />
//         <Input name="price" type="number" required placeholder="가격" />
//         <Input
//           name="description"
//           type="text"
//           required
//           placeholder="자세한 설명"
//         />
//         <Button text="작성 완료" />
//       </form>
//     </div>
//   );
// }

// // 코드 챌린지
// // 1. 유저가 다른 것 말고 이미지를 업로드했는지 확인
// // 2. 이미지 사이즈가 대략 3-4MB 이하인지 확인

// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-2. Product Upload
// // 🔶 Zod 사용 validation
// // 유저가 보내는 정보를 데이터베이스에 실제로 저장해서
// // uploadProduct 함수 완성하기

// 'use client';

// import Button from '@/components/button';
// import Input from '@/components/input';
// import { PhotoIcon } from '@heroicons/react/24/solid';
// import { useState } from 'react';
// import { uploadProduct } from './actions';
// import { useFormState } from 'react-dom';

// export default function AddProduct() {
//   const [preview, setPreview] = useState('');
//   const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // console.log(event.target.files);
//     const {
//       target: { files },
//     } = event;
//     if (!files) {
//       return;
//     }
//     const file = files[0];
//     // file을 유저에게 실제로 보여주기 API
//     // URL.createObjectURL()
//     const url = URL.createObjectURL(file);
//     // console.log(url); // blob:http://localhost:3000/5139fb2b-4956-4914-b2df-2ca4caec77f1
//     setPreview(url);
//   };
//   const [state, action] = useFormState(uploadProduct, null);
//   return (
//     <div>
//       <form action={action} className="p-5 flex flex-col gap-5">
//         <label
//           htmlFor="photo"
//           className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
//           style={{
//             backgroundImage: `url(${preview})`,
//           }}
//         >
//           {preview === '' ? (
//             <>
//               <PhotoIcon className="w-20" />
//               <div className="text-neutral-400 text-sm">
//                 사진을 추가해주세요.
//                 {state?.fieldErrors.photo}
//               </div>
//             </>
//           ) : null}
//         </label>
//         <input
//           onChange={onImageChange}
//           type="file"
//           id="photo"
//           name="photo"
//           accept="image/*"
//           className="hidden"
//         />

//         <Input
//           name="title"
//           required
//           placeholder="제목"
//           type="text"
//           errors={state?.fieldErrors.title}
//         />
//         <Input
//           name="price"
//           type="number"
//           required
//           placeholder="가격"
//           errors={state?.fieldErrors.price}
//         />
//         <Input
//           name="description"
//           type="text"
//           required
//           placeholder="자세한 설명"
//           errors={state?.fieldErrors.description}
//         />
//         <Button text="작성 완료" />
//       </form>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Product Upload
// ✅ 11-8. RHF Refactor

// ✨ 최신 버전의 Next.js 와 server action 을 사용하고 있고,
// 백엔드에서 zod 를 사용해 유효성 검사를 한다면?
// react hook form 은 이제 필수는 아님

// react hook form 과 server action을 함께 사용하는 방법
// server action과 zod를 이용한 validation을 통합하는 방법

// react hook form 은
// zod 를 사용해서 form 을 validation 할 수 있게 해준다
// 이 말은, page 파일에는 어떤 validation 코드도 직접 작성할 필요가 없다
// react hook form 을 그냥 사용하고, react hook form 에 이 zod schema 를 사용해서
// form 을 validation 해달라고 하면 됨
// 이 말은, zod schema 를 프론트와 백엔드 양쪽에 공유할 수 있다는 것이다
// npm install react-hook-form
// npm i @hookform/resolvers :
// 이건 zod schema 를 사용해서 form 을 validation 할 수 있게 해줌

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType, productSchema } from './schema';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // 🔹 zod schema 를 사용한 validation 을 시킴
  // resolver 를 import 함
  // 이렇게 하면 validation 결과를 받을 수 있음
  // 스키마 파일에서 최소값, 최대값 변경하든, 에러 메세지를 추가하든 등등
  // 그것들이 자동으로 프론트의 form 과 백엔드에 반영된다
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        'photo',
        `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${id}`
      );
    }
  };
  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      method: 'post',
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price + '');
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    return uploadProduct(formData);
  });
  const onValid = async () => {
    await onSubmit();
  };
  console.log(register('title'));
  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          required
          placeholder="제목"
          type="text"
          {...register('title')}
          errors={[errors.title?.message ?? '']}
        />
        <Input
          type="number"
          required
          placeholder="가격"
          {...register('price')}
          errors={[errors.price?.message ?? '']}
        />
        <Input
          type="text"
          required
          placeholder="자세한 설명"
          {...register('description')}
          errors={[errors.description?.message ?? '']}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
