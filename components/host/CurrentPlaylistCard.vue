<template>
  <div class="queue bg-black text-white rounded-2xl shadow-lg">
    <div class="card-content-wrapper px-8 py-4">
      <div class="card-top flex justify-between items.center">
        <div class="card-title">
          <h3 class="text-4xl font-bold">Playlist name</h3>
        </div>
        <div class="min-button">
          <button class="bg-blackLight rounded-full px-2">
            -
          </button>
        </div>
      </div>
      <HostPlaylist
        v-if="currentPlaylist"
        :uri="currentPlaylist"
        :key="currentPlaylist"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: []
    };
  },
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    },
    currentPlaylist() {
      return this.$store.getters.getCurrentPlaylist();
    }
  }
};
</script>

<style></style>
