//////////////////////////////////////////////////
// ✅ 2024 Product Upload
// ✅ 11-8. RHF Refactor

// ✨ 프론트엔드에서도 쓰고 싶으니 schema.ts 별도의 파일로 옮김

import { z } from 'zod';

export const productSchema = z.object({
  photo: z.string({
    required_error: 'Photo is required',
  }),
  title: z.string({
    required_error: 'Title is required!!!!!',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  price: z.coerce.number({
    required_error: 'Price is required',
  }),
});

// z.infer 는 schema 로부터 타입스크립트에서 쓸 수 있는 type 을 가져올 수 있게 해줌
// 이렇게 하고 ProductType 에 마우스를 올려보면 나의 schema 에 대한 타입스크립트 설명을 볼 수 있음
export type ProductType = z.infer<typeof productSchema>;
