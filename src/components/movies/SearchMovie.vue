<template>
  <div>search</div>
  {{ $route.params.keyword }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["keyword"],
  setup(props) {
    console.log(props.keyword);
  },
});
</script>

<style scoped>
</style>
