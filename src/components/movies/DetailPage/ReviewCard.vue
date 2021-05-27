<template>
  <div>
    <transition name="modal">
      <div v-if="showModal" class="backdrop">
        <div class="modal">
          <p>{{ errorMessage }}</p>
          <div
            class="errorMessage"
            v-if="errorMessage === '로그인이 필요한 기능입니다.'"
          >
            <button @click="goLogin">로그인창으로 이동하기</button>
          </div>
          <button @click="setModal">X</button>
        </div>
      </div>
    </transition>
    <div class="reviews">
      <div class="container">
        <div class="skills">
          <h3 class="name">평점</h3>
          <div class="rating">
            <input class="radio" type="radio" @click="scoreRank(5)" />
            <input class="radio" type="radio" @click="scoreRank(4)" />
            <input class="radio" type="radio" @click="scoreRank(3)" />
            <input class="radio" type="radio" @click="scoreRank(2)" />
            <input class="radio" type="radio" @click="scoreRank(1)" />
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            v-model="content"
            placeholder="새로운 리뷰를 달아주세요."
            class="reviewInput"
          />
        </form>
      </div>

      <transition name="switch" mode="out-in">
        <div v-if="reviews.length">
          <transition-group tag="ul" name="list" appear class="row">
            <li v-for="review in reviews" :key="review" class="column">
              <div class="card">
                <div class="columnArrange">
                  <div v-for="num of review.rank" :key="num" class="icon">
                    <fa icon="star" />
                  </div>
                  <div>
                    {{ review.create_user.profile }}
                  </div>
                </div>
                <div class="reviewContent">
                  {{ review.content }}
                </div>
              </div>
              <fa icon="thumbs-up" @click="likeReview(review.id)" />
              {{ review.likes_count }} <fa icon="thumbs-down" />
              {{ review.dislikes_count }}
            </li>
          </transition-group>
        </div>
        <div v-else class="noReview">아직 리뷰가 없습니다!</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import Review from "../../../types/Review";
import axios from "axios";

export default defineComponent({
  props: ["movies_reviews", "movieID"],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const reviews = ref<Array<Review>>(props.movies_reviews);
    const content = ref<string>("");
    const rank = ref<number>(1);
    const showModal = ref<boolean>(false);
    const errorMessage = ref<string>("");

    const setModal = () => {
      showModal.value = !showModal.value;
    };

    const goLogin = () => {
      router.push({
        name: "Login",
      });
    };

    const scoreRank = (num: number) => {
      if (num >= 1 && num <= 5) {
        rank.value = num;
      }
    };

    watch(
      () => props.movies_reviews,
      (currValue, oldValue) => {
        reviews.value = props.movies_reviews;
        console.log("chkchk");
        console.log(reviews.value);
      }
    );

    const SERVER_URL_POSTREVIEW = `${process.env.VUE_APP_SERVER_URL}/movies/${props.movieID}/reviews/`;

    const handleSubmit = async () => {
      try {
        const credential = {
          content: content.value,
          rank: rank.value,
        };
        const response = await axios.post(SERVER_URL_POSTREVIEW, credential, {
          headers: {
            Authorization: `JWT ${store.state.userToken}`,
          },
        });
        context.emit("update");
      } catch (err) {
        const response = err.response;
        console.log(response.status);
        if (response.status === 401) {
          errorMessage.value = "로그인이 필요한 기능입니다.";
        } else {
          errorMessage.value = response.data.message;
        }
        showModal.value = !showModal.value;
      }
    };

    const likeReview = async (id: number) => {
      const SERVER_URL_POSTREVIEWLIKE = `${process.env.VUE_APP_SERVER_URL}/movies/reviews/${id}/like/`;
      console.log(SERVER_URL_POSTREVIEWLIKE);
      console.log(`JWT ${store.state.userToken}`);
      try {
        const response = await axios.post(SERVER_URL_POSTREVIEWLIKE, {
          headers: {
            Authorization: `JWT ${store.state.userToken}`,
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      reviews,
      content,
      rank,
      errorMessage,
      setModal,
      goLogin,
      showModal,
      scoreRank,
      handleSubmit,
      likeReview,
    };
  },
});
</script>

<style src="./ReviewCard.css" scoped>
</style>
