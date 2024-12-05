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

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-7. Pagination Action
// ✅ 10-8. Recap
// ✅ 12-1. Intercepting Routes : product => home 으로 바꿈 이 부분만 우선 수정
// 여기선 스타일만 수정
// ✨ 이미지 늘어나거나 찌그러지거나 변형하지 않게 스타일 바꿔줌 object-cover

import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToWon } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
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
  // console.log(product);
  return product;
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
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <div className="pb-40">
      <div className="relative aspect-square">
        {/* ✨ 이미지 늘어나거나 찌그러지거나 변형하지 않게 스타일 바꿔줌 object-cover */}
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
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete product
          </button>
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

// 무한 스크롤 구현

// 첫 번째 단계
// 버튼 만들어서 그 버튼을 클릭하면 더 많은 product를 가져옴
// 그래서 유저가 product page에 도착했을 때, 유저는 첫 번째 product만 보도록 함
// 그 다음 버튼을 클릭해서 두 번째 상품 보여줌.. 세 번째 상품
// page를 변경하지 않음 이 목록에 새로운 product를 추가

// 두 번째 단계
// 유저의 클릭을 절약함
// 유저가 클릭하는 대신, 유저가 아래로 스크롤하는 것을 감지함. 그럼 버튼이 보일 것임
// 그리고 더 많은 product를 얻기 위해 즉시 요청을 실행
// 그래서 먼저 버튼을 갖고 하고, 클릭해서 더 많은 상품을 조회할 수 있도록
// 이렇게 한 다음 스크롤링으로 바꿈
