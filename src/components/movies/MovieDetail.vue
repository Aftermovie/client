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
import MovieDetail from "../../types/MovieDetail";
import ReviewCard from "../movies/ReviewCard.vue";

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
      console.log(1111);
      try {
        const response = await axios.get(SERVER_URL_GETMOVIEDETAIL);
        movieDetail.value = response.data;

        const re = /w1280/g;
        imgURL.value = response.data.image.replace(re, "original");
        console.log(response.data);
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
        console.log(movieDetail?.value?.id);
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
        console.log(response_addFavoriteMovie);
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

<style scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto; /* auto로 좌우 중앙 정렬 */
  background: white;
  border-radius: 10px;
  color: black;
  text-align: center;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-active {
  transition: all 0.5s ease;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 0.5s ease;
}

.banner .imgHover {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0), rgba(0, 0, 0, 0));
  z-index: 1;
  opacity: 0.7;
}

.banner {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .banner .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.banner img {
  width: 90%;
  position: relative;
}

.content {
  position: absolute;
  color: white;
  z-index: 20;
  top: 50px;
  margin: 15% 60% 0px 3%;
}

.content h1 {
  white-space: nowrap;
}

.content p {
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5em;
  color: #fff;
  margin: 10px 0 20px;
  max-width: 1000px;
}

.content h4 {
  color: rgb(255, 255, 255, 0.5);
  font-weight: 500;
}

.banner .content .icon {
  color: white;
  margin-top: 35%;
  cursor: pointer;
}

.banner .content .icon:hover {
  transform: translateY(-15px);
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.reviewCards img {
  width: 99%;
  position: absolute;
  opacity: 0.3;
  overflow: hidden;
}

.reviewCards .tmp {
  position: relative;
  z-index: 10;
}

.reviewCards button {
  z-index: 200;
}
</style>
