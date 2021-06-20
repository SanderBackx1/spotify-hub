<template>
  <div
    class="bg-gradient-to-br from-gradient1 to-black min-h-screen overflow-x-hidden"
  >
    <Nav />
    <DeviceVolume class="fixed z-50 bottom-0 left-0" />
    <Nuxt v-if="loadingDone" />
  </div>
</template>
<script>
export default {
  computed: {
    loadingDone() {
      return this.$store.getters.getLoadingDone();
    }
  }
};
</script>

<style></style>
