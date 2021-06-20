<template>
  <div class="queue bg-black text-white rounded-2xl shadow-lg">
    <div class="card-content-wrapper px-8 py-4">
      <div class="card-top flex justify-between items-center">
        <div class="card-title">
          <HostPlaylistTitle :key="selectedPlaylist" :uri="selectedPlaylist" />
        </div>
        <div class="button-wrapper flex justify-evenly items-center ">
          <div
            class="play-button mr-4
          "
          >
            <button
              class="bg-green rounded-full px-2 cursor-pointer"
              @click="() => play(selectedPlaylist)"
            >
              >
            </button>
          </div>
          <div class="min-button">
            <button class="bg-blackLight rounded-full px-2">
              -
            </button>
          </div>
        </div>
      </div>
      <HostPlaylist
        v-if="selectedPlaylist"
        :uri="selectedPlaylist"
        :key="selectedPlaylist"
      />
      <div v-else class="h-96 flex justify-center items-center">
        <Spinner :color="'white'" />
      </div>
    </div>
  </div>
</template>

<script>
import { spotify } from "@/plugins/spotify";

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
  },
  methods: {
    play(uri) {
      spotify.play({
        context_uri: uri
      });
    }
  }
};
</script>

<style></style>
