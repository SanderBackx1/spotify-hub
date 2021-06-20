<template>
  <div
    class="card-content overflow-scroll overflow-x-hidden max-h-128 divide-y divide-blackLight"
  >
    <div v-if="tracks && !$fetchState.pending">
      <div
        class="song w-full flex justify-start items-center py-2 "
        :class="
          track && playbackState.item && track.uri == playbackState.item.uri
            ? 'bg-blackLight'
            : ''
        "
        v-for="track in tracks"
        :key="track.id"
      >
        <img class="rounded-lg mr-4" :src="track.album.images[2].url" alt="" />
        <div class="artist-title">
          <p class="mr-4 text-sm font-thin">
            {{ track.artists.map(artist => artist.name).join(", ") }}
          </p>
          <p class="mr-4 text-mg">{{ track.name }}</p>
        </div>
        <div class="buttons ml-auto flex justify-center items-center">
          <button
            class="bg-green mr-2 px-2  rounded-full shadow-2xl"
            @click="
              () => {
                play(track.uri);
              }
            "
          >
            >
          </button>
          <button class="bg-green px-2  rounded-full shadow-2xl">
            Q
          </button>
        </div>
      </div>
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
