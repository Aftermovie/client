<template>
  <div>home</div>

  <!-- <div class="home">
    <div class="card" v-for="movie in movies" :key="movie">
      {{ movie.title }}
      <img :src="movie.poster_path" alt="" />
    </div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Movie from "../types/Movie";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const movies = ref<Movie[]>([]);

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
    };
  },
});
</script>

<style scoped>
</style>