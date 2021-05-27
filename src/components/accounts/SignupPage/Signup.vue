<template>
  <form @submit.prevent="handleSubmit">
    <label>Name:</label>
    <input type="text" required v-model="name" />

    <label>Email:</label>
    <input type="email" required v-model="username" />

    <label>Password:</label>
    <input type="password" required v-model="password" />
    <div v-if="passwordError" class="error">{{ passwordError }}</div>

    <div class="terms">
      <input type="checkbox" v-model="terms" required />
      <label>Accept terms and condition</label>
    </div>

    <div>
      <input type="checkbox" value="shaun" v-model="preferredGenre" />
      <label>Horror</label>
    </div>
    <div>
      <input type="checkbox" value="yoshin" v-model="preferredGenre" />
      <label>Document</label>
    </div>
    <div>
      <input type="checkbox" value="mario" v-model="preferredGenre" />
      <label>Romance</label>
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
    const preferredGenre = ref<Array<string>>([]);
    const error = ref<string>("");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      passwordError.value =
        password.value.length > 5
          ? ""
          : "Password must be at least 6 chars long.";

      // there is no error.
      const userInformations = {
        name: name.value,
        username: username.value,
        password: password.value,
        preferredGenre: preferredGenre.value,
      };
      console.log("chk");
      const SERVER_URL_SIGNUP = `${process.env.VUE_APP_SERVER_URL}/accounts/signup/`;

      if (!passwordError.value) {
        console.log("chk222");
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
          error.value = err.message; // 백엔드에서 넘어오는 에러에 대한 메세지 이름은 message로 명시할 필요가 있음.
          console.log(error.value);
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
