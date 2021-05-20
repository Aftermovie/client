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
      <label>Accept terms and com=ndition</label>
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

  <p>Name: {{ name }}</p>
  <p>Email: {{ username }}</p>
  <p>Password: {{ password }}</p>
  <p>Terms accepted: {{ terms }}</p>
  <p>Names: {{ preferredGenre }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
      const SERVER_URL_SIGNUP = `${process.env.VUE_APP_SERVER_URL}/api/accounts/signup`;

      if (!passwordError.value) {
        console.log("chk222");
        try {
          console.log(SERVER_URL_SIGNUP);
          console.log(userInformations);
          const response = await axios.post(
            SERVER_URL_SIGNUP,
            userInformations
          );
          console.log(response);
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

<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
