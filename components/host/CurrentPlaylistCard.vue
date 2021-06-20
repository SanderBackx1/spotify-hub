<template>
  <div class="queue bg-black text-white rounded-2xl shadow-lg">
    <div class="card-content-wrapper px-8 py-4">
      <div class="card-top flex justify-between items.center">
        <div class="card-title">
          <HostPlaylistTitle :key="selectedPlaylist" :uri="selectedPlaylist" />
        </div>
        <div class="min-button">
          <button class="bg-blackLight rounded-full px-2">
            -
          </button>
        </div>
      </div>
      <HostPlaylist
        v-if="selectedPlaylist"
        :uri="selectedPlaylist"
        :key="selectedPlaylist"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: [],
      name: ""
    };
  },
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    },
    selectedPlaylist() {
      return this.$store.getters.getSelectedPlaylist();
    }
  }
};
</script>

<style></style>
