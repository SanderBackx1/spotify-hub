<template>
  <nav class="nav flex justify-start w-screen bg-black shadow-lg">
    <div class="user flex justify-start w-1/4">
      <img
        class="min-w-1/2 max-h-20 max-w-20"
        v-if="user.images"
        :src="user.images[0].url"
        alt=""
      />
      <h4
        class="w-1/2 text-center align-bottom flex items-center mx-8 text-white"
        v-if="user.display_name"
      >
        {{ user.display_name }}
      </h4>
    </div>
    <div class="w-3/4"></div>
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
