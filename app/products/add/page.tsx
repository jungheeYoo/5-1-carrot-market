//////////////////////////////////////////////////
// ✅ 2024 Product Upload
// ✅ 11-0. Introduction
// 🔶 React Hook Form 사용하기 이전 사용 방식 사용
// 🔶 component 와 Zod, Server Actions 만 사용

'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

// ✨ file 은 스타일이 별로
// 그래서 label for 속성 사용, React 에서는 htmlFor 라고 함
// label 에 for photo 라고 되어 있고, 이 input 은 id photo 라고 되어있으니
// label 을 클릭하는 것은 input 을 클릭하는 것과 동일함
// 이건 HTML 기본 개념이다
// HTML 에서 input 에 id 가 있으면, 그 input 을 위한 label 을 만들 수 있다
// for 가 input 의 id 와 같으면 label 을 클릭할 때마다 input 이 focus 된다

// ✨ 'use client'; 사용
// 유저가 업로드하려는 이미지 미리보기 보여주기 1

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const onImageChange = () => {};
  return (
    <div>
      <form className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
        >
          <PhotoIcon className="w-20" />
          <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />

        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" type="number" required placeholder="가격" />
        <Input
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
