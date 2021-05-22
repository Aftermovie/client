<template>
  <Carousel :carousel_movies="carousel_movies" />

  <!-- <div class="home">
    <div class="card" v-for="movie in movies" :key="movie">
      {{ movie.title }}
      <img :src="movie.poster_path" alt="" />
    </div>
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import Movie from "../types/Movie";
import Carousel from "../components/movies/Carousel.vue";

export default defineComponent({
  name: "Home",
  components: { Carousel },
  setup() {
    const movies = ref<Movie[]>([]);
    const carousel_movies = computed(() => movies.value.splice(0, 10));

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

    load();

    return {
      movies,
      load,
      carousel_movies,
    };
  },
});
</script>

<style scoped>
</style>