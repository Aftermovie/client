<template>
  <div>
    <transition name="modal">
      <div v-if="showModal" class="backdrop">
        <div class="modal">
          <p>로그인이 필요한 페이지입니다.</p>
          <button @click="setModal">X</button>
          <button @click="goLogin">로그인창으로 이동하기</button>
        </div>
      </div>
    </transition>
    <div class="container">
      <div class="card" v-for="movie in movies" :key="movie.id">
        <div class="box">
          <div class="content">
            <div class="imgHover"></div>
            <img :src="movie.poster_path" alt="" />
            <h3>{{ movie.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import Movie from "../../../types/Movie";

export default defineComponent({
  name: "MyList",
  setup() {
    const store = useStore();
    const router = useRouter();

    const showModal = ref<boolean>(false);
    if (!store.state.userToken) {
      showModal.value = !showModal.value;
    }

    const movies = ref<Movie[]>([]);
    const SERVER_URL_GETMYLIST = `${process.env.VUE_APP_SERVER_URL}/accounts/profile/`;

    const getMyList = async () => {
      try {
        const response_getMyList = await axios.get(SERVER_URL_GETMYLIST, {
          headers: {
            Authorization: `JWT ${store.state.userToken}`,
          },
        });
        movies.value = response_getMyList.data.wish_movies;
      } catch (err) {
        console.log(err);
      }
    };

    const setModal = () => {
      showModal.value = !showModal.value;
    };

    const goLogin = () => {
      router.push({
        name: "Login",
      });
    };

    onBeforeMount(() => {
      getMyList();
    });

    return { movies, showModal, setModal, goLogin };
  },
});
</script>

<style src="./MyList.css" scoped></style>
