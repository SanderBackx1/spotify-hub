<template>
  <div
    class="playlists card-content overflow-scroll overflow-x-hidden max-h-96 "
  >
    <div v-if="!$fetchState.pending">
      <div v-for="playlist in playlists" :key="playlist.id">
        <p>{{ playlist.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { spotify } from "@/plugins/spotify";

export default {
  data() {
    return {
      playlists: undefined
    };
  },
  async fetch() {
    let playlists = await spotify.getUserPlaylists();
    if (playlists.items.length == 20) {
      let second = [];
      let count = 1;
      do {
        second = [];
        second = await spotify.getUserPlaylists({
          offset: 20 * count
        });
        count++;
        playlists.items = [...playlists.items, ...second.items];
      } while (second.length == 20);
    }

    this.playlists = [...playlists.items];
  }
};
</script>

<style></style>
