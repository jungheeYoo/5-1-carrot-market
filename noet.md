# 캐럿마켓 클론코딩

## Set up (셋업하기)

- 원하는 루트 폴더에 명력어 입력
- 설치 실행하고 폴더명 정해줌

```
npx create-next-app@latest
```

- 해당 폴더로 이동 후 페이지 실행

```
npm run dev
```

- page 파일로 가서 return 안에 내용 삭제 main 만 남겨둠
- import Image from 'next/image'; 삭제
- globals.css 내용 삭제 얘만 남겨둠

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- 깃허브와 연동

```
git remote add origin [레포 주소]
```

- tailwind.config.ts 파일에서 삭제

```
extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
```

<br/>
<br/>
<br/>

---

## Route Handlers - route.ts

- NextJS 에서
- page.tsx 나 layout.tsx 정해진 이름처럼 route.ts 정해진 이름
- route.ts 라는 파일을 생성하면 NextJS에게 이 파일이 API라고 알려줌
- page.tsx 는 리액트 컴포넌트를 렌더링 한다
- route.ts 는 리액트 컴포넌트를 렌더링 하는 것이 아니고, HTTP 요청을 받아서 json 같은 것을 반환하거나 아니면 사용자를 다른 어디가로 이동 시킴
- 핵심은 route.ts는 UI를 렌더링하지 않음. 렌더링을 할 때는 page 파일 사용
  <br/>
  <br/>
  <br/>

### 여러 HTTP Method 처리하는 방법

- GET 요청

  - 우리가 request의 method를 검증할 필요 없다
  - request 가 GET을 보낸 건지 POST 하는 건지 전혀 확인할 필요 없다
  - 대신 함수 이름을 GET으로 지어주면
  - 그 안의 코드는 자동으로 GET request를 처리함
  - 그리고 request 를 들여다 보면 사용자의 모든 정보를 확인할 수 있음
    <br/>
    <br/>

- POST 요청
- 사용자가 로그인을 하기 위해서는 사용자가 form을 제출하면 우린 POST 요청을 받아야 한다
- 그리고 데이터를 얻기 위해서는 request의 body를 읽어야 함
- 이론적으로 그 데이터는 프론트엔드에서 리액트 fetch 함수 같은 것을 사용해서 보낸 데이터일 것임

<br/>
<br/>
<br/>

---

## Server Actions

- NestJS 는 POST method를 위한 route 핸들러를 만든다는 뜻
- 인라인 Server Action
- component 안에 작성한다
- 인라인 Server Action을 작성하기 위해서는 함수를 만들고 use server를 최상단에 적어주면 됨.
- 그럼 인라인 Server Action이 만들어지고 form의 action 속성에 즉시 추가해서 사용할 수 있다
  <br/>
  <br/>

### 넘겨진 데이터 가져오는 방법

- Server action 을 만드는 순간, () 여기서 데이터를 받을 수 있다
- 데이터 타입은 FormData
- 이건 FormData constructor 내부에서 오는 것
- 이름은 상관없고 타입은 FormData 이어야 함
- Server Actions 에서 input 에는 name 속성이 필요
  <br/>
  <br/>

### 'use server';

- use server는 이 함수가 서버에서만 실행되도록 만들어 줌
- 이 함수는 비동기 함수여야함
- server component 안에서만 작동 함

```javascript
export default function Login() {
  // Server action
  async function handleForm(formData: FormData) {
    // const handleForm = async() =>
    'use server';
    console.log(formData.get('email'), formData.get('password'));
    console.log('i run in the server baby!');
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
```

<br/>
<br/>
<br/>

---

## useFormStatus

- 로그인 시 사용자에게 Server Aciton에 시간이 좀 걸린다는 것을 알려주고
- 로그인 버튼 비활성화 함
- ReactJS에는 form action의 작업 상태를 알려주는 hook이 있음
- 마찬가지로 NextJS에서도 useFormStatus 가 있음

### useFormStatus

- 이 hook은 자신의 부모 components를 보고, 가장 가까운 부모 form을 찾으려고 함
- 그래서 useFormStatus는 form이 작성 된 components 에서는 사용할 수 없다
- form의 자식 요소 안에서 사용해야 함
- 그리고 그 부모 form의 상태를 알려줌
- useFormStatus는 우리에게 form이 pending인지 아닌 지 알려주고
- action이 로딩중인지 알려주고 이걸 이용해서 버튼을 비활성화 시킬 수도 있다
- 이 hook을 사용하면서 component를 interactive하게 만들기 때문에
- useFormStatus를 사용할 때는 최상단에 use client를 적어줘야 함
  <br/>
  <br/>
- 객체를 반환하고, 이 객체는 여러 속성을 갖고 있음
- action : 어떤 action 이었는지를 알려줌
- data : 전송된 데이터를 알려줌
- method
- pending : 가장 중요! pending 상태인지를 알려주는데, function 이 끝난 여부를 알려줌
  <br/>
  <br/>
- ❗ pending 주의
- const { pending } = useFormStatus();
- 이 hook은 action을 실행하는 form 과 같은 곳에서 사용할 수 없다
- 이 hook은 form의 자식에서만 사용할 수 있다
- 즉 form의 상태에 따라 변경하고자 하는 component 내부에서 사용해야한다
- useFormStatus 사용하기 위해서는 client component로 바꿔야 함
- 왜냐하면 client component는 interactive 하다
- 지금 사용하는 버튼은 form이 pendimg 될 때, 즉 action이 pending 될 때 비활성화될거니까 이건 client component가 되어야 함
  <br/>
  <br/>
  ```
  // 부모
  <form action={handleForm} className="flex flex-col gap-3">
  ```
- 이 hook은 자동으로 부모 form을 찾음
- 여기 action이 pending 상태인지를 자동으로 알아냄
- 로딩중인지, 작업이 끝났는지를 자동으로 알아냄

<br/>
<br/>
<br/>

---

## useFormState

- action의 결과를 알기 위해, useFormState hook을 사용
- 이 hook은 action을 인자로 받아서 그 action의 트리거를 돌려줌
- 배열의 두 번째 아이템으로 트리거를 돌려줌
- 그리고 그 트리거를 통해 action을 실행하면 이 hook은 실행한 action을 지켜보고
- action의 결과를 여기 state에 담아서 돌려 줌. 배열의 첫 번째 요소로 돌려줌+
- useFormState는 배열을 return 하는데 배열의 첫 번째 아이템은 action이 반환하는 값이고
- 두 번째 아이템은 action을 실행하는 트리거이다
  <br/>
  <br/>
- 우린 hook을 사용하고 있고
- 우리의 UI가 action이 return 한 새로운 state로 업데이트 되길 원하기 때문에
- 이 component를 client component로 만들어야 함
- 우리가 이걸 client component로 변경하면
- 인라인으로 작성한 Server Action은 더이상 사용할 수 없다
- client component로 안에서는 그렇게 할 수 없음. 그래서 새로운 파일을 만듦
- 이 파일은 use server로 시작해야한다. 그럼 NextJS에게 이 코드가 서버에서만 실행되어야 하는 action이라고 알려줄 수 있다
- <br/>
  <br/>
- useFormState hook을 사용하고 있기 때문에
- 우리가 만든 handleForm 은 formData 뿐만 아니라 action의 이전 state 값과 함께 호출 된다
- useFormState 를 이용해서 처음 action을 호출하면
- 이 action은 초기 상태인 null과 함께 호출 된다. 그리고 formData도 같이 호출된다
- 그리고 다시 호출하면 action은, 이전에 return한 값과 formData와 함께 호출 된다
- <br/>
  <br/>
- Server Action에서 오류가 발생한다면? 아이디나 비밀번호가 틀렸다면? 이럴 때 useFormState hook을 사용
- 이 hook을 사용하기 위해서는 결과를 알고 싶은 action을 인자로 넘겨줘야 함
- 그리고 이 hookr을 쓴다는 것은 UI를 interactive 하게 만들겠다는 것이다
- 왜냐하면, 사용자에게 에러 메세지를 보여주길 원하니까
- 따라서 이것을 client component로 바꿔줘야 한다
- 그리고 client component 안에서는 use server를 선언할 수 작동할 수 없다
- 그래서 action.ts 새로운 파일 만들어서 옮겨 줌
- client component 에서도 Server Action을 호출할 순 있지만
- 그 로직이 여기에 있을 수는 없다. 여기에 바로 적을 수는 없다
- use server로 시작하는, 분리된 파일에 있어야 함
- use server 에 있는 모든 함수들은 전부 서버에서 실행 됨
- useFormState를 쓸 때 실행하고자 하는 action을 전달하는 것 뿐만 아니라
- (useState에 초기 값을 넘겨줄 수 있는 것처럼)
- useFormState에도 초기값도 필수적으로 넘겨 줘야 함
- 보통은 null을 넘김
  <br/>
  <br/>
- action은 formData와 함께 호출되는데
- 처음에는, 초기 값 state와 함께 호출되고
- 다음부터는 이전 action에서 return된 state와 함께 호출 됨
  <br/>
  <br/>
  <br/>

---

## 정리

- 여기서는 state를 조작하거나 onChange 같은 이벤트 핸들러는 없다
- 사용자가 UI를 통해 입력한 데이터는 내가 작성한 action의 formData 로만 간다
- input에 name 값이 있다면
- 모든 input에 name 속성을 설정해야 한다
- 그렇게 하지 않으면, action에 필요한 data가 formData에 포함되지 않음
- 이 name은 ReactJS의 기능이 아닌 HTML이다
- input에 name을 주지 않으면 action이 formData에 그 입력값들이 들어있지 않음
  <br/>
  <br/>
  <br/>

---

## Prisma ORM

- Prisma 는 통역사
- Object Relational Mapping

### set up

- npm i prisma
- npx prisma init
- .env 파일을 .gitignore 안에 꼭 있어야 함
  - 나중에 DB URL을 private로 바꾸게 된다면 비공개로 하기 위해서
- .env 파일 수정 - DATABASE_URL="file:./database.db" database이름은 원하는대로. 노출되면 안되는 DB URL
- schema.prisma 파일에서 postgresql을 사용하지 않을거라고 알려야 함. SQLite DB 사용할 것임. 이것은 로컬 DB이다. 우리 데이터가 DB안에서 어떤 형태로 저장되어야 하는 지를 설명
- provider = "sqlite" 수정

```javascript
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

- 첫 번째는 우리 DB가 어디있는지, 두 번째는 어떤 DB를 사용할 것인지

- Prisma Client 만들기
- npx prisma migrate dev
- 로컬 DB이기 때문에
- database.db, database.db-journal 깃 커밋에 포함시키지 않음
- _.db, _.db-journal 추가

```
# typescript
*.tsbuildinfo
next-env.d.ts
*.db
*.db-journal
```

- Prisma Client
- Prisma Client는 데이터에 맞춰 자동 생성되는 type-safe 쿼리 빌더입니다.
- npm install @prisma/client

- npx prisma studio

* 플러그인 prisma 다운
  cmd + shift + p로 JSON settings 파일을 열고

"[prisma]": {
"editor.defaultFormatter": "Prisma.prisma"
}
추가하면 save시 릴레이션 자동완성 됩니다.

### Prisma Studio 열 때

- 먼저, NextJS 서버를 끄지 않도록 주의한다
- 분리된 탭에서 Prisma Studio를 열어야 한다
- 또는 schema.prisma 파일을 변경하고 싶다면, 새로운 사용자를 추가하거나, 새로운 모델을 만드는 것과 같은 것들을 하고 싶다면
- schema.prisma 파일을 수정하고 migrate한 다음
- 변경사항을 Studio에 반영하고 싶다면
- Studio를 먼저 끄고 다시 시작하는 것을 추천
- 왜냐하면, schema를 변경하고 그걸 적용하기 위해 마이그레이션 명령어를 실행한 다음 Studio를 새로고침 했을 때 변경사항을 확인하지 못하는 경우가 있다. 그럼 뭔가 문제가 생겼다고 생각한다. 하지만 실제로는 이걸 껐다가 다시 켜야 함. 그러면 Studio에 내가 만든 새로운 모델이나 컬럼같은 것들이 반영 될 것이다
  <br/>
  <br/>
  <br/>

---

## Password Hashing

- 비밀번호를 해싱할 수 있게 해주는 패키지
- npm i bcrypt

- npm i @types/bcrypt
- 이 패키지에 대한 타입스크립트 definition을 얻을 수 있음
  <br/>
  <br/>
  <br/>

---

## Iron Session

- npm i iron-session
  <br/>
  <br/>
  <br/>

---

## React Hook Form

- npm i react-hook-form
- npm i @hookform/resolvers
  - Zod schema를 사용해서 form을 validation할 수 있게 해줌
