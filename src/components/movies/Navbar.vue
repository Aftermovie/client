<template>
  <header>
    <a href="#" class="logo"><img src="../../assets/img/logo.png" alt="" /></a>
    <ul class="navigation">
      <li><a href="">Home</a></li>
      <li><a href="">TV Shows</a></li>
      <li><a href="">Movies</a></li>
      <li><a href="">Latest</a></li>
      <li><a href="">My List</a></li>
    </ul>
    <div class="search">
      <input type="text" placeholder="Search" />
      <fa icon="search" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() {},
});
</script>

<style scoped>
header {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px;
  z-index: 100;
}

/* 그냥 큰 사진을 가져와서 이렇게 max-width 속성으로
이미지 크기를 줄여버려도 되네!!! */
header .logo img {
  margin-top: 15px;
  max-width: 150px;
  max-height: 100px;
}

.navigation {
  display: flex;
}

.navigation li {
  list-style: none;
  margin: 0 10px;
}

.navigation li a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
}

.navigation li:hover a {
  color: #de0611;
}

.search {
  position: relative;
  width: 300px;
  height: 40px;
}

.search input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  border-radius: 4px;
  padding: 0 10px 0 45px;
  backdrop-filter: blur(10px);
}

.search input::placeholder {
  color: #fff;
}

.search .fa-search {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  padding-right: 10px;
  color: #fff;
  border-right: 1px solid #fff;
}
</style>