<template>
  <p>동균님 이런 영화는 어떠세요?</p>
  <swiper
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
    initialSlide="9"
    class="mySwiper"
  >
    <swiper-slide v-for="movie in vertical_movies" :key="movie.id">
      <!-- {{ movie.title }} -->
      <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }">
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
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default defineComponent({
  name: "VerticalSlide",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["vertical_movies"],
  setup() {},
});
</script>

<style scoped>
p {
  margin: 5rem 0 0 8rem;
  font-size: 35px;
}

.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

/* https://swiperjs.com/demos#effect-fade */
/* 위의 페이지 effect hover에서 기존 크기의 비율을 확인할 수 있다. */
/* 아래의 width와 height를 조절해서 이미지의 크기를 줄일 수는 있으나 */
/* template 태그 속의 depth 또한 수정이 같이 필요하다. */
/* 비율을 잘 계산해서 바꿀 필요가 있겠다. */
.swiper-slide {
  background-position: center;
  background-size: cover;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  width: 170px;
  height: 250px;
  filter: blur(1px);
}

.swiper-slide-active {
  filter: blur(0px);
}

.swiper-slide img {
  display: block;
  width: 100%;
  border-radius: 10px;

  /* 만약 사진 아래에 부가 정보를 넣는다면 height를 줄이고 내용을 넣자. */
  /* height: 70%; */
}
</style>
