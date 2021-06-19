<template>
  <div class="py-16">
    <h3 class="text-5xl text-white font-bold  ">{{ title }}</h3>
    <div>
      cards
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rooms: Array
  }
};
</script>

<style></style>
