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

    // 해결!!! watch를 사용해서 부모의 state 변화를 감지해야 한다. 라이프사이클을 제대로 이해하지 않고 시작해서 발생한 문제였다.
    watch(
      () => props.carousel_movies,
      (currValue, oldValue) => {
        movies.value = props.carousel_movies;
      }
    );
    // onMounted((movies.value = props.carousel_movies));

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
  height: 550px;
}

.swiper-slide {
  font-size: 18px;
  background: #fff;
  display: flex;
}

.swiper-slide img {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-slide .content {
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
  font-size: 1rem;
  z-index: 100;
}

.swiper-slide .content h2 {
  color: white;
}

.swiper-slide .content p {
  color: white;
  font-size: 1rem;
}
</style>
