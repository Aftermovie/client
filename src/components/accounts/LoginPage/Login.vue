<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">
      <label>Email:</label>
      <input type="email" required v-model="username" />

      <label>Password:</label>
      <input type="password" required v-model="password" />

      <div class="error" v-if="error">{{ error }}</div>

      <div class="submit">
        <button>Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore, ActionTypes } from "@/store";
import axios from "axios";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();

    const username = ref<string>("");
    const password = ref<string>("");
    const error = ref<string>("");

    const SERVER_URL_GETPROFILE = `${process.env.VUE_APP_SERVER_URL}/accounts/profile/`;

    const handleSubmit = async () => {
      try {
        const credential = {
          username: username.value,
          password: password.value,
        };
        const response = await store.dispatch(ActionTypes.GET_JWT, credential);
        console.log(response);

        const response_profile = await axios.get(SERVER_URL_GETPROFILE, {
          headers: {
            Authorization: `JWT ${store.state.userToken}`,
          },
        });
        const credential_getusername = {
          username: response_profile.data.name,
          password: password.value,
        };
        const response_getusername = await store.dispatch(
          ActionTypes.GET_USERNAME,
          credential_getusername
        );
        console.log(response_profile);
        router.push({
          name: "Home",
        });
      } catch (err) {
        error.value = "아이디 혹은 비밀번호가 다릅니다."; // 백엔드에서 넘어오는 에러에 대한 메세지 이름은 message로 명시할 필요가 있음.
        console.log(error.value);
      }
    };

    // 사실 여기서 credential 객체를 만들어 넘기는 것은 굉장히 비효율적이다.(필요없는 데이터이기 때문)
    // 하지만, 현재 내 수준이 vuex + typescript를 자유자재로 다룰 수준이 되지 않고 parameter의 개수가 부족하다는 에러가
    // 계속 발생한다. 때문에, 필요없음을 인지하면서도 해당 에러를 일단은 넘어가기 위해 쓸 데 없는 객체를 만들어 넘긴다.
    // 추후에 해당 부분에 대한 수정을 거칠 필요가 있다.

    // console.log(store.state.userToken);
    const chkLogin = computed(() => store.getters.decodedToken);

    return { username, password, error, handleSubmit, chkLogin };
  },
});
</script>

<style src="./Login.css" scoped></style>