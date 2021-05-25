<template>
  <div>
    <Carousel :carousel_movies="carousel_movies" />
    <VerticalSlide :vertical_movies="carousel_movies" />
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
import Carousel from "../components/movies/Carousel.vue";
import VerticalSlide from "../components/movies/VerticalSlide.vue";
import VerticalSlideGenre from "../components/movies/VerticalSlideGenre.vue";

export default defineComponent({
  name: "Home",
  components: { Carousel, VerticalSlide, VerticalSlideGenre },
  setup() {
    const movies = ref<Movie[]>([]);

    const carousel_movies = computed(() => movies.value.splice(0, 20));

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

    onBeforeMount(() => {
      load();
    });

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