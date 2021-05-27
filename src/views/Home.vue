<template>
  <div>
    <Carousel :carousel_movies="carousel_movies" />
    <VerticalSlide
      :vertical_movies="vertical_slide_movies"
      :username="username"
    />
    <VerticalSlideGenre />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount } from "vue";
import axios from "axios";
import Movie from "../types/Movie";
import Carousel from "../components/movies/MainPage/Carousel.vue";
import VerticalSlide from "../components/movies/MainPage/VerticalSlide.vue";
import VerticalSlideGenre from "../components/movies/MainPage/VerticalSlideGenre.vue";
import { useStore } from "@/store";
import Footer from "../components/movies/Footer/Footer.vue";

export default defineComponent({
  name: "Home",
  components: { Carousel, VerticalSlide, VerticalSlideGenre, Footer },
  setup() {
    const store = useStore();

    const movies = ref<Movie[]>([]);

    const carousel_movies = computed(() => movies.value.slice(0, 20));
    const vertical_slide_movies = computed(() => movies.value.slice(20, 41));

    const username = computed(() => store.state.username);

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
      username,
      load,
      carousel_movies,
      vertical_slide_movies,
    };
  },
});
</script>

<style scoped>
</style>