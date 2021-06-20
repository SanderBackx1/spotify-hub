<template>
  <div class="card-content overflow-scroll overflow-x-hidden h-96 ">
    <div
      v-if="tracks && !$fetchState.pending"
      class="divide-y divide-blackLight"
    >
      <HostTrackListItem
        class="song w-full flex justify-start items-center py-2 "
        :class="
          track && playbackState.item && track.uri == playbackState.item.uri
            ? 'bg-blackLight'
            : ''
        "
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
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    }
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
  },
  methods: {
    play(uri) {
      spotify.play({
        uris: [uri]
      });
    }
  }
};
</script>

<style></style>
