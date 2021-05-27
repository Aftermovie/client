<template>
  <div v-for="num of 10" :key="num">
    <VerticalSlideGenreDetail
      :genreNum="genreNum[num]"
      :genreDescription="genreDescription[num]"
    />
    <!-- {{ num }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VerticalSlideGenreDetail from "./VerticalSlideGenreDetail.vue";

export default defineComponent({
  name: "VerticalSlideGenre",
  components: { VerticalSlideGenreDetail },
  setup() {
    const genreNum = ref<Array<number>>([0, 1, 11, 3, 13, 5, 14, 7, 8, 9, 10]);
    const genreDescription = ref<Array<string>>([
      "",
      "무더운 여름 저희와 같이 액션 영화 한편 어떠신가요?",
      "공포",
      "애니매이션 영화와 함께 동심의 세계로 빠져보세요.",
      "미스터리",
      "스릴러 영화와 함께 여름 더위 쫓아버리죠.",
      "심장이 두근거리는 로맨스 영화 보고 가시죠.",
      "드라마 보고 싶다",
      "가족 보고 싶다",
      "판타지 보고 싶다",
      "역사 보고 싶다",
    ]);
    return { genreNum, genreDescription };
  },
});
</script>

<style scoped>
</style>
