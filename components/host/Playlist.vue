<template>
  <div class="card-content overflow-scroll overflow-x-hidden h-96 ">
    <div
      v-if="tracks && !$fetchState.pending"
      class="divide-y divide-blackLight"
    >
      <HostTrackListItem
        v-for="track in tracks"
        :key="track.id"
        :track="track"
      />
    </div>
    <div v-else class="flex justify-center items-center w-full h-full">
      <Spinner :color="'white'" />
    </div>
  </div>
</template>

<script>
import { spotify } from "@/plugins/spotify";

export default {
  data() {
    return {
      tracks: undefined
    };
  },

  props: ["uri"],
  async fetch() {
    const uri = this.$props.uri;
    const parts = uri.split(":");
    const id = parts[parts.length - 1];
    let playlistTracks = await spotify.getPlaylistTracks(id);
    if ((playlistTracks.length = 100)) {
      let second = [];
      let count = 1;
      do {
        second = [];

        second = await spotify.getPlaylistTracks(id, {
          offset: 100 * count
        });
        playlistTracks.items = [...playlistTracks.items, ...second.items];
        count++;
      } while (second.length == 100);
    }
    this.tracks = [
      ...playlistTracks.items
        .map(item => item.track)
        .filter(track => !track.is_local)
    ];
  }
};
</script>

<style></style>
