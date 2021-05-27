<template>
  <!-- <div>search</div> -->
  <!-- {{ $route.params.keyword }} -->
  <div class="container">
    <div class="card" v-for="movie in movies" :key="movie.id">
      <div class="box">
        <div class="content">
          <div class="imgHover"></div>
          <img :src="movie.poster_path" alt="" />
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import Movie from "../../types/Movie";
import axios from "axios";

export default defineComponent({
  name: "SearchMovie",
  props: ["keyword"],
  setup(props) {
    console.log(props.keyword);

    const movies = ref<Movie[]>([]);
    const keyword = ref<string>(props.keyword);

    console.log(keyword);
    const SERVER_URL_GETSEARCHEDMOVIE = `${process.env.VUE_APP_SERVER_URL}/movies/`;

    const data = {
      target: props.keyword,
    };

    const load = async () => {
      console.log("123123");
      try {
        const response = await axios.post(SERVER_URL_GETSEARCHEDMOVIE, data);
        console.log(response.data);
        movies.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    onBeforeMount(() => {
      load();
    });

    return { movies, keyword };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  background: #232427;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 7% 17%;
}

.container .card {
  position: relative;
  min-width: 320px;
  height: 450px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 30px;
}

.container .card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}

.container .card .box {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: #2a2b2f;
  border: 2px solid #1e1f23;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
  overflow: hidden;
}

.container .card .box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.container .card .box:hover {
  transform: translateY(-50px);
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.5);
}

.container .card .box .content {
  padding: 20px;
  text-align: center;
}

.container .card .box .content .imgHover {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, rgba(0, 0, 0), rgba(0, 0, 0, 0));
  z-index: 1;
  opacity: 0.7;
}

.container .card .box .content img {
  position: absolute;
  width: 100%;
  margin-left: -50%;
  margin-top: -10%;
}

.container .card .box .content h2 {
  position: absolute;
  top: -10px;
  right: 30px;
  font-size: 8em;
  color: rgba(255, 255, 255, 0.05);
}

.container .card .box .content h3 {
  position: relative;
  font-size: 15px;
  color: white;
  z-index: 15;
  transition: 0.5s;
}

.container .card .box .content p {
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  transition: 0.5s;
}
</style>
