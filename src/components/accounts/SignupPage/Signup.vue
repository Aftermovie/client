<template>
  <form @submit.prevent="handleSubmit">
    <label>Name:</label>
    <input type="text" required v-model="name" />

    <label>Email:</label>
    <input type="email" required v-model="username" />

    <label>Password:</label>
    <input type="password" required v-model="password" />

    <label>Password Confirm:</label>
    <input type="password" required v-model="passwordConfirmation" />
    <div v-if="passwordError" class="error">{{ passwordError }}</div>

    <div class="terms">
      <input type="checkbox" v-model="terms" required />
      <label>Accept terms and condition</label>
    </div>
    <br />
    <p>좋아하시는 분류의 영화를 골라주세요.</p>
    <hr />
    <div>
      <input type="checkbox" value="1" v-model="preferredGenre" />
      <label>액션</label>
    </div>
    <div>
      <input type="checkbox" value="3" v-model="preferredGenre" />
      <label>애니메이션</label>
    </div>
    <div>
      <input type="checkbox" value="4" v-model="preferredGenre" />
      <label>코미디</label>
    </div>
    <div>
      <input type="checkbox" value="5" v-model="preferredGenre" />
      <label>범죄</label>
    </div>
    <div>
      <input type="checkbox" value="9" v-model="preferredGenre" />
      <label>판타지</label>
    </div>
    <div>
      <input type="checkbox" value="10" v-model="preferredGenre" />
      <label>역사</label>
    </div>
    <div>
      <input type="checkbox" value="11" v-model="preferredGenre" />
      <label>공포</label>
    </div>
    <div>
      <input type="checkbox" value="14" v-model="preferredGenre" />
      <label>로맨스</label>
    </div>
    <div>
      <input type="checkbox" value="15" v-model="preferredGenre" />
      <label>SF</label>
    </div>
    <div>
      <input type="checkbox" value="17" v-model="preferredGenre" />
      <label>스릴러</label>
    </div>
    <div class="error" v-if="error">{{ error }}</div>

    <div class="submit">
      <button>Create an Account</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore, ActionTypes } from "@/store";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Signup",
  setup() {
    const name = ref<string>("");
    const username = ref<string>("");
    const password = ref<string>(""); // 숫자 타입을 허용할지 말지에 대해 추가적인 논의가 필요.
    const passwordConfirmation = ref<string>("");
    const passwordError = ref<string>("");
    const terms = ref<boolean>(false);
    const preferredGenre = ref<Array<number>>([]);
    const error = ref<string>(" ");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      passwordError.value =
        password.value.length > 5
          ? ""
          : "비밀번호는 최소 6글자 이상이어야 합니다.";

      passwordError.value =
        password.value === passwordConfirmation.value
          ? ""
          : "비밀번호와 비밀번호 확인이 다릅니다.";

      // there is no error.
      const userInformations = {
        name: name.value,
        username: username.value,
        password: password.value,
        genres: preferredGenre.value,
      };

      const SERVER_URL_SIGNUP = `${process.env.VUE_APP_SERVER_URL}/accounts/signup/`;

      if (!passwordError.value) {
        try {
          console.log(SERVER_URL_SIGNUP);
          console.log(userInformations);
          const response_signup = await axios.post(
            SERVER_URL_SIGNUP,
            userInformations
          );
          console.log(response_signup);
          const credential = {
            username: username.value,
            password: password.value,
          };
          const response_login = await store.dispatch(
            ActionTypes.GET_JWT,
            credential
          );
          console.log(response_login);
          router.push({
            name: "Home",
          });
        } catch (err) {
          const response = err.response;
          console.log(response);
          // console.log(err.response.data.message);
          // error.value = JSON.stringify(JSON.parse(err.reponse.data.message)); // 백엔드에서 넘어오는 에러에 대한 메세지 이름은 message로 명시할 필요가 있음.
          error.value = response.data.message;
        }
      }
    };

    return {
      name,
      username,
      password,
      passwordConfirmation,
      passwordError,
      terms,
      preferredGenre,
      error,
      handleSubmit,
    };
  },
});
</script>

<style src="./Signup.css" scoped></style>
