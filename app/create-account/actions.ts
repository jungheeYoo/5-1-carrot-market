//////////////////////////////////////////////////
// ✅ 2024 UPDATE Validation
// ✅ 6-0. Introduction to Zod

// 🔶 zod 유효성 검사 라이브러리 사용
// 사용자가 Server action 으로 보내는 데이터의 유효성 검사에 도움을 줌
// Zod 를 사용할 때 Zod 에게 데이터의 형태와 제한을 설명

// 🔶 첫 번째로 form에서 여기로 모든 item을 가져온다
// formData로부터 username을 가지고 와서 data의 usernmae에 넣는다

// if(data.username !=) 이런 방식 원하지 않음
// ❓ 그럼 Zod 를 사용한 유효성 검사는 어떻게 ?
// 데이터가 어떤 형태여야 하는지 정의해야 한다 (ex. username 은 string 이어야 하고.. )
// Zod가 나중에 if, else같은 것을 해줌
// Zod에게 데이터의 형태나 타입을 설명할 때, 무언가를 설명할 때는 스키마(Schema)를 만든다
// Schema는 데이터가 어떻게 생겨야 하는지, 타입은 무엇인지 알려주는 설계도 같은 것

// if, else, throw error 등 아무것도 쓰지 않았는데 zod 를 통해 에러를 볼 수 있다

'use server';
import { z } from 'zod';

// 🔹 Schema
// 🔹 데이터 조건 설명
const usernameSchema = z.string().min(5).max(10);

export async function createAccount(prevState: any, formData: FormData) {
  // 🔹 유효성 검사하고 싶은 data object
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  // console.log(data);

  // 🔹 여기에 검사하고 싶은 데이터를 넣으면 됨
  // 그러면 zod 가 schema 를 보고 사용자가 작성한 값이 형태에 맞는지 검사함
  usernameSchema.parse(data.username);
}
