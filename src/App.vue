<template>
  <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
  <Navbar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/movies/Navbar.vue";

export default defineComponent({
  name: "App",
  components: { Navbar },
  setup() {},
});
</script>

<style>
@font-face {
  font-family: "koreaCinema";
  src: url("./assets/font/a시네마B.ttf") format("truetype");
}
body {
  font-family: "koreaCinema";
  background-color: #000;
  /* overflow: hidden; */
  color: white;
}
</style>