<template>
  <p v-if="username">{{ username }}님 이런 영화는 어떠세요?</p>
  <p v-else>이런 영화는 어떠세요?</p>
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
  props: ["vertical_movies", "username"],
  setup() {},
});
</script>

<style src="./VerticalSlide.css" scoped></style>
