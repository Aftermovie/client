<template>
  <div>
    <Carousel :carousel_movies="carousel_movies" />
    <VerticalSlide :vertical_movies="carousel_movies" :username="username" />
    <VerticalSlideGenre />
  </div>
  <!-- <div class="home">
    <div class="card" v-for="movie in movies" :key="movie">
      {{ movie.title }}
      <img :src="movie.poster_path" alt="" />
    </div>
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount } from "vue";
import axios from "axios";
import Movie from "../types/Movie";
import Carousel from "../components/movies/MainPage/Carousel.vue";
import VerticalSlide from "../components/movies/MainPage/VerticalSlide.vue";
import VerticalSlideGenre from "../components/movies/MainPage/VerticalSlideGenre.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Home",
  components: { Carousel, VerticalSlide, VerticalSlideGenre },
  setup() {
    const store = useStore();

    const movies = ref<Movie[]>([]);

    const carousel_movies = computed(() => movies.value.splice(0, 20));
    const username = computed(() => store.state.username);
    // if (store.state.username) {
    //   username.value = store.state.username;
    // }
    const SERVER_URL_GETALLMOVIE = `${process.env.VUE_APP_SERVER_URL}/movies/`;

    const load = async () => {
      try {
        const response = await axios.get(SERVER_URL_GETALLMOVIE);
        movies.value = response.data;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("ssssssssssss" + username.value);
    onBeforeMount(() => {
      load();
    });

    return {
      movies,
      username,
      load,
      carousel_movies,
    };
  },
});
</script>

<style scoped>
</style>