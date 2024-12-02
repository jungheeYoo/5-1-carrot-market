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

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-2. Skeletons
// 🔶 products page 작업
// 먼저 loading State 를 위한 skeleton 을 만들고
// 데이터베이스를 조회해 상품들을 보여주고 그 다음 무한 스크롤링 만들 예정

// 그러기 위해서는 products 를 async 함수로 변환함
// 그리고 getProducts async 함수 만듦
// 실제로 가진 product 정보를 다루는 것은 나중에..
// promise 를 함으로스 next.js 는 이 페이지가 기다려야 한다는 것을 알고 있음
// 이 점을 활용해서 products 밑에 loading.tsx 파일 만듦
// ✨ loading 파일은 매우 중요
// next.js 가 products 페이지가 로딩중일 때 loading component 를 사용할 것이기 때문

async function getProducts() {
  // resolve : promise 를 종료한다는 의미
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function products() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-white text-4xl">Products!</h1>
    </div>
  );
}
