<template>
  <div class="playlists">
    <h3>All playlists</h3>
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
  }
};
</script>

<style></style>
