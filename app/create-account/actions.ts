// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-0. Introduction to Zod

// // 🔶 zod 유효성 검사 라이브러리 사용
// // 사용자가 Server action 으로 보내는 데이터의 유효성 검사에 도움을 줌
// // Zod 를 사용할 때 Zod 에게 데이터의 형태와 제한을 설명

// // 🔶 첫 번째로 form에서 여기로 모든 item을 가져온다
// // formData로부터 username을 가지고 와서 data의 usernmae에 넣는다

// // if(data.username !=) 이런 방식 원하지 않음
// // ❓ 그럼 Zod 를 사용한 유효성 검사는 어떻게 ?
// // 데이터가 어떤 형태여야 하는지 정의해야 한다 (ex. username 은 string 이어야 하고.. )
// // Zod가 나중에 if, else같은 것을 해줌
// // Zod에게 데이터의 형태나 타입을 설명할 때, 무언가를 설명할 때는 스키마(Schema)를 만든다
// // Schema는 데이터가 어떻게 생겨야 하는지, 타입은 무엇인지 알려주는 설계도 같은 것

// // if, else, throw error 등 아무것도 쓰지 않았는데 zod 를 통해 에러를 볼 수 있다

// 'use server';
// import { z } from 'zod';

// // 🔹 Schema
// // 🔹 데이터 조건 설명
// const usernameSchema = z.string().min(5).max(10);

// export async function createAccount(prevState: any, formData: FormData) {
//   // 🔹 유효성 검사하고 싶은 data object
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };
//   // console.log(data);

//   // 🔹 여기에 검사하고 싶은 데이터를 넣으면 됨
//   // 그러면 zod 가 schema 를 보고 사용자가 작성한 값이 형태에 맞는지 검사함
//   usernameSchema.parse(data.username);
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-1. Validation Errors
// 모든 값 검사하기
// 데이터 검증 에러를 다루는 방법

'use server';
import { z } from 'zod';

// ✨ data object 의 각 item 마다 검사할 필요는 없다
// object 형태를 넣을 수 있음
const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  // 🔹 parse
  // : 데이터 유효성 검사가 실패하면 에러를 throw 한다
  // 그래서 parse를 쓸 때는 항상 try catch를 써야 함

  // 🔹 psafeParse
  // : 에러를 throw 하지 않는다
  // 대신에 유효성 검사의 결과를 얻는다
  // try catch 를 할 필요가 없고, 에러를 throw 할 것인지 선택 가능
  // 에러를 사용자에게 return 할 수 있다

  // 🔹 pflatten
  // flatten을 쓰고 유효하지 않는 form을 다시 보냈을 때
  // 조금 더 간단하게 나옴
  // 그래서 error를 더 잘 관리할 수 있게 해준다

  // ✨ parse
  // ✨ formSchema.parse(data)
  // formSchema.parse 를 실행하면서 유효하지 않는 data 를 넘기면 zod 가 에러를 발생시킴
  // 에러 메세지에는 form item 들의 개별적인 에러가 들어있음
  // 이 에러는 try-catch 문으로 잡을 수 있음
  // 이러면 하얀 에러 화면에 안뜨고 에러를 잡아서 콘솔로그 터미널에서 확인 가능

  // try {
  //   formSchema.parse(data);
  // } catch (e) {
  //   console.log(e);
  // }

  // ✨ safeParse
  const result = formSchema.safeParse(data);
  // 결과가 나타남
  // 에러를 사용자에게 return
  console.log(result); // { success: false, error: [Getter] }

  if (!result.success) {
    // 에러를 return 하는 것은 엄청 간단하다
    // form 의 stat 로 전달 될 것이다
    // 그럼 UI 에서 표시할 수 있다
    // 하지만 error에는 많은 property와 method가 있는데
    // flatten 을 씀
    // flatten 을 쓰기 전에는 엄청 큰 object 로 볼 수 있음
    // 하지만 flatten 을 쓰고 유효하지 않는 form 을 다시 보내면
    console.log(result.error.flatten());
    // 간단하게 나옴
    // fieldErrors: {
    //   password: [ 'String must contain at least 10 character(s)' ],
    //   confirm_password: [ 'String must contain at least 10 character(s)' ]
    return result.error.flatten();
  }
}
