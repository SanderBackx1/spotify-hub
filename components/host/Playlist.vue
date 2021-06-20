<template>
  <div
    class="card-content overflow-scroll overflow-x-hidden max-h-128 divide-y divide-blackLight"
  >
    <div v-if="tracks && !$fetchState.pending">
      <HostPlaylistItem
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
    const playlistTracks = await spotify.getPlaylistTracks(id);
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
