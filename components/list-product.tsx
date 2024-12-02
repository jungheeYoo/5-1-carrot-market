//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-3. Product Component

import Link from 'next/link';
import Image from 'next/image';

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    // 이 Link 는 아직 만들지 않은 URL 로 이동
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {created_at.toString()}
        </span>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </Link>
  );
}

// ⚡ NextJS에 있는 Image component
// /orange.jpg 이런 이미지 URL 과 함께 Image component 를 사용할 때
// Image가 얼마나 커질 수 있는지 사전에 Next.js 에게 말해야 함
// 왜냐면 이걸 한다면 Next.js 가 기본적으로 나의 Image 에 대한 일종의 placeholder 를 만들어 주기 때문
// Next.js 는 image loading 을 optimize 할거고 placeholder 를 생성한다
// 그래서 image 가 로딩되는 동안에는 component 또는 image 주변의 content 는 위치가 바뀌지 않음
// 예를 들면 웹사이트에서 텍스트가 화면 상단에 있을 수도 있고, image 가 load 될 때 text 가 화면 하단으로 밀릴 수 있다. 이런걸 Layout Shift(사진이 이동되는) 라고 한다.
// 이런 현상을 막기 위해 Next.js 가 이것을 권장하는 것
// HTML 태그인 imag tag를 쓰려고 하면, Next.js는 Image component를 사용하는게 더 좋다고 뜸
// 왜냐하면 자동으로 image를 최적화 함. image를 optimize 함
//  Layout Shift 를 방지하는 하나의 방법으로 image 의 width, height 가 얼마인지 알려주는 것
// 이렇게 하면 Next.js 가 page 에 placeholder 를 만들어줌
// 그래서 image가 load할 때 컴포넌트 주변은 위치가 바뀌지 않고,
// page의 content가 아무렇게나 움직이지 않을 것이다.
// Next.js 는 image 를 가져갔다. 콘솔로 찍어보면 optimize 되어 있다. 많은 작업을 함
// loading="lazy" 하도록 만듦. 이건 오직 유저가 보고 있는 동안에만, 보려고 할 때만 load 된다는 말
// 만약 수백기의 product 가 있다고 하면 loading="lazy 는 broswer 가 그 image 를 전부 download 하지 않게 함
// 오직 User 가 image 를 보려고 할 때만 download 를 함. 이건 Next.js 에 의해 자동으로 추가 됨
// srcset 은 다른 스크린 해상도 일 때 다른 image 를 보여줄 수 있도록 허용하는 attribute(속성)이다. 자동으로 됨. 할 일은 User 를 위해 image 가 얼마나 큰지 Next.js 에게 알려주면 된다.
// 그러면 Next.js 는 loading 을 추가하고, optimization 해줌
// style='color:transparent' : image 가 load 되는 동안 기본적으로 transparent(투명한) 박스 invisible 박스를 갖게 됨. 알려주기만 하면 된다
// 하지만 image 가 픽셀 사이즈로 얼마나 커질지 모를때가 있다. 얼마나 큰지 모르는 경우에는
// 가로, 세로 없애고 fill 씀.
// fill property(속성) 은 Boolean 이다. 이것은 부모 element 를 image 로 가득 채우는 것
// 이건 widht, height 을 모를 때 굉장히 유용하다
// default 로 image element 는 자동으로 position : absolute 로 지정 됨
// 그래서 부모에 가서 relative 해줌
