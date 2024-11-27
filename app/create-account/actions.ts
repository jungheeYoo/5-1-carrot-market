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

// //////////////////////////////////////////////////
// // ✅ 2024 UPDATE Validation
// // ✅ 6-1. Validation Errors
// // 모든 값 검사하기
// // 데이터 검증 에러를 다루는 방법

// 'use server';
// import { z } from 'zod';

// // ✨ data object 의 각 item 마다 검사할 필요는 없다
// // object 형태를 넣을 수 있음
// const formSchema = z.object({
//   username: z.string().min(3).max(10),
//   email: z.string().email(),
//   password: z.string().min(10),
//   confirm_password: z.string().min(10),
// });

// export async function createAccount(prevState: any, formData: FormData) {
//   const data = {
//     username: formData.get('username'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirm_password: formData.get('confirm_password'),
//   };

//   // 🔹 parse
//   // : 데이터 유효성 검사가 실패하면 에러를 throw 한다
//   // 그래서 parse를 쓸 때는 항상 try catch를 써야 함

//   // 🔹 psafeParse
//   // : 에러를 throw 하지 않는다
//   // 대신에 유효성 검사의 결과를 얻는다
//   // try catch 를 할 필요가 없고, 에러를 throw 할 것인지 선택 가능
//   // 에러를 사용자에게 return 할 수 있다

//   // 🔹 pflatten
//   // flatten을 쓰고 유효하지 않는 form을 다시 보냈을 때
//   // 조금 더 간단하게 나옴
//   // 그래서 error를 더 잘 관리할 수 있게 해준다

//   // ✨ parse
//   // ✨ formSchema.parse(data)
//   // formSchema.parse 를 실행하면서 유효하지 않는 data 를 넘기면 zod 가 에러를 발생시킴
//   // 에러 메세지에는 form item 들의 개별적인 에러가 들어있음
//   // 이 에러는 try-catch 문으로 잡을 수 있음
//   // 이러면 하얀 에러 화면에 안뜨고 에러를 잡아서 콘솔로그 터미널에서 확인 가능

//   // try {
//   //   formSchema.parse(data);
//   // } catch (e) {
//   //   console.log(e);
//   // }

//   // ✨ safeParse
//   const result = formSchema.safeParse(data);
//   // 결과가 나타남
//   // 에러를 사용자에게 return
//   console.log(result); // { success: false, error: [Getter] }

//   if (!result.success) {
//     // 에러를 return 하는 것은 엄청 간단하다
//     // form 의 stat 로 전달 될 것이다
//     // 그럼 UI 에서 표시할 수 있다
//     // 하지만 error에는 많은 property와 method가 있는데
//     // flatten 을 씀
//     // flatten 을 쓰기 전에는 엄청 큰 object 로 볼 수 있음
//     // 하지만 flatten 을 쓰고 유효하지 않는 form 을 다시 보내면
//     console.log(result.error.flatten());
//     // 간단하게 나옴
//     // fieldErrors: {
//     //   password: [ 'String must contain at least 10 character(s)' ],
//     //   confirm_password: [ 'String must contain at least 10 character(s)' ]
//     return result.error.flatten();
//   }
// }

//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-2. Refinement

// 🔶 에러 메세지를 커스터마이징하는 방법
// 에러 메세지에 원하는 메시지를 보여줄 수 있도록
// 🔶 각 필드의 고유한 validator 만드는 방법
// 예를 들면,username 이 특정 단어를 포함할 수 없도록 하는 validator 를 만든다
// 🔶 두 필드를 함께 검증하는 방법.
// password 가 confirm_password 와 동일한지 확인하는 방법

'use server';
import { z } from 'zod';

// 🔹 checkUsername 함수 따로 만듦
// 🔹 checkPasswords 함수 따로 만듦
const checkUsername = (username: string) => !username.includes('potato');
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    // 🔶 에러 메세지를 커스터마이징하는 방법
    // method 들 위에 마우스를 올려보면 여러 가지 파라미터를 받는 것을 확인할 수 있다
    // 예를 들면, string method 는 여러 개의 method를 받는데 그 중에 가장 중요한 것은
    // invalid_type_error, required_error 이다
    // invalid_type_error 은 string을 예상했는데 유저가 number를 보내거나 할 때 나타남
    // required_error 는 유저가 username을 아예 보내지 않는 경우이다

    // 기본적으로 이렇게 적으면 nusername이 필수라는 의미. required라고 명시할 필요가 없다
    // string 이 올 거라고 예상한다는 건, 그 값이 필수라는 것과 마찬가지이다
    // required가 되는걸 원치 않으면, optional을 붙이면 됨
    // username: z.string().min(3).max(10).optional(),
    // min 위에 마우스를 올려보면, minLength 를 보내야하고 message 도 보낼 수 있다
    username: z
      .string({
        invalid_type_error: 'Username must be a stirng',
        required_error: 'Where is my username???',
      })
      .min(3, 'Way too short!!!')
      .max(10, 'That is too loooooog!')

      // 🔶 내가 직접 만든 로직으로 각각의 필드를 검정하는 방법
      // 예를 들어, username 에 'potato' 라는 단어가 포함되는 것을 허용하지 않는다고 가정
      // 그러기 위해서는 .refine() 사용

      // .refine()
      // refine에는 check function 을 넣을 수 있다
      // 이 함수가 true를 return 하면 에러가 없다
      // 하지만 함수가 false를 return 하면, 그때 유저에게 보여줄 메세지를 작성할 수 있다

      // 그럼 작성할 함수의 첫 번째 argument(인자)는 현재 검증 중인 값으로, 여기서는 username
      // 그러니 여기서 검증할 username 을 받고 여기서 true 을 리턴하면 에러가 나지 않을 테니
      // .refine(username =< true, 'custom error') 적고 보면
      // true 를 return 했기 때문에 에러가 없다. 메세지 안나옴
      // 하지만 false 를 return 하면 custom error 가 나타남
      // 이제 여기서 username 에 potato 가 포함되어 있는지 확인할 수 있는데
      // .refine((username) => (username.includes("potato")? false: true), "No potatoes allowed!"),
      // 가독성을 높이기 위해서 함수 따로 뺌
      // refine 안에 작성한 함수가 true를 리턴하면 문제가 없다는 뜻
      // false를 리턴하면 문제가 있다는 뜻이고, 유저에게 이 에러 메세지가 표시 된다.
      // zod 가 checkUsername() 이 함수를 받아서 호출할거고, 검증해야 할 username 을 checkUsername(여기에) 넣어줌
      // 🔹 함수 따로 만듦
      .refine(checkUsername, 'No potatoes allowed'),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  // 🔹 함수 따로 만듦
  .refine(checkPasswords, {
    message: 'Both passwords should be the same!',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());

    return result.error.flatten();
  }
}

// 🔶 password 가 confirm_password 와 동일한지 검증
// 만약 이렇게 하면 password: z.string().min(10).refine(), 패스워드만 받아서 refine 하게 된다.
// 이번엔 두 가지를 같이 가져오고 싶다. 비밀번호와, 비밀번호확인을 받아서 함께 검증해야 한다.
// 그러니 refine 을 여기에 쓰지 않고, object 전체를 refine 한다.
// 이러면 object 안의 모든 필드를 validation 할 수 있도록 한다.
// .refine(()) 여기에 이렇게 괄호를 입력하면 refine 함수의 첫 번째 argument 를 확인 할 수 있는데, 여기 있는 zod object 를 refine 한다고 함
// 첫 번째 argument 에 필요한 모든 것이 들어있다
// .refine(({})) 여기서 중괄호를 열고 password 와 confirm_password 를 가져올 수 있다
// 이제 여기서 조건문을 return 해주기만 하면 됨.
// password 와 confirm_password 가 동일한지 확인하면 끝이다.
// .refine(({password, confirm_password}) => password === confirm_password, 'Both passwords should be the same!')
// 여기서 true 를 return 하면 문제가 없다는 거고, 여기서 false 를 return 하면,
// Both passwords should be the same! 메세지 작성
// 여기서 문제는, 이렇게만 하면 이 메세지 에러가 form 에 나타나지 않음
// checkPasswords 가 false 를 리턴하면 이 에러 메세지가 보일 것임
// 하지만 문제는, 이 에러가 어디에 나타날까?
// 다른 에러는 나오는데 나타나지 않음. 콘솔을 보면 zod 가 이 에러는 특정 필드에 속하지 않는다고 판단했다고 나옴
// 대신 form 전체와 관련있다고 본다. 왜냐하면 여기서 이 object 전체를 refine 했으니까
// 여기 있는 refine 이 하는 일은 이 object 안에 있는 걸 전부 다 검증한다
// 그래서 이 refine에서 에러가 발생한다면 zod는 그게 global 에러라고 생각한다. form 전체 관한 에러라고 생각함.
// 하지만 우리가 원하는 것이 아니고 'Both passwords should be the same!' 이 메세지는
// confirm_password 에 나타나야 한다.
// 그러니 zod에게 확실히 알려줘야 한다.
// 이 에러는 confirm_password 라는 특정 필드에 속한 것이라고 말해 준다.
// 그렇게 하려면 여기서 string 으로 보내지 말고
// object를 만들어서 message를 넣은다음, zod에게 이 에러의 주인이 누군지 알려줌
// path: ['cofirm_password'],
// 이제 zod가 이 refine을 실행할 때 메세지를 표시해야 하는 경우 이 에러는 confirm_password 에러처럼 나타날 것이다.
// 이 path 는 field 이름과 동일해야 함
