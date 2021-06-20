<template>
  <div class="relative pt-1">
    <div
      class="  rounded-lg overflow-hidden h-2 mb-4 text-xs flex rounded bg-blackLight"
    >
      <div
        :style="`width:${calculateProgress(state)}%`"
        class="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["state"],

  methods: {
    calculateProgress(state) {
      if (state.progress_ms && state.item.duration_ms) {
        return (state.progress_ms / state.item?.duration_ms) * 100;
      }
      return 0;
    }
  }
};
</script>

<style></style>
