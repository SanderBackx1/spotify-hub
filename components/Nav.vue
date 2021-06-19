<template>
  <nav class="nav">
    <div class="user">
      <img v-if="user.images" :src="user.images[0].url" alt="" />
      <h4 v-if="user.display_name">{{ user.display_name }}</h4>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUser();
    }
  }
};
</script>

<style></style>
