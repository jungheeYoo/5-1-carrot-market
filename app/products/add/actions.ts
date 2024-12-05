// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-1. Form Action

// 'use server';

// export async function uploadProduct(formData: FormData) {
//   const data = {
//     photo: formData.get('photo'),
//     title: formData.get('title'),
//     price: formData.get('price'),
//     description: formData.get('description'),
//   };
//   console.log(data);
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-2. Product Upload
// // 🔶 Zod 사용 validation
// // 유저가 보내는 정보를 데이터베이스에 실제로 저장해서
// // uploadProduct 함수 완성하기

// 'use server';

// import { z } from 'zod';
// import fs from 'fs/promises';
// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { redirect } from 'next/navigation';

// const productSchema = z.object({
//   photo: z.string({
//     required_error: 'Photo is required',
//   }),
//   title: z.string({
//     required_error: 'Title is required',
//   }),
//   description: z.string({
//     required_error: 'Description is required',
//   }),
//   // 🔹 formData 로 받는 것들은 number input 에 입력한 숫자 조차도 전부 string 으로 변한다
//   // 그래서 coerce 해줌. 그럼 number 로 변환 됨
//   price: z.coerce.number({
//     required_error: 'Price is required',
//   }),
// });

// export async function uploadProduct(_: any, formData: FormData) {
//   const data = {
//     photo: formData.get('photo'),
//     title: formData.get('title'),
//     price: formData.get('price'),
//     description: formData.get('description'),
//   };
//   // 🔹 photo 가 file 형태인지 확인
//   if (data.photo instanceof File) {
//     // 파일 데이터 가져오기
//     // 사진 데이터를 array buffer 형태로 제공해줌
//     const photoData = await data.photo.arrayBuffer(); // 노드버전 20이상 필요
//     // console.log(photoData);

//     await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
//     data.photo = `/${data.photo.name}`;
//   }
//   // 🚨 에러남 왜냐면. photo 는 실제 파일이기 때문
//   // 데이터베이스에는 실제 파일을 저장하지 않음. URL 만 저장함.
//   // 그래서 submit 버튼 누르면, validation 이 실패함.
//   // Zod 에 photo 가 string 이라고 했는데 실제로는 파일을 받음
//   // 그래서 우선 임시방편으로 이 파일을 public 폴더에 복사함
//   const result = productSchema.safeParse(data);
//   // console.log(data);
//   if (!result.success) {
//     return result.error.flatten();
//   } else {
//     const session = await getSession();
//     if (session.id) {
//       const product = await db.product.create({
//         data: {
//           title: result.data.title,
//           description: result.data.description,
//           price: result.data.price,
//           photo: result.data.photo,
//           user: {
//             connect: {
//               id: session.id,
//             },
//           },
//         },
//         select: {
//           id: true,
//         },
//       });
//       redirect(`/products/${product.id}`);
//       //redirect("/products")
//     }
//   }
// }

//////////////////////////////////////////////////
// ✅ 2024 Product Upload
// ✅ 11-8. RHF Refactor

// react hook form 과 server action을 함께 사용하는 방법
// server action과 zod를 이용한 validation을 통합하는 방법

'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { productSchema } from './schema';

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
      //redirect("/products")
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
