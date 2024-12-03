/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

//////////////////////////////////////////////////
// ✅ 2024 Products
// ✅ 10-6. Image Hostnames
// 이 도메인을 가진 이미지를 image 컴포넌트로 최적화 시키기

// user 가 image 에 URL 을 업로드할 수 있도록 허용된 경우, image component 를 사용하여 해당 이미지를 표시한다
// 다시 말해, user 가 업로드한 image 들을 최적화 하는 것이다
// 이것이 큰 비용을 발생시킬 수 있다
// 고객들이 엄청 많은 이미지를 업로드하고 보여주게 되면 엄청 많은 돈을 내야 하니까
// 최적화에 대한 비용을 지불한다는 뜻이다
// 왜냐하면, image component 는 그것들을 자동으로 최적화할 것이기 때문이다
// user 가 URL 들을 업로드하도록 허용하고 이미지로 보여주게 되면 최적화에 대한 비용르 지불하게 됨
// 이런 일이 발생하지 않도록 이미지를 최적화하려는 URL 과 그렇지 않은 URL 을 구체적으로 지정할 수 있다
// next.configure.js 파일에서 이를 구체화 해야함
// 이 도메인을 가진 이미지를 image comoponent 로 최적화시켜달라고 하는 것
// NextJS의 Image는 이미지를 자동으로 최적화를 해 주어 성능을 향상시키고 빠른 로딩이 되도록 해준다.
// 하지만 외부 호스트의 이미지(다른 사이트의 이미지 링크 등)를 불러올 때는 보안 상의 이유로 이 기능이 허용되지 않는다.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
