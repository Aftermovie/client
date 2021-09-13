<template>
  <p>{{ genreDescription }}</p>
  <swiper
    v-if="movies"
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 0,
      stretch: 0,
      depth: 20,
      modifier: 2,
      slideShadows: true,
    }"
    :pagination="true"
    :initialSlide="9"
    class="mySwiper"
  >
    <swiper-slide v-for="movie in movies" :key="movie.id">
      <!-- {{ movie.title }} -->
      <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
        <img
          :src="movie.poster_path"
          alt=""
          style="
            width: auto;
            height: auto;
            max-width: 1000px;
            max-height: 300px;
          "
        />
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import axios from "axios";
import Movie from "../../../types/Movie";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default defineComponent({
  name: "VerticalSlideGenreDetail",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["genreNum", "genreDescription"],
  setup(props) {
    const movies = ref<Movie[]>([]);

    const SERVER_URL_GETGENREMOVIE = `https://aftermovie-api.herokuapp.com/movies/genre/${props.genreNum}/`;

    const load = async () => {
      try {
        const response = await axios.get(SERVER_URL_GETGENREMOVIE);
        movies.value = response.data.splice(0, 20);
      } catch (err) {
        console.log(err);
      }
    };

    onBeforeMount(() => {
      load();
    });

    return { movies };
  },
});
</script>

<style src="./VerticalSlideGenreDetail.css" scoped></style>
