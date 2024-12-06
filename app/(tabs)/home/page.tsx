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

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-2. revalidate
// // 🔶 첫 번째 옵션
// // 🔶 revalidate(갱신)- 만료 기간에 따라 데이터를 새로고침 방법
// // 시간이 지나면 cache 안에 있는 데이터는 만료 됨
// // nextCache 함수의 세 번째 argument 에 object 로 보내줌
// // 원하면 revalidate 과 tags 를 보내줄 수 있다

// // ❓ 데이터를 어떻게 갱신하는지? 데이터를 어떻게 다시 새로 고침해주는지
// // nextCache 의 요점은 데이터가 변경되지 않았을시에는 데이터베이스에 접근하지 않음.
// // 하지만 새로운 데이터가 있다면 cache 를 새로고침 할 방법 찾아야 함
// // 따라서 user 가 최신 데이터를 볼 수 있을뿐만 아니라, 새로운 데이터가 없을 땐 user 가
// // 데이터베이스에 접근하지 않아도 되도록
// // cache 안에 있는 데이터를 새로고침 하는 방법엔 세 가지 옵션이 있다

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache } from 'next/cache';
// import Link from 'next/link';

// // ✨ revalidate : 함수가 처음으로 호출되는 순간 작동해 user 가 페이지를 다시 요청하는데 60초가 지나지 않았다면 nextCache 는 cache 안에 있는 데이터를 return  함
// // 만약 user 가 페이지를 다시 요청하는데  60초가 지난 상태면 cache 안에 있는 데이터는 너무 오래됐다, 최신이 아니다라고 간주함
// // 그래서 NextJS 는 최신 정보를 불러오기 위해 getInitialProducts 를 다시 호출하고 60초는 다시 작동함. 60초 마다가 아님. 60초가 지난 후 새로운 요청이 있다면 그때 NextJS 가 이 함수를 다시 호출할거라는 말이다.
// const getCachedProducts = nextCache(getInitialProducts, ['home-products'], {
//   revalidate: 60,
// });

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
//   const initialProducts = await getCachedProducts();
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
// // ✅ 13-3. revalidatePath
// // 🔶 두 번째 옵션
// // 🔶 revalidatePath (특정 경로(Path)) - 요청했을 때 데이터를 새로고침하는 방법, 요청형 새로고침
// // 이번엔 두번째, 우리가 요청했을 때 데이터를 새로고침 하는 방법. 두 가지 방법이 있다
// // 🔹 2-1. revalidatePath (특정 경로(Path))
// // 첫 번째 방법 URL을 타겟팅한다
// // =>'NextJS에게 /home 페이지에와 연결되어있는 모든 데이터를 새로고침 해라' 가장 편한 방법
// // 대신 많은 제어권을 가질 순 없다

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
// import Link from 'next/link';

// const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

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
//   const initialProducts = await getCachedProducts();
//   // 🔹 revalidate 라는 server action 만들어줌
//   // 이건 server component 안에 있기 때문에 inline server action 이여도 됨
//   // revalidate server action 에서 할 것은 여기서 revalidatePath 함수 호출
//   const revalidate = async () => {
//     'use server';
//     revalidatePath('/home');
//   };
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       {/* revalidate 씀 */}
//       <form action={revalidate}>
//         <button>Revalidate</button>
//       </form>
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
// // ✅ 13-6. Production Cache
// // 🔶 Next.js가 route를 어떻게 cache하는지
// // 이 모든 스크린의 모든 route
// // satic 페이지와 dynamic 페이지가 무엇을 의미하는지? 차이가 무엇인지?
// // 모든 request 에서 database 의 응답이 필요하다고 생각함에도 불구하고
// // Next.js 가 app, (tabs) 에 있는 home 페이지를 어떤 이유로 static 으로 처리하는지
// // 여기서는 기본 설정에 대한 설명임

// // 시작하기에 앞서, Next.js 가 어떻게 프로젝트를 build 하는지 이해해야 함
// // 여기서 building 이란, production mode(운영 모드)로 프로젝트를 빌드하는 것을 의미
// // 프로젝트를 build 하고 최적화 하는 것은 사용자가 사용할 실제 서버에 deploy 를 준비하는 작업
// // 우리는 development mode(개발 모드) 에 익숙한데, 이것은 다르다

// // npm run build
// // Next.js 가 최적화된 production build 를 하고 있는걸 볼 수 있다
// // 이건 Next.js 가 server-side 렌더링을 하고 static page 를 export 한다는 의미
// // 어떤 것이 dynamic 인지 감지할거고 어디에 있는지 알려줌3
// // 두 종류의 page 가 있는데 static , dynamic
// // profile 페이지는 dynamic 페이지이다
// // 누가 보고 있느냐에 따라 내용이 달라지기 때문
// // 사용자를 얻기 위해서 getUser() function 을 호출해야 하는데 이 함수안에서는 실제로 cookie 를 통해 session 을 얻어야 하고, database 와 얘기도 해야하고 database 결과에 따라서 h1 태그는 모든 사용자들에게 다르게 보일 것임
// // 그래서 확실하게 이 페이지는 dynamic 페이지이다
// // 보는 사람에 따라 이 페이지가 바뀔 것이기 때문이다
// // 하지만 home 페이지는 static 페이지다. 하지만 실제로 database 를 사용하고 있다
// // database 에 새로운 제품이 등록될 때, 이것은 어떤식으로 업데이트가 되어야만 한다
// // 하지만 Next.js 는 static 페이지라고 한다
// // npm run start => production mode 로 서버를 구동하겠다는 뜻
// // 홈페이지는 cookie 를 사용하지 않았다는 점이다
// // 이 홈페이지의 경우 database 를 사용하고 있지만, 이 페이지는 보는 사람에 따라 내용이 바뀌지 않음
// // cookie 도 사용하지 않고 사용자가 누구인지 상관 없다. header 도 사용하지 않고 있다
// // 사용자의 위치나 header 의 버전 등 무엇이든 상관 없다

// import ProductList from '@/components/product-list';
// import db from '@/lib/db';
// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Prisma } from '@prisma/client';
// import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
// import Link from 'next/link';

// const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

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
//   // 🔹 development mode 와 production mode 의 차이를 보기 위해
//   // getCachedProducts() 의 사용을 잠시 중단 getInitialProducts 로 바꿈
//   const initialProducts = await getInitialProducts();
//   const revalidate = async () => {
//     'use server';
//     revalidatePath('/home');
//   };
//   return (
//     <div>
//       <ProductList initialProducts={initialProducts} />
//       <form action={revalidate}>
//         <button>Revalidate</button>
//       </form>
//       <Link
//         href="/products/add"
//         className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
//       >
//         <PlusIcon className="size-10" />
//       </Link>
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Caching
// ✅ 13-7. Route Segment Config

// 🔶 Customization 옵션
// 이러면 최신 버전의 홈페이지를 사용자에게 보여주기 위해 revalidatePath 를 하지 않아도 됨
// Next.js 가 어떻게 모든 route 를 cache 하는지 알아봄
// 그리고 기본적으로 이 route 가 어떻게 동작하는지도 알아봄

// 복습
// Next.js 가 해당 페이지를 누가 보느냐에 따라 내용이 바뀌지 않는다고 판단하면
// Next.js 는 자동으로 많은 페이지를 static 으로 generate 한다
// npm run build 해서 어떤 페이지를 누가 보느냐에 따라 내용이 바뀌는지 아닌지 알려줌
// 이렇게 페이지를 generate 해준다
// 프로필 페이지를 예를 들면, cookie 를 사용하기 때문에 누가 보느냐에 따라 내용이 바뀔 수 있다
// 그리고 제품 페이지는 ID 로 어떤 데이터가 들어가느냐에 따라 바뀔 것임

import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
import Link from 'next/link';

const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

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

// 📍 dynamic 은 route segment config 옵션 중에 하나이다
// 이것은 page, layout, route handler 의 동작을 구성할 수 있도록 해줌
// dynamic 의 기본값은 'auto' 이다
// 이는 페이지가 가능한 한 많은 cache 를 사용하게 될 것을 의미한다
// 이걸 force-dynamic 으로 변경할 수 있음

// 📍 force-dynamic 은 dynamic rendering 을 강제로 실행시킴
// 이건 사용자가 페이지를 방문할 때마다 이전 버전의 HTML 을 볼 수 없다는 뜻
// 대신에 Next.js 는 사용자가 그곳에 방문할 때마다 새로운 HTML 을 generate 할 것이다
// 이것이 일어나려면 export const dynamic = 'force-dynamic'; 해주면 됨
// export 하면 Next.js 는 자동적으로 이것을 찾음
// 만약 이걸 찾지 못하면 'auto' 가 기본값이고 만약 찾는다면 overridden 되어서 force-dynamic 이 될것임
// 이렇게 하고 npm run build 하고 npm run start 를 해보면
// 사용자가 refresh 할 때마다 database 를 호출하게 됨

// 🔹 force-dynamic
// static => dynamic 으로 만들어라
// 이러면 페이지를 refresh 할 때마다 database 가 호출 됨
// export const dynamic = 'force-dynamic';

// 🔶 세 번째 옵션
// 🔹 revalidate
// revalidate 는 특정한 시간에 페이지를 재검증하도록 Next.js 에게 지시할 수 있음
// nextCache 로 revalidate 한 것처럼 route 에 대해서도 동일한 것을 할 수 있음
// 이건 pruduction mode(운영 모드) 에서 빌드했을 때 작동 함
// 먼저 production mode 에서 build 한 다음 npm run start 를 해야 함
// force-dynamic 을 하지 않는 대신 revalidate 함
// 내 페이지는 static 페이지로 돌아감. 이는 ㅅ용자가 refresh 할 때마다 database 를 호출하지 않는 것을 의미함
// 하지만 Next.js 는 60초 후에 재검증을 할거고, 페이지는 새로운 request 를 받게 될 것임
// 👍 이 조합이 좋은 것 같음
// 사용자가 접근하면 컨텐츠는 준비되어 있고 database 를 건드리지도 않은 static 페이지를 제공
// 그리고 타임을 지정함. 페이지가 업데이트 되길 원하는 시간을 정함.
// 그러면 Next.js 는 자동으로 database 를 호출하고 모든 작업을 다시 수행함.
export const revalidate = 60;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  const revalidate = async () => {
    'use server';
    revalidatePath('/home');
  };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
