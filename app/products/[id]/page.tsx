//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-4. Detail Skeleton
// 날짜, 가격 형식 포맷팅
// 상품을 클릭해서 이동하고 실제로 무언가를 보게 만듦

// 여기서는 tab bar 가 없다!
// products/[id]/page.tsx 가 있고
// tabs 에도 products/page.tsx 가 있다
// 이 둘은 같은 URL 을 타겟팅 한다 /products
// 다른점은 User 가 /products 로만 가면 상품 목록 페이지를 보고
// User 가 /products/id 로 가면 상품 디테일 페이지를 본다

// ❌ products 밑에 page 를 만들 수 없다 왜냐면 에러가 남
// 두 개의 병렬 페이지가 있다고 나옴
// 이유는 보이지 않는 tab 을 갖고 있기 때문
// app/products/page 도 있고 app/products/page 도 갖고 있다

// ✨ 상세 화면에 탭바가 나오길 원하지 않으니 app/products 폴더 따로 만듦
async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

// Next.js는 route 를 통해서 id 라는 parameter 를 제공해줌.
// 그래서 여기서 parameter 를 가져올 수 있다. 그리고 id 를 가져옴
// 그리고 parameter 는 id 를 갖고 있고 string 이라고 타입스크립트에게 알려줌
// skeleton 만들어 줌
export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct();
  return <span>Product detail of the product {id}</span>;
}
