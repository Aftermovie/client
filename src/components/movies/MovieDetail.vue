<template>
  <div v-if="movieDetail">
    <div class="banner">
      <div class="imgHover"></div>
      <img :src="imgURL" alt="" />
      <div class="content">
        <h1>{{ movieDetail.title }}</h1>
        <h4>{{ movieDetail.release_date }}</h4>
        <p>{{ movieDetail.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import MovieDetail from "../../types/MovieDetail";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const movieDetail = ref<MovieDetail>();
    const imgURL = ref<string>("");

    const SERVER_URL_GETMOVIEDETAIL = `${process.env.VUE_APP_SERVER_URL}/movies/${props.id}`;

    const load = async () => {
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

    load();

    return { movieDetail, imgURL };
  },
});
</script>

<style scoped>
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
  overflow: hidden;
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
  margin: 250px 1700px 0px 70px;
}
.content p {
  max-width: 1000px;
}

.content h4 {
  color: rgb(255, 255, 255, 0.5);
  font-weight: 500;
}
</style>
