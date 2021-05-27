<template>
  <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
  <Navbar />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
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

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>