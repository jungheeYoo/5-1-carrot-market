//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-2. Skeletons
// 🔶 products page 작업
// 먼저 loading State 를 위한 skeleton 을 만들고
// 데이터베이스를 조회해 상품들을 보여주고 그 다음 무한 스크롤링 만들 예정

// skeleton : 로딩중일 때 보여주는 component
// database 가 load 되는 것을 기다리고 있을 때 User 가 보게 될 화면

export default function Loading() {
  return (
    // 🔹 많은 product 를 보여주기 위해 component 10번 복제
    // [...Array(10)] : 10 개의 item 이 있는 empty array 가 생성됨
    <div className="p-5 animate-pulse flex flex-col gap-5 ">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className=" size-28 rounded-md bg-neutral-700" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-20" />
            <div className="bg-neutral-700 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
