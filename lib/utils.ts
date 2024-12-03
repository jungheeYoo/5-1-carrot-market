//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-4. Detail Skeleton

// 🔶 날짜 형식
export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  // 🔹 time, now 둘 의 차이 계산
  // 며칠 전인지 알아야 하므로 나눔
  // 하루가 몇 밀리초인지 알아내야 함 -> dayInMs
  const diff = Math.round((time - now) / dayInMs);

  // ⚡ Intl : 다국어 지원 , 국제화와 관련된 API
  // 이건 -3일을 3일전으로 바꾸는 것이다
  // 포맷팅된 숫자를 원함. 일,시간,분 선택 할 수 있음
  const formatter = new Intl.RelativeTimeFormat('ko');

  return formatter.format(diff, 'days');
}

// 🔶 가격 형식
export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}
