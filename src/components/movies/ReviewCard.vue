<template>
  <div class="reviews">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="content" placeholder="Add a new todo..." />
    </form>

    <!-- 8. todo가 다 사라지면 "Woohoo, nothing left todo!" 이게 나오는데
    어떻게 이 글도 슬라이드 형식으로 등장시킬 수 있을까. -->
    <!-- mode="out-in"을 적지 않으면 두 개의 스위치가 동시에 발생하고, 
    그러면 굉장히 이상해진다. 때문에 기존에 있던게 다 나가고 난 다음에 새거가
    들어올 수 있도록 하는 것이 이 mode이다. -->
    <transition name="switch" mode="out-in">
      <div v-if="reviews.length">
        <transition-group tag="ul" name="list" appear class="row">
          <li v-for="review in reviews" :key="review" class="column">
            <div class="card">
              {{ review.rank }}
              {{ review.content }}
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
    console.log(props.movies_reviews);
    const reviews = ref<Array<Review>>(props.movies_reviews);
    console.log(reviews.value);
    const content = ref<string>("");
    const rank = ref<number>(3);

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

    return { reviews, content, rank, handleSubmit };
  },
});
</script>

<style scoped>
.reviews {
  max-width: 70%;
  margin: -400px auto;
  position: relative;
  color: white;
  background-color: rgba(0, 0, 0, 0);
}

input {
  width: 90%;
  margin-left: 2%;
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
  background: white;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 30%;
  height: 100px;
  box-sizing: border-box;
  color: black;
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
  background-color: #f1f1f1;
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
