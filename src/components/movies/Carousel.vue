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
      <!-- {{ movie.title }} -->
      <img
        :src="movie.poster_path"
        alt=""
        style="width: auto; height: auto; max-width: 1000px; max-height: 300px"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Movie from "../../types/Movie";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default defineComponent({
  name: "App",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["carousel_movies"],
  setup(props) {
    const movies = ref<Movie[]>(props.carousel_movies);
    // 아래 주석된 코드를 키거나 꺼야지 화면에 렌더링이 반영된다.... 도대체 왜 그런지는 모르겟다...
    console.log(movies);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
