<template>
  <div v-if="movieDetail">
    <p>{{ $route.params.id }}</p>
    <p>{{ movieDetail.id }}</p>
    <p>{{ movieDetail.content }}</p>
    <img :src="movieDetail.poster_path" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const movieDetail = ref<MovieDetail>();

    const SERVER_URL_GETMOVIEDETAIL = `${process.env.VUE_APP_SERVER_URL}/movies/${props.id}`;

    const load = async () => {
      try {
        const response = await axios.get(SERVER_URL_GETMOVIEDETAIL);
        movieDetail.value = response.data;
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();

    return { movieDetail };
  },
});
</script>

<style scoped>
</style>
