//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-1. Tab Bar
// 탭바 만들기 위해 폴더 생성 및 그룹핑

import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}

// 🔥 정리
// 모두 같은 navigation bar를 를 공유하고 있다.
// 이 모든 route는 같은 navigation bar를 공유하고 있다.
// 왜그럴까 ? navigation bar를 layout에 두었기 때문이다.
// 만약 tab group 내에 layout 을 둔다면
// 그건 layout 이 auth 그룹 안의 모든 페이지로부터 영향을 받지 않는다는 말이다.
// layout 을 한 그룹에 두면 이 layout은 다른 그룹의 영향을 받지 않게 된다.
// 이것은 일종의 bubble 같은 것이 된다. 이건 독립적인 것이다. (로그인 페이지등에서 안보임)
// 따라서 이 layout은 오직 여기 page에만 영향을 준다.
