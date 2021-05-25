<template>
  <div class="reviews">
    <div class="container">
      <div class="skills">
        <h3 class="name">평점</h3>
        <div class="rating">
          <input type="radio" @click="scoreRank(5)" />
          <input type="radio" @click="scoreRank(4)" />
          <input type="radio" @click="scoreRank(3)" />
          <input type="radio" @click="scoreRank(2)" />
          <input type="radio" @click="scoreRank(1)" />
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="content"
          placeholder="새로운 리뷰를 달아주세요."
        />
      </form>
    </div>

    <transition name="switch" mode="out-in">
      <div v-if="reviews.length">
        <transition-group tag="ul" name="list" appear class="row">
          <li v-for="review in reviews" :key="review" class="column">
            <div class="card">
              <div v-for="num of review.rank" :key="num" class="icon">
                <fa icon="star" />
              </div>
              <div class="reviewContent">
                {{ review.content }}
              </div>
            </div>
          </li>
        </transition-group>
      </div>
      <div v-else>아직 리뷰가 없습니다!</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Review from "../../types/Review";
import axios from "axios";

export default defineComponent({
  props: ["movies_reviews", "movieID"],
  setup(props, context) {
    const reviews = ref<Array<Review>>(props.movies_reviews);
    const content = ref<string>("");
    const rank = ref<number>(1);

    const scoreRank = (num: number) => {
      if (num >= 1 && num <= 5) {
        rank.value = num;
      }
    };

    watch(
      () => props.movies_reviews,
      (currValue, oldValue) => {
        reviews.value = props.movies_reviews;
      }
    );

    const SERVER_URL_POSTREVIEW = `${process.env.VUE_APP_SERVER_URL}/movies/${props.movieID}/reviews/`;

    const handleSubmit = async () => {
      try {
        const credential = {
          content: content.value,
          rank: rank.value,
        };
        const response = await axios.post(SERVER_URL_POSTREVIEW, credential);
        console.log(response);
        context.emit("update");
      } catch (err) {
        console.log(err);
      }
    };

    return { reviews, content, rank, scoreRank, handleSubmit };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a2b3c;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  margin-right: 70px;
  border-radius: 10px;
  box-shadow: -5px -1px 2px rgba(255, 255, 255, 0.25),
    inset -1px -1px 5px rgba(255, 255, 255, 0.25),
    8px 30px 30px rgba(0, 0, 0, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.3);
}

.container h2 {
  margin-bottom: 10px;
  font-weight: 500;
  color: #1f9cff;
}

.container .skills {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding-right: 10px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.25),
    inset -1px -1px 5px rgba(255, 255, 255, 0.25),
    8px 30px 30px rgba(0, 0, 0, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
}

.container .skills h3 {
  min-width: 180px;
  text-align: right;
  padding-right: 100px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
}

.container .skills .rating {
  position: relative;
  display: flex;
  margin: 10px 30px 10px 0;
  flex-direction: row-reverse;
}

.container .skills .rating input {
  position: relative;
  width: 20px;
  height: 40px;
  display: flex;
  margin-left: 10%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.container .skills .rating input::before {
  content: "\f005";
  position: absolute;
  font-family: fontAwesome;
  font-size: 34px;
  position: absolute;
  left: 4px;
  color: #030b0f;
  transition: 0.5s;
}

.container .skills .rating input:hover ~ input::before,
.container .skills .rating input:hover::before,
.container .skills .rating input:checked ~ input::before,
.container .skills .rating input:checked::before {
  color: #f00;
}

.reviews {
  max-width: 70%;
  margin: -400px auto;
  position: relative;
  color: white;
  background-color: rgba(0, 0, 0, 0);
}

.reviews input {
  width: 500%;
  margin-left: -200%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.reviews ul {
  position: relative;
  padding: 0;
}
.reviews li {
  list-style-type: none;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 30%;
  height: 100px;
  box-sizing: border-box;
  color: white;
}
.reviews li:hover {
  cursor: pointer;
}

.column {
  float: left;
  width: 25%;
  padding: 0 10px;
  margin: 10px;
}

.column:hover {
  transform: translateY(-10px);
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
/* Remove extra left and right margins, due to padding in columns */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: black;
  display: flex;
  max-height: 70px;
}

.card:hover {
  transition: 1s;
  max-height: 200%;
}

.card .icon {
  color: red;
}

.card .reviewContent {
  margin-left: 5%;
  overflow: hidden;
}
/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
/* 6. Group Transition */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 1s ease;
}
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 1s ease;
  position: absolute; /* absolute를 넣어야 삭제 될 때도 슬라이드로 삭제된다.*/
}

/* 7. Move transition */
/* 추가될 때 자연스럽게 슬라이드 형식으로 진행되는 코드 */
.list-move {
  transition: all 0.5s ease;
}

/* 8. switch transitions */
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-to,
.switch-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.switch-enter-active {
  transition: all 0.5s ease;
}
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>
