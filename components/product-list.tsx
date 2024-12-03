//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-7. Pagination Action
// ✅ 10-8. Recap

'use client';

import { InitialProducts } from '@/app/(tabs)/products/page';
import ListProduct from './list-product';
import { useState } from 'react';
import getMoreProducts from '@/app/(tabs)/products/actions';

// 📍 tabs products에 가서 initialProducts에 마우스 대서 복사해서 가져오거나
// interface ProductListProps {
//   id: number;
//   title: string;
//   price: number;
//   photo: string;
//   created_at: Date;
// }[]

// 👍 이 방법이 더 어드벤스, 하지만 둘 다 괜찮음
// 하지만 차이점은 위에서 항목을 추가하고 싶다면 직접 내용을 복사해서 업데이트하고 추가해야한다는 것
// 이렇게 하면 여기에 뭐를 추가하던간에, prisma 가 알아서 추론하고 알려줌
// 📍 다른 옵션은 Typescript 가 이 작업을 수행하도록 한다
// (tabs)/products/page.tsx 에서 내보낸 것 InitialProducts 사용하면 됨
interface ProductListProps {
  initialProducts: InitialProducts;
}

// ✨ initial product 받음
// Product list component 를 client component 로 바꾼다
export default function ProductList({ initialProducts }: ProductListProps) {
  // state 가 있는데 여기에 ListProduct 를 저장할 것임
  // page 를 처음 로드하면, 상품 목록이 Product page 에서 제공한 initialProducts 로 초기화 됨
  // 그럼 user 가 클릭하면 어떻게 상품 데이터를 추가할 수 있을까?
  // Load more 버튼 만들어줌
  // 이 버튼을 클릭하면 더 많은 product 를 얻고 싶은데, useEffect 나 fetch 같은 것을 사용하는 대신 server action 생성 할 수 있다
  // (tabs)/products/actions.ts 생성
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMorClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    // 새 product 의 length 가 0과 같으면, 이는 마지막 page 에 도달한 것
    // 그게 아니면 새 page 를 추가한다
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      // 우리가 받은 새로운 products 를 기존에 존재하던 products 와 합침
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      // 만약에 클릭하거나 버튼을 눌렀는데 아무 product 를 받지 못하면
      // 따라서 나에게 주어진 list 의  length 가 0이면 setIsLastPage true
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  // ✨ (tabs)/products/page.tsx 에서 복사 붙여넣기 return 해서 랜더링 함
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {/* 마지막 page 면 아무것도 보여주지 말고 그게 아니면 보여주기 */}
      {isLastPage ? (
        'No more items'
      ) : (
        <button
          onClick={onLoadMorClick}
          disabled={isLoading} // loading 중이라면, 이 기능을 disable 함
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? '로딩 중' : 'Load more'}
        </button>
      )}
    </div>
  );
}
