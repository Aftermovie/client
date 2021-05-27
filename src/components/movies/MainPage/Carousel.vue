<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
  >
    <swiper-slide v-for="movie in movies" :key="movie">
      <img :src="movie.image" alt="" />
      <div class="content">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview.slice(0, 100) }}...</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Movie from "../../../types/Movie";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default defineComponent({
  name: "Carousel",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["carousel_movies"],
  setup(props) {
    const movies = ref<Movie[]>(props.carousel_movies);

    // 해결!!! watch를 사용해서 부모의 state 변화를 감지해야 한다. 라이프사이클을 제대로 이해하지 않고 시작해서 발생한 문제였다.
    watch(
      () => props.carousel_movies,
      (currValue, oldValue) => {
        movies.value = props.carousel_movies;
      }
    );

    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      console.log("slide change");
    };

    return { movies, onSwiper, onSlideChange };
  },
});
</script>

<style src="./Carousel.css" scoped></style>
