<template>
  <header>
    <router-link :to="{ name: 'Home' }" class="logo"
      ><img src="../../assets/img/logo.png" alt=""
    /></router-link>
    <ul class="navigation">
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'MyList' }">My List</router-link></li>
      <li>
        <router-link :to="{ name: 'Login' }" v-if="!userToken"
          >Login</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Signup' }" v-if="!userToken"
          >Signup</router-link
        >
      </li>
      <li>
        <div class="logout" v-if="userToken" @click="onLogout">Logout</div>
      </li>
    </ul>
    <div class="search">
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Search" v-model="searchName" />
        <fa icon="search" />
      </form>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore, ActionTypes } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const userToken = computed(() => store.state.userToken);
    const searchName = ref<string>("");

    const handleSubmit = () => {
      router.push({
        name: "SearchMovie",
        params: { keyword: searchName.value },
      });
      searchName.value = "";
    };

    const onLogout = () => {
      const credential = {
        username: "",
        password: "",
      };
      store.dispatch(ActionTypes.DELETE_JWT, credential);
    };

    return { searchName, userToken, handleSubmit, onLogout };
  },
});
</script>

<style scoped>
header {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px;
  z-index: 100;
}

/* 그냥 큰 사진을 가져와서 이렇게 max-width 속성으로
이미지 크기를 줄여버려도 되네!!! */
header .logo img {
  margin-top: 15px;
  max-width: 150px;
  max-height: 100px;
}

.navigation {
  display: flex;
}

.navigation .logout {
  margin-left: -70%;
}

.navigation .logout:hover {
  color: #de0611;
  cursor: pointer;
}

.navigation li {
  list-style: none;
  margin: 0 10px;
}

.navigation li a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
}

.navigation li:hover a {
  color: #de0611;
}

.search {
  position: relative;
  width: 300px;
  height: 40px;
}

.search input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  border-radius: 4px;
  padding: 0 10px 0 45px;
  backdrop-filter: blur(10px);
}

.search input::placeholder {
  color: #fff;
}

.search .fa-search {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  padding-right: 10px;
  color: #fff;
  border-right: 1px solid #fff;
}
</style>