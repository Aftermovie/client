<template>
  <div v-for="num of 10" :key="num">
    <VerticalSlideGenreDetail
      :genreNum="genreNum[num]"
      :genreDescription="genreDescription[num]"
    />
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
      "으스스...한 공포 영화는 어떠세요.",
      "애니메이션 영화와 함께 동심의 세계로 빠져보세요.",
      "풀리지 않는 미스터리",
      "스릴러 영화와 함께 여름 더위 쫓아버리죠.",
      "심장이 두근거리는 로맨스 영화 보고 가시죠.",
      "드라마 영화가 역시 짱이죠.",
      "가족들과 함께 볼 만한 영화들입니다.",
      "판타지의 스펙타클함을 느껴보시죠.",
      "역사 속 인물들과 함께 해보는 건 어떨까요",
    ]);
    return { genreNum, genreDescription };
  },
});
</script>

<style scoped>
</style>
