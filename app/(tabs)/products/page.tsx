// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-1. Tab Bar
// // 탭바 만들기 위해 폴더 생성 및 그룹핑

// export default function products() {
//   return (
//     <div>
//       <h1 className="text-white text-4xl">Products!</h1>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-2. Skeletons
// // 🔶 products page 작업
// // 먼저 loading State 를 위한 skeleton 을 만들고
// // 데이터베이스를 조회해 상품들을 보여주고 그 다음 무한 스크롤링 만들 예정

// // 그러기 위해서는 products 를 async 함수로 변환함
// // 그리고 getProducts async 함수 만듦
// // 실제로 가진 product 정보를 다루는 것은 나중에..
// // promise 를 함으로스 next.js 는 이 페이지가 기다려야 한다는 것을 알고 있음
// // 이 점을 활용해서 products 밑에 loading.tsx 파일 만듦
// // ✨ loading 파일은 매우 중요
// // next.js 가 products 페이지가 로딩중일 때 loading component 를 사용할 것이기 때문

// async function getProducts() {
//   // resolve : promise 를 종료한다는 의미
//   await new Promise((resolve) => setTimeout(resolve, 10000));
// }

// export default async function products() {
//   const products = await getProducts();
//   return (
//     <div>
//       <h1 className="text-white text-4xl">Products!</h1>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-3. Product Component

// import ListProduct from '@/components/list-product';
// import db from '@/lib/db';

// // 지금은 data caching 안하고 나중에 함
// // Pagination 페이지네이션도 나중에 알아볼 예정
// // 🔶 지금은 DB 에 있는 모든 product 데이터 가져옴

// async function getProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//   });
//   return products;
// }

// export default async function products() {
//   const products = await getProducts(); // 📍 DB 에 있는 product 들이 이곳에 표시 됨
//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         // product 안의 모든 것을 List product 의 prop 으로 보냄
//         <ListProduct key={product.id} {...product} />
//       ))}
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-7. Pagination Action
// ✅ 10-8. Recap

// 🔶 product page 기능 변경
// product page 기능은 오직 product의 첫 번째 page만 가져오는 것
// 왜냐면, 만약에 여러분이 수천캐의 product 를 갖고 있는데
// 그 page 에 database 에 무리가 되도록 모든 product 를 가져올 필요는 없음
// 지금은 첫 번째 page 만 fetch 해오길 원함. 25개나 100개만 가져온다
// 따라서 product page 기능은 처음에 보여줄 상품만 가져온다
// 우리는 상품이 3개뿐이므로, page 의 size 는 1이 됨
// page 당 하나의 product 지금 배우는중이니 이렇게 함

import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // 🔹 1개의 상품만 가져오기
    take: 1,
    // 🔹 내림차순으로 변경
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

// 📍 product-list.tsx 파일에서 씀
// 📍 type 을 export 하고 싶다고 작성
// Prisma 는 이 함수의 결과가 뭔지 말해줌
// 나는 그게 뭔지 모르니 네기 말해줘
// Prisma 를 import 하고 PromiseReturnType 이라고 함
// 그러면 이것은 Prisma 에게 이 함수가 return 할 type 이 무엇인지 알려주는 것과 같다
export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function products() {
  const initialProducts = await getInitialProducts();
  return (
    // ✨ product-list.tsx 파일에서 랜더링 한다
    //     <div className="p-5 flex flex-col gap-5">
    //       {products.map((product) => (
    //         <ListProduct key={product.id} {...product} />
    //       ))}
    //     </div>
    <div>
      {/* ProductList 는 initialProducts 요구 그래서 보내줌 */}
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
