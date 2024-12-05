// //////////////////////////////////////////////////
// // ✅ 2024 Products
// // ✅ 10-7. Pagination Action
// // ✅ 10-8. Recap

// 'use client';

// import { InitialProducts } from '@/app/(tabs)/products/page';
// import ListProduct from './list-product';
// import { useState } from 'react';
// import getMoreProducts from '@/app/(tabs)/products/actions';

// // 📍 tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// // interface ProductListProps {
// //   id: number;
// //   title: string;
// //   price: number;
// //   photo: string;
// //   created_at: Date;
// // }[]

// // 👍 이 방법이 더 어드벤스, 하지만 둘 다 괜찮음
// // 하지만 차이점은 위에서 항목을 추가하고 싶다면 직접 내용을 복사해서 업데이트하고 추가해야한다는 것
// // 이렇게 하면 여기에 뭐를 추가하던간에, prisma 가 알아서 추론하고 알려줌
// // 📍 다른 옵션은 Typescript 가 이 작업을 수행하도록 한다
// // (tabs)/products/page.tsx 에서 내보낸 것 InitialProducts 사용하면 됨
// interface ProductListProps {
//   initialProducts: InitialProducts;
// }

// // ✨ initial product 받음
// // Product list component 를 client component 로 바꾼다
// export default function ProductList({ initialProducts }: ProductListProps) {
//   // state 가 있는데 여기에 ListProduct 를 저장할 것임
//   // page 를 처음 로드하면, 상품 목록이 Product page 에서 제공한 initialProducts 로 초기화 됨
//   // 그럼 user 가 클릭하면 어떻게 상품 데이터를 추가할 수 있을까?
//   // Load more 버튼 만들어줌
//   // 이 버튼을 클릭하면 더 많은 product 를 얻고 싶은데, useEffect 나 fetch 같은 것을 사용하는 대신 server action 생성 할 수 있다
//   // (tabs)/products/actions.ts 생성
//   const [products, setProducts] = useState(initialProducts);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const onLoadMorClick = async () => {
//     setIsLoading(true);
//     const newProducts = await getMoreProducts(page + 1);
//     // 새 product 의 length 가 0과 같으면, 이는 마지막 page 에 도달한 것
//     // 그게 아니면 새 page 를 추가한다
//     if (newProducts.length !== 0) {
//       setPage((prev) => prev + 1);
//       // 우리가 받은 새로운 products 를 기존에 존재하던 products 와 합침
//       setProducts((prev) => [...prev, ...newProducts]);
//     } else {
//       // 만약에 클릭하거나 버튼을 눌렀는데 아무 product 를 받지 못하면
//       // 따라서 나에게 주어진 list 의  length 가 0이면 setIsLastPage true
//       setIsLastPage(true);
//     }
//     setIsLoading(false);
//   };
//   // ✨ (tabs)/products/page.tsx 에서 복사 붙여넣기 return 해서 랜더링 함
//   return (
//     <div className="p-5 flex flex-col gap-5">
//       {products.map((product) => (
//         <ListProduct key={product.id} {...product} />
//       ))}
//       {/* 마지막 page 면 아무것도 보여주지 말고 그게 아니면 보여주기 */}
//       {isLastPage ? (
//         'No more items'
//       ) : (
//         <button
//           onClick={onLoadMorClick}
//           disabled={isLoading} // loading 중이라면, 이 기능을 disable 함
//           className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
//         >
//           {isLoading ? '로딩 중' : 'Load more'}
//         </button>
//       )}
//     </div>
//   );
// }

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-9. Infinite Scrolling
// ✅ 12-1. Intercepting Routes : product => home 으로 바꿈 이 부분만 우선 수정

// 🔶 infinite scrolling 구현
// 작업은 두 단계
// 📍 첫 번째 : 버튼 만듦
// 이 버튼을 클릭하면 더 많은 product 를 가져옴
// 그래서 user 가 우리의 product page 에 도착했을 때
// 그들은 첫 번째 product 만 보도록 함
// 그런 다음 버튼을 클릭해서 두 번째 상품을 보여주고, 다음 버튼을 클릭하면 세번째 상품
// page 를 변경하진 않을 것임. 이 목록에서 새로운 product 를 추가

// 📍 두 번째 : 기본적으로 user 의 클릭을 절약
// 따라서 user 가 클릭하는 대신, user 가 아래로 스크롤하는 것을 감지함
// 그러면 버튼이 보일 것임
// 그리고 더 많은 product 를 얻기 위해 즉시 요청을 실행하는 것
// 그래서 먼저 버튼을 갖고 할거고, 클릭해서 더 많은 상품을 조회할 수 있도록 한다
// 그렇게 한 다음 스크롤링으로 바꿀 것임

'use client';

import { InitialProducts } from '@/app/(tabs)/home/page';
import ListProduct from './list-product';
import { useEffect, useRef, useState } from 'react';
import getMoreProducts from '@/app/(tabs)/home/actions';

// tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// interface ProductListProps {
//   id: number;
//   title: string;
//   price: number;
//   photo: string;
//   created_at: Date;
// }[]

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  // 🔹 span 객체 레퍼런스를 저장하고 이걸 trigger 로 호출할 것임
  // useRef : variable 내부에 data 를 저장할 수 있게 해준다. 수정할 수 있는 객체를 제공
  // trigger 이 object 안에 data 를 넣을 수 있다
  // null 시작하고 레퍼런스를 여기 span 에 저장하겠다고 TypeScript 에 알려줌
  // HTMLSpanElement 를 사용하고 싶다고 알려주는 것
  const trigger = useRef<HTMLSpanElement>(null);
  // 🔹 page 에 대해서 listen
  // trigger 를 감지. 아래로 스크롤 할 때 trigger 가 화면에 있는 것을 감지하고
  // observe 하는 것을 멈추고 DB 에서 상품을 더 불러오는 코드를 실행
  // user 가 trigger 를 보게 되면 trigger 를 observe 하다가 trigger 관찰을 중단함
  useEffect(() => {
    // 🔹 Observer 생성
    // callback 이 필요함
    // entries : observe 하고 있는 모든 items, IntersectionObserver 는 하나가 아닌 많은 item 을 observe 할 수 있다. item 들의 배열
    // observer : 이 entries 를 observe 하는 것
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        // 🔹 코드 trigger
        // 첫 번째 element 가져옴
        const element = entries[0];
        // element 가 isIntersecting 하고 trigger.current 존재하면
        // trigger 를 unobserve 함
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          // 🔹 이 코드를 trigger 하는 것은 버튼을 클릭하는 것 => 무한스크롤링으로 바꿈
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0, // 1.0 을 쓴다면, trgger 가 100% 표시될 때까지 기다린다는 뜻
        rootMargin: '0px 0px -100px 0px',
      }
    );
    // 🔹 trigger 가 null이 아닌지 확인.
    // trigger.current 가 null 이 아니라면 trigger.current 를 observe 함
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    // ✨ useEffect function 에는 cleanup function 이 필요함
    // cleanup function 은 user 가 page 를 떠날 때 호출 됨
    // ProductList component 가 사라질 때, 즉 unmount 되면, component 가 제거 되면
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage ? (
        // button 을 span 으로 바꿈
        <span
          // span element 에 알려줌
          // document.getElementById() 처럼 span 을 가져오는 코드와 비슷
          ref={trigger}
          // 스크롤 일부러 내림.
          // style={{
          //   marginTop: `${page + 1 * 900}vh`,
          // }}
          // mb-96 삭제
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? '로딩 중' : 'Load more'}
        </span>
      ) : null}
    </div>
  );
}

// intersectionObserver 를 사용해 무한 스크롤을 trigger 로 만듦
// 아래로 스크롤하면 이 버튼이 표시되고 이 코드가 trigger 됨
