<template>
  <div>
    <transition name="modal">
      <div v-if="showModal" class="backdrop">
        <div class="modal">
          <p>찜 목록에 추가되었습니다.</p>
        </div>
      </div>
    </transition>
    <div v-if="movieDetail">
      <div v-if="showHeader">
        <div class="reviewCards">
          <img :src="imgURL" alt="" />
          <button
            style="margin-top: 500px; visibility: hidden"
            @click="removeReview"
          >
            제거
          </button>
          <div class="tmp">
            <ReviewCard
              :movies_reviews="movieReviews"
              :movieID="movieDetail.id"
              @update="load"
            />
          </div>
        </div>
      </div>
      <div v-else class="banner">
        <div class="imgHover"></div>
        <img :src="imgURL" alt="" />
        <div class="content">
          <h1>{{ movieDetail.title }}</h1>
          <h4>{{ movieDetail.release_date }}</h4>
          <p>{{ movieDetail.overview }}</p>
          <fa class="icon fa-3x" icon="plus-circle" @click="addFavoriteMovie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import { useStore } from "@/store";
import MovieDetail from "../../../types/MovieDetail";
import ReviewCard from "./ReviewCard.vue";

export default defineComponent({
  props: ["id"],
  components: { ReviewCard },
  setup(props) {
    const store = useStore();

    const movieDetail = ref<MovieDetail>();
    const imgURL = ref<string>("");
    const showReview = ref<boolean>(false);
    const movieReviews = computed(() => movieDetail?.value?.reviews);
    const showModal = ref<boolean>(false);

    const showHeader = ref<boolean>(false);
    const lastScrollPosition = ref<number>(0);
    const scrollOffset = ref<number>(50);

    const SERVER_URL_GETMOVIEDETAIL = `${process.env.VUE_APP_SERVER_URL}/movies/${props.id}`;

    const load = async () => {
      try {
        const response = await axios.get(SERVER_URL_GETMOVIEDETAIL);
        movieDetail.value = response.data;

        const re = /w1280/g;
        imgURL.value = response.data.image.replace(re, "original");
      } catch (err) {
        console.log(err);
      }
    };

    let flag = 0;
    const onScroll = () => {
      if (window.pageYOffset >= lastScrollPosition.value && flag === 1) {
        showHeader.value = true;
      } else if (window.pageYOffset >= 52 && flag === 1) {
        showHeader.value = true;
      } else {
        flag = 1;
        showHeader.value = false;
      }
      lastScrollPosition.value = window.pageYOffset;
    };

    const removeReview = () => {
      showHeader.value = false;
    };

    const SERVER_URL_ADDFAVORITEMOVIE = `${process.env.VUE_APP_SERVER_URL}/accounts/profile/`;

    const addFavoriteMovie = async () => {
      try {
        const data = {
          want_movie_id: movieDetail?.value?.id,
        };
        const response_addFavoriteMovie = await axios.post(
          SERVER_URL_ADDFAVORITEMOVIE,
          data,
          {
            headers: {
              Authorization: `JWT ${store.state.userToken}`,
            },
          }
        );
        showModal.value = !showModal.value;
        setTimeout(() => {
          showModal.value = !showModal.value;
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      load();
      window.addEventListener("scroll", onScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return {
      movieDetail,
      imgURL,
      showReview,
      showHeader,
      showModal,
      movieReviews,
      lastScrollPosition,
      scrollOffset,
      onScroll,
      load,
      removeReview,
      addFavoriteMovie,
    };
  },
});
</script>

<style src="./MovieDetail.css" scoped></style>
