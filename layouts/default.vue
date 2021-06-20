<template>
  <div
    class="bg-gradient-to-br from-gradient1 to-black min-h-screen overflow-x-hidden"
  >
    <Nav class="z-10" />
    <DeviceVolume class="fixed bottom-0 left-0" />
    <div class="flex justify-center">
      <div class="w-3/5 py-16">
        <Nuxt v-if="loadingDone" />
      </div>
    </div>
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
