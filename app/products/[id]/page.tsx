// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-4. Detail Skeleton
// // 날짜, 가격 형식 포맷팅
// // 상품을 클릭해서 이동하고 실제로 무언가를 보게 만듦

// // 여기서는 tab bar 가 없다!
// // products/[id]/page.tsx 가 있고
// // tabs 에도 products/page.tsx 가 있다
// // 이 둘은 같은 URL 을 타겟팅 한다 /products
// // 다른점은 User 가 /products 로만 가면 상품 목록 페이지를 보고
// // User 가 /products/id 로 가면 상품 디테일 페이지를 본다

// // ❌ products 밑에 page 를 만들 수 없다 왜냐면 에러가 남
// // 두 개의 병렬 페이지가 있다고 나옴
// // 이유는 보이지 않는 tab 을 갖고 있기 때문
// // app/products/page 도 있고 app/products/page 도 갖고 있다

// // ✨ 상세 화면에 탭바가 나오길 원하지 않으니 app/products 폴더 따로 만듦
// async function getProduct() {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
// }

// // Next.js는 route 를 통해서 id 라는 parameter 를 제공해줌.
// // 그래서 여기서 parameter 를 가져올 수 있다. 그리고 id 를 가져옴
// // 그리고 parameter 는 id 를 갖고 있고 string 이라고 타입스크립트에게 알려줌
// // skeleton 만들어 줌
// export default async function ProductDetail({
//   params: { id },
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct();
//   return <span>Product detail of the product {id}</span>;
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-5. Product Detail
// // 제품 가져오기

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// // 🔶 사용자가 소유자인지 아닌지 확인
// // 현재 사용자가 이 제품을 보고 있는지 아닌지 ?
// // 해당 사용자가 제품의 소유자인지 알고 싶다
// // 만약 해당 사용자가 제품의 소유자라면 제품의 편집 버튼을 보여줄 수 있다
// // 수정, 삭제 또는 그리고 구매 같은 버튼은 보여주지 않을 수도 있다
// // 이 제품을 누가 upload 했는지 얻어옴 userId
// // schema 를 보면 product 는 userId 를 갖고 있음
// // 만약 cookie 에 있는 ID 인 userId 가 제품을 upload 한 사용자의 userId 와 같다면
// // 해당 사용자는 소유자라는 의미이고 나머지는 false
// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// // 그래서 getProduct() 는 id 를 받을 수 있고
// // database 에서 제품 가져올 수 있음
// async function getProduct(id: number) {
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   console.log(product);
//   return product;
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   // 🔹 id 가 숫자 아니면 에러 생성
//   // 숫자로 변환할 수 없는 것을 시도하면 notFound
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }

//   // id 를 getProduct() 의 매개변수로 줌
//   // getProduct 에 id 를 준다 왜냐면 이제 숫자라고 확신 함
//   // product 가 존재하지 않는다면? notFound 리턴
//   const product = await getProduct(id);
//   if (!product) {
//     return notFound();
//   }

//   // product.userId 를 반드시 전달
//   const isOwner = await getIsOwner(product.userId);
//   return (
//     <div>
//       <div className="relative aspect-square">
//         <Image fill src={product.photo} alt={product.title} />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//             Delete product
//           </button>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-7. Pagination Action
// // ✅ 10-8. Recap
// // ✅ 12-1. Intercepting Routes : product => home 으로 바꿈 이 부분만 우선 수정
// // 여기선 스타일만 수정
// // ✨ 이미지 늘어나거나 찌그러지거나 변형하지 않게 스타일 바꿔줌 object-cover

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// async function getProduct(id: number) {
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   // console.log(product);
//   return product;
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   return (
//     <div className="pb-40">
//       <div className="relative aspect-square">
//         {/* ✨ 이미지 늘어나거나 찌그러지거나 변형하지 않게 스타일 바꿔줌 object-cover */}
//         <Image
//           fill
//           className="object-cover"
//           src={product.photo}
//           alt={product.title}
//         />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//             Delete product
//           </button>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// // 무한 스크롤 구현

// // 첫 번째 단계
// // 버튼 만들어서 그 버튼을 클릭하면 더 많은 product를 가져옴
// // 그래서 유저가 product page에 도착했을 때, 유저는 첫 번째 product만 보도록 함
// // 그 다음 버튼을 클릭해서 두 번째 상품 보여줌.. 세 번째 상품
// // page를 변경하지 않음 이 목록에 새로운 product를 추가

// // 두 번째 단계
// // 유저의 클릭을 절약함
// // 유저가 클릭하는 대신, 유저가 아래로 스크롤하는 것을 감지함. 그럼 버튼이 보일 것임
// // 그리고 더 많은 product를 얻기 위해 즉시 요청을 실행
// // 그래서 먼저 버튼을 갖고 하고, 클릭해서 더 많은 상품을 조회할 수 있도록
// // 이렇게 한 다음 스크롤링으로 바꿈

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-0. Introduction
// // metadata, generateMetadata

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';

// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// async function getProduct(id: number) {
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   // console.log(product);
//   return product;
// }

// //✨ generateMetadata
// // URL 로부터 parameter 를 받을 수 있다
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const product = await getProduct(Number(params.id));
//   return {
//     title: product?.title,
//   };
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   return (
//     <div className="pb-40">
//       <div className="relative aspect-square">
//         <Image
//           fill
//           className="object-cover"
//           src={product.photo}
//           alt={product.title}
//         />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//             Delete product
//           </button>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-4. revalidateTag

// // 🔶 두 번째 옵션
// // 이번엔 두번째, 우리가 요청했을 때 데이터를 새로고침 하는 방법. 두 가지 방법이 있다
// // 🔹 2-2. revalidateTag
// // 태그를 기반으로 새로고침하는 방법. 이 방법으로 하면 오직 이 태그를 가진 cache만 새로고침 됨

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { unstable_cache as nextCache, revalidateTag } from 'next/cache';

// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// // 🚩 데이터베이스에 접근하는 함수 두 개
// // 🔹 제품에 대한 모든 데이터 가져옴. 제품을 업로드한 user 에 대한 데이터까지 가져옴.
// // ProductDetail 페이지에 넣을 제품의 모든 데이터를 가져오는데 쓰임
// async function getProduct(id: number) {
//   console.log('product');
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   return product;
// }

// const getCachedProduct = nextCache(getProduct, ['product-detail'], {
//   tags: ['product-detail', 'xxxx'],
// });

// // 🔹 제품의 제목만 가져옴.
// // 이건 오직 generateMetadata 에서만 쓰임
// async function getProductTitle(id: number) {
//   console.log('title');
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     select: {
//       title: true,
//     },
//   });
//   return product;
// }

// // 하지만 getProductTitle 을 호출, 사용할 때 id 를 넘겨주고 있지 않다.
// // 왜냐면 nextCache 가 자동으로 getProductTitle 이 함수에 보낸 argument 를 제공하기 때문이다
// // 이렇게 함수의 이름만 쓰는 것이 id 를 받아서 그 id 를 getProductTitle 에 보내주는 것과 같다. (id:number) => getProductTitle(id),
// // getCachedProductTitle 를 호출해서 argument(id) 를 보내면 이 argument 는 자동으로 nextCache 의 첫 번째 함수로 보내지기 때문임
// // key 는 유니크해야 함 ['product-title'], getProductTitle 이 함수에 의해 return 된 데이터는 이 key 를 이용해서 cache 에 저장되기 때문. 이 애플리케이션 전체서 유일무이해야함
// // 하지만 tages 는 딱히 유일하지 않아도 됨. 이름 똑같지 않아도 됨.
// // 애플리케이션 있는 여러 cache 들은 똑같은 tags 를 공유할 수 있다
// const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
//   tags: ['product-title', 'xxxx'],
// });

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   // 여기서는 getCachedProductTitle 를 호출할 때 제품의 id 를 보내주고 있다
//   // 왜냐하면 getProductTitle 함수는 우리에게 우리가 데이터베이스에 찾고 싶은 제품의 id 를 보내달라고 요구하기 때문이다
//   const product = await getCachedProductTitle(Number(params.id));
//   return {
//     title: product?.title,
//   };
// }

// //
// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getCachedProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   const revalidate = async () => {
//     'use server';
//     revalidateTag('xxxx'); // ⚡ 새로고침하고 싶은 태그를 여기 넣어줌, 어떻게 태그 하나가 여러 cache 들을 새로고침하는지 보여주기 위해서 xxxx 넣어줌
//   };
//   return (
//     <div className="pb-40">
//       <div className="relative aspect-square">
//         <Image
//           fill
//           className="object-cover"
//           src={product.photo}
//           alt={product.title}
//         />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <form action={revalidate}>
//             <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//               Revalidata title cache
//             </button>
//           </form>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-5. fetch Cache

// // ✨
// // NextJS 프로젝트 작업할 때 이렇게 데이터베이스에 직접 접근하진 않을 것이다
// // 보통 다른 서버에 있는 API 로부터 데이터를 fetch 해옴
// // 만약에 서버 컴포넌트에서 fethc requests 를 쓰고 있다면, 여러분이 데이터를 fetch 할 때, 그리고 headers 나 cookies 를 쓰지 않을 때
// // fetch('https://api.com') 이 fethc request 는 자동으로 cache 가 됨
// // 따라서 API 한테 get requests 해줄 때는 nextCache  를 사용하지 않아도 된다
// // 왜냐하면 fetch 함수가 NextJS 에서 추가기능들을 갖고 있기 때문
// // nextCache 함수와 동일한 속성을 제공해준다
// // nextCache 는 다른 데이터를 cache 하는 데 사용 됨. 예를 들면 데이터베이스에서 직접 오는 데이터 같은 것에.

// // 캐싱이 안되는 요청들

// // 캐싱 안함
// // 1. post request
// // 2. cookies, headers 사용
// // 3. server action에 있는 fetchr request

// // ❌ 아래 코드는 실제로 사용 X. 설명을 위한 것. 에러남.
// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import {
//   unstable_cache as nextCache,
//   revalidatePath,
//   revalidateTag,
// } from 'next/cache';

// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

// async function getProduct(id: number) {
//   fetch('https://api.com', {
//     next: {
//       revalidate: 60,
//       tags: ['hello'],
//     },
//   });
// }

// const getCachedProduct = nextCache(getProduct, ['product-detail'], {
//   revalidate: 60,
//   tags: ['product-detail', 'hello'],
// });

// async function getProductTitle(id: number) {
//   console.log('title');
//   const product = await db.product.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       title: true,
//     },
//   });
//   return product;
// }

// const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
//   tags: ['product-title', 'xxxx'],
// });

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const product = await getCachedProductTitle(Number(params.id));
//   return {
//     title: product?.title,
//   };
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getCachedProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   const revalidate = async () => {
//     'use server';
//     revalidatePath('/home');
//   };
//   return (
//     <div className="pb-40">
//       <div className="relative aspect-square">
//         <Image
//           className="object-cover"
//           fill
//           src={`${product.photo}/width=500,height=500`}
//           alt={product.title}
//         />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <form action={revalidate}>
//             <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//               Revalidate title cache
//             </button>
//           </form>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// //////////////////////////////////////////////////
// // ✅ 2024 Caching
// // ✅ 13-10. generateStaticParams

// // 🔶 dynamic 한 /product/[id] 이 URL 최적화 시키기
// // 🔶 URL 에 변수가 있는 페이지를 전환하는 방법
// // 이건 이 id 에 뭘 넣느냐에 따라 페이지는 두 가지 방법 중 하나로 표시 됨
// // 예를 들어 문자열인 이름을 넣으면 우리는 이 페이지가 그 이름을 숫자로 바꾸려할 것이라는 것을 알고
// // 그건 가능하지 않으므로 not found 를 표시할 것임
// // 아님 우리가 데이터베이스에 존재하지 않는 id 를 넣는다면 그것 또한 not found 를 표시할 것임
// // 존재하는 id 를 넣는다면 그제서야 제품을 보여줄 것임
// // 물론 이 페이지는 dynamic 하다. 왜냐면 이 페이지가 어떻게 보일지 미리 알 수 있는 방법이 없기 때문
// // 우리가 여기에 뭘 넣느냐에 따라 이 페이지는 바뀔 것임
// // 우리는 이거를 어떻게 dynamic 에서 다른 것으로 바꿀 수 있는지 볼 것임
// // 반은 dynamic, 반은 static 으로

// // 🔥 우리가 여기에 어떤 id 들이 들어갈지 안다면, 만약에 우리가 여기에 올 수 있는 가능한 id 들이 뭔지 안다면 우리느 NextJS 에게 그 페이지들 중 일부를 미리 render 해달라고 요청할 수 있다
// // 우리에게 확실한 결과물을 줄 수 있는 유일한 id 는 데이터베이스를 보면 숫자 4라는 것을 알고 있다
// // 그래서 NextJS 에게 말해줄 수 있는 방법이 있음. 이 id들은 내 데이터베이스 안에 갖고 있다. 그리고 옵션 하나밖에 없다 그 옵션은 숫자

// // 📍 getIsOwner 가 작동하는 방식을 수정해줄 것임. 더이상 getSession 사용하지 않음
// // NextJS 에게 여기 옵션 중 하나는 숫자를 넣는거라고 말해주고 NextJS 가 이 페이지를 미리 render 해주기를 바란다
// // 따라서 getSession 사용을 제거해줘야 함. 왜냐면 이건 cookies 기능을 갖고 있고, 이 뜻은 페이지가 절대 미리 render 되지 않고 항상 dynamic 할거란 소리이다.

// import db from '@/lib/db';
// import getSession from '@/lib/session';
// import { formatToWon } from '@/lib/utils';
// import { UserIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { unstable_cache as nextCache, revalidateTag } from 'next/cache';

// async function getIsOwner(userId: number) {
//   // 🔹 더이상 getSession 사용하지 않음
//   // 이렇게 하는 이유는 getSession 이 cookies 를 사용하기 때문
//   // cookies 를 사용하면 이 페이지들을 미리 render 해줄 수 없다
//   // const session = await getSession();
//   // if (session.id) {
//   //   return session.id === userId;
//   // }
//   return false;
// }

// async function getProduct(id: number) {
//   console.log('product');
//   // await new Promise((resolve) => setTimeout(resolve, 10000));
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       user: {
//         select: {
//           username: true,
//           avatar: true,
//         },
//       },
//     },
//   });
//   return product;
// }

// const getCachedProduct = nextCache(getProduct, ['product-detail'], {
//   tags: ['product-detail', 'xxxx'],
// });

// async function getProductTitle(id: number) {
//   console.log('title');
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//     select: {
//       title: true,
//     },
//   });
//   return product;
// }

// const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
//   tags: ['product-title', 'xxxx'],
// });

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const product = await getCachedProductTitle(Number(params.id));
//   return {
//     title: product?.title,
//   };
// }

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return notFound();
//   }
//   const product = await getCachedProduct(id);
//   if (!product) {
//     return notFound();
//   }
//   const isOwner = await getIsOwner(product.userId);
//   const revalidate = async () => {
//     'use server';
//     revalidateTag('xxxx');
//   };
//   return (
//     <div className="pb-40">
//       <div className="relative aspect-square">
//         <Image
//           fill
//           className="object-cover"
//           src={product.photo}
//           alt={product.title}
//         />
//       </div>
//       <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
//         <div className="size-10 overflow-hidden rounded-full">
//           {product.user.avatar !== null ? (
//             <Image
//               src={product.user.avatar}
//               width={40}
//               height={40}
//               alt={product.user.username}
//             />
//           ) : (
//             <UserIcon />
//           )}
//         </div>
//         <div>
//           <h3>{product.user.username}</h3>
//         </div>
//       </div>
//       <div className="p-5">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <p>{product.description}</p>
//       </div>
//       <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
//         <span className="font-semibold text-xl">
//           {formatToWon(product.price)}원
//         </span>
//         {isOwner ? (
//           <form action={revalidate}>
//             <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
//               Revalidata title cache
//             </button>
//           </form>
//         ) : null}
//         <Link
//           className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
//           href={``}
//         >
//           채팅하기
//         </Link>
//       </div>
//     </div>
//   );
// }

// // ✨ 이 함수는 generateStaticParams 라고 불려야 함
// // 이 함수의 유일한 요구는 이 함수는 무조건 array 를 return 해야 함
// // productDetail 함수가 받을 가능성이 있는 parameter 들이 들어있는 array
// // ProductDetail 함수의 parameter 는 문자열을 갖고 있는 object 를 받음
// // 따라서 이 함수는 우리의 함수가 받을 가능성이 있는 parameter objects 리스트를 return 해야 함
// // 그리고 데이터베이스를 살펴보면 이 페이지에서 not found 이외의 것을 표시할 가능성이 있는 parameter 는 id 4.
// // id 에 4 넣어줌 {id: '4'} 이건 문자열이여야 함 productDetail 에서 받는 것과 동일한 방식
// // 같은 모양, 같은 타입으로 제공해줘야 함. 나중에 숫자로 바꿔줄 예정
// // 이러고 npm run build 해보면 static 페이지들을 생성한다. 그리고 보면 새로운 심볼. 색칠된 원으로 바뀐것을 볼 수 있음
// // 이건 static HTML 로 사전 렌더링(prerendered) 되었다
// // 이게 무슨 의미냐면 NextJS 가 여기에 뭐가 올지 전혀 모르므로 예전엔 dynamic 페이지였지만
// // 이제 NextJS 한테 여기에 뭐가 올 수 있는지 알려줌
// // 이렇게 이 정보를 바탕으로 NextJS 가 이걸 static 페이지로 바꿔줄 수 있다
// // 따라서 유저가 거기를 방문하면 데이터베이스는 호출되지 않을 것이다
// // 왜냐면 이 페이지는 이미 미리 구축되어 있을 것이기 때문이다
// // skeleton 은 거기 없을 것임. 왜냐면 이 페이지는 이미 HTML 이다
// // 이 뜻은 여러분의 URL 에 변수가 있더라도 여전히 static 페이지들을 얻을 수 있다는 말
// // 이제 로딩도 훨씬 빠르고 skeleton 도 필요하지 않다
// // 이는 또한 제품의 소유자가 제품을 추가할 때 server action 을 생성할 수 있다는 의미이기도 함.
// // 만약 제품의 소유자가 제품을 추가하면 그 해당 server action 에서 revalidatePath 해주고 '/product/4' 를 새로고침 하고 싶다고 해주면 됨
// // 그러면 NextJS 는 이 페이지를 새로고침해줄거고, 여전히 이건 static 페이지 일 것이다
// // 왜냐면 NextJS 는 최신 정보를 갖고 새로운 HTML 을 구성해주기 때문
// // 물론 이건 책임감 있게 사용해야 함. 만약에 10000 개의 제품을 갖고 있다고 하면 이 페이지를 미리 생성함으로써 서비스를 빌드할 때 데이터베이스가 다운되는 것을 원치 않을 것임. 상황에 따라 다름

// // 이제 id들을 하드 코딩하지 않고 여기에 데이터베이스 호출 해주면 됨
// // products 는 id 숫자들의 array 이다. 그래서 문자열로 바꿔줘야 함
// export async function generateStaticParams() {
//   const products = await db.product.findMany({
//     select: {
//       id: true,
//     },
//   });
//   return products.map((product) => ({ id: product.id + '' }));
// }

//////////////////////////////////////////////////
// ✅ 2024 Caching
// ✅ 13-11. dynamicParams

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToWon } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';

async function getIsOwner(userId: number) {
  // 🔹 더이상 getSession 사용하지 않음
  // 이렇게 하는 이유는 getSession 이 cookies 를 사용하기 때문
  // cookies 를 사용하면 이 페이지들을 미리 render 해줄 수 없다
  // const session = await getSession();
  // if (session.id) {
  //   return session.id === userId;
  // }
  return false;
}

async function getProduct(id: number) {
  console.log('product');
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

const getCachedProduct = nextCache(getProduct, ['product-detail'], {
  tags: ['product-detail', 'xxxx'],
});

async function getProductTitle(id: number) {
  console.log('title');
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
  tags: ['product-title', 'xxxx'],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  const revalidate = async () => {
    'use server';
    revalidateTag('xxxx');
  };
  return (
    <div className="pb-40">
      <div className="relative aspect-square">
        <Image
          fill
          className="object-cover"
          src={product.photo}
          alt={product.title}
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0  p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <form action={revalidate}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              Revalidata title cache
            </button>
          </form>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}

// ✨ 기본 동작을 바꿀 수 있는 방법
// 이 동작을 담당하는 설정은 dynamicParams 라고 불리며 기본적으로 값은 true임
// dynamicParams 이 true 일때는 미리 생성되지 않은 페이지들이 dynamic 페이지들로 간주 될 것임
// 그 페이지들은 render 될 것이고, 데이터베이스는 호출될 것임. 유저는 skeleton 을 보게될거고
// 그 후엔 그 페이지의 HTML 은 저장된 뒤 static 페이지로 바뀔 것임 (빌드 후 새 제품 추가 한다면 이것이 기본 동작)
// 하지만 false 로 바꿔준다면
// 이렇게 하고 새로운 제품을 등록해서 그 아이디로 들어가면 not found 화면 나옴
// 즉, 오직 빌드할 때 미리 생성된 페이지들만 찾을 수 있을거라는 말이다
// 만약에 유저가 빌드할 때 미리 생성되지 않은 페이지로 이동하면 404 not found 를 보게 됨
// export const dynamicParams = false; 는 사용하게 될지 잘 모르겠음
// 왜냐면 기본 동작이 대단하기 때문에 이걸 왜 할지 모르겠지만 그래도 알려줌. 기본적으로 이건 true
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({ id: product.id + '' }));
}
