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

// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-7. Pagination Action
// // ✅ 10-8. Recap

// // 🔶 product page 기능 변경
// // product page 기능은 오직 product의 첫 번째 page만 가져오는 것
// // 왜냐면, 만약에 여러분이 수천캐의 product 를 갖고 있는데
// // 그 page 에 database 에 무리가 되도록 모든 product 를 가져올 필요는 없음
// // 지금은 첫 번째 page 만 fetch 해오길 원함. 25개나 100개만 가져온다
// // 따라서 product page 기능은 처음에 보여줄 상품만 가져온다
// // 우리는 상품이 3개뿐이므로, page 의 size 는 1이 됨
// // page 당 하나의 product 지금 배우는중이니 이렇게 함

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { Prisma } from '@prisma/client';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     // 🔹 1개의 상품만 가져오기
//     take: 1,
//     // 🔹 내림차순으로 변경
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// // 📍 product-list.tsx 파일에서 씀
// // 📍 type 을 export 하고 싶다고 작성
// // Prisma 는 이 함수의 결과가 뭔지 말해줌
// // 나는 그게 뭔지 모르니 네기 말해줘
// // Prisma 를 import 하고 PromiseReturnType 이라고 함
// // 그러면 이것은 Prisma 에게 이 함수가 return 할 type 이 무엇인지 알려주는 것과 같다
// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     // ✨ product-list.tsx 파일에서 랜더링 한다
//     //     <div className="p-5 flex flex-col gap-5">
//     //       {products.map((product) => (
//     //         <ListProduct key={product.id} {...product} />
//     //       ))}
//     //     </div>
//     <div>
//       {/* ProductList 는 initialProducts 요구 그래서 보내줌 */}
//       <ProductList initialProducts={initialProducts} />
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Product Upload
// // ✅ 11-0. Introduction
// // 🔶 제품 업로드 할 페이지로 이동하는 버튼 만들기

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import Link from 'next/link';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     take: 1,
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-0. Introduction
// // metadata, generateMetadata
// // caching 예제를 위해 전체 제품 가져오는걸로 변경

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import Link from 'next/link';

// async function getInitialProducts() {
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     // take: 1,
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export const metadata = {
//   title: 'Home',
// };

// export default async function products() {
//   const initialProducts = await getInitialProducts();
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-1. nextCache

// // ✨
// // 데이터베이스에서 오는 응답을 cache 해주기 위해
// // unstable_cache 함수 사용 => 현재로써는 살짝 불안정한 상태, 앞으로 변경될 수 있다

// // unstable_cache 를 호출하면
// // 함수의 첫 번째 parameter 에는 데이터베이스에 요청할 코드를 작성해줄 것이고, 그 데이터베이스에 온 데이터를 return 해 줄것임
// // 두 번째 parameter 는 keyParts 라고 불림. 이는 cached key 를 식별하는 array 라고 써있음
// // 이것은 cache 되고 있는 데이터의 key 를 식별하기 위해 전역적으로 고유한 값을 갖고 있어야 함
// // 이것이 의미하는 것은 여러분의 데이터를 cache 에 넣어줄 때(cache 를 거대한 object 라고 상상하면 됨) 이름을 줘야 함. NextJS 가 필요할 때 가서 데이터를 가져올 수 있도록
// // 따라서 cache 에는 이 함수에서 return 되는 것이 무엇이든 이 이름으로 저장 됨
// // 예를 들어 'my-app-user' 가 될거고, cache 안에 있는 'my-app-user' 는 이 함수에서 return  하는 거랑 같은 값이 되는 것이다

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache } from 'next/cache'; // 닉네임 지정해줌
// import Link from 'next/link';

// // 🔹 첫 번째 argument : 비용이 많이드는 계산이나 데이터베이스 query 를 가동시키는 함수
// // 🔹 첫 번째 argument : argument 의 keyParts, getInitialProducts 함수가 return 하는 데이터를 cahe 안에서 식병할 수 있게 해줌
// // 이런 경우에 문서를 보면 id 를 받는 함수를 만들어주고 있다. 이건 오직 그들이 user 의 id 를 보내야하기 때문에 해주는 것. 우리의 경우 그 어떤 제품의 id 도 필요하지 않음.
// // getInitialProducts 가 id 를 필요치 않기 때문이다
// const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

// // ❗ 더 이상 getInitialProducts 를 컴포넌트에서 사용하지 않음 getCachedProducts 를 사용할 것임
// // ⚡ 그럼 무슨일이 일어나냐면
// // getCachedProducts 는 일단 NextJS cahe 로 가서 key 에 대한 데이터를 찾음. 처음에는 찾을 수 없음.
// // 그러면 getInitialProducts 함수를 실행
// // 이 함수는 데이터베이스에 접근할거고, 다수의 제품들을 return 함
// // 그런 다음에 NextJS cache 가 우리에게 getCachedProducts 있는 모든 제품을 줌
// // 이 함수가 두 번째로 실행될 때는
// // NextJS cache 는 cache 로 가서 home-products 를 찾아봄. 그리고 cache 된 데이터를 그곳에서 찾음
// // 따라서 이 함수(getInitialProducts) 를 더이상 호출하지 않을거고 대신에 이미 cahe에 있는 데이터를 줌
// // 이제 이 데이터가 실제로 cache 되고 있는지 확인하기 위해서 prisma studio 를 열어서 데이터를 하나 수정해보고 페이지를 새로고침하면 수정된 사항이 반영 안됨. 이전 버전 보임.
// // 왜냐면 이전 버전 데이터가 cache 되어 메모리 안에 있기 때문. 데이터베이스는 사용되고 있지 않음

// async function getInitialProducts() {
//   console.log('hit!!!!');
//   const products = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,
//       photo: true,
//       id: true,
//     },
//     orderBy: {
//       created_at: 'desc',
//     },
//   });
//   return products;
// }

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitialProducts
// >;

// export const metadata = {
//   title: 'Home',
// };

// export default async function Products() {
//   const initialProducts = await getCachedProducts(); // 🔹 getInitialProducts 에서 변경
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

// // ✨ 정리
// // 첫 번째 parameter 로 데이터베이스와 대화할 수 있는 함수를 넣어줌
// // 두 번째 cache 이름을 적어줌
// // 처음으로 이 nextCache 함수가 실행될 때는 cache 에 이러한 'home-products' 데이터가 전혀 없다
// // 그러므로 이 getInitialProducts 함수가 실행될거고 NextJS 는 이 getInitialProducts 함수의 response 를 저장해줌
// // NextJS 는 이 함수가 return 하는 것이 뭐든 저장해줌
// // 매우 중요한 점은 함수가 반드시 무언가를 return 해줘야 함
// // NextJS 는 이 getInitialProducts 함수가 return 하는 것을 저장하고
// // 'home-products' 이 이름으로 cache 에 넣어줌
// // 그래서 두 번째로 페이지를 새로고침 할 때는 NextJS 는 home-products 에 데이터가 있다는 것을 찾게 될거라서 getInitialProducts 이 함수는 더이상 사용하지 않을거고, 이 데이터베이스는 호출되지 않음

//////////////////////////////////////////////////
// ✅ 2024 Caching
// ✅ 13-2. revalidate
// 첫 번째 옵션
// (갱신)- 만료 기간에 따라 데이터를 새로고침
// nextCache 함수의 세 번째 argument 에 object 로 보내줌
// 원하면 revalidate 과 tags 를 보내줄 수 있다

// 🔶 데이터를 어떻게 갱신하는지? 데이터를 어떻게 다시 새로 고침해주는지
// nextCache 의 요점은 데이터가 변경되지 않았을시에는 데이터베이스에 접근하지 않음.
// 하지만 새로운 데이터가 있다면 cache 를 새로고침 할 방법 찾아야 함
// 따라서 user 가 최신 데이터를 볼 수 있을뿐만 아니라, 새로운 데이터가 없을 땐 user 가
// 데이터베이스에 접근하지 않아도 되도록
// cache 안에 있는 데이터를 새로고침 하는 방법엔 세 가지 옵션이 있다

import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';

// ✨ revalidate : 함수가 처음으로 호출되는 순간 작동해 user 가 페이지를 다시 요청하는데 60초가 지나지 않았다면 nextCache 는 cache 안에 있는 데이터를 return  함
// 만약 user 가 페이지를 다시 요청하는데  60초가 지난 상태면 cache 안에 있는 데이터는 너무 오래됐다, 최신이 아니다라고 간주함
// 그래서 NextJS 는 최신 정보를 불러오기 위해 getInitialProducts 를 다시 호출하고 60초는 다시 작동함. 60초 마다가 아님. 60초가 지난 후 새로운 요청이 있다면 그때 NextJS 가 이 함수를 다시 호출할거라는 말이다.
const getCachedProducts = nextCache(getInitialProducts, ['home-products'], {
  revalidate: 60,
});

async function getInitialProducts() {
  console.log('hit!!!!');
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: 'Home',
};

export default async function Products() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
