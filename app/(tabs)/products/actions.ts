//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-7. Pagination Action
// ✅ 10-8. Recap
// 유저가 더 많은 products를 원할 때, 첫 번째 항목은 건너 뒤고 두 번째 item을 가져옴

'use server';

import db from '@/lib/db';

// ✨ (tabs)/products/page.tsx 에서 여기서 우리는 pruduct 를 fetch 하는 중이다
// 여기서는 오직 하나의 product 만 가져오고 있음
// 이 부분을 복사해서 여기에 붙여 넣음
// 이제 하나를 가져왔지만 첫 번째 것은 건너 뜀
// (tabs)/products/page.tsx 는 처음에 initialProducts 를 받음
// 그래서 우리가 initialProducts 를 얻을 때
// database 의 첫 번째 아이템, 첫 번쩨 product 를 줌
// 이제 여기서 user 가 더 많은 products 를 원할 때
// 우리는 두 번째 item 을 가져 올 것임
// 왜냐면 첫 번째 항목을 건너뛰고 그 다음 하나를 가져오기 때문 이렇게 두 번째 item 갖고 오는 것
// 이것이 서버 액션이다.
// 우리는 fetch 해 올 필요가 없고, API 라우트를 생성할 필요도 없고, 다른 것을 설치할 필요도 없음

export default async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // page 가 하나라면 하나의 product 를 건너뛰게 됨
    // 항상 1개만 가져옴
    // page 가 0이라면 0 * 1 이므로 건너뛰는 상품 없음
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}
