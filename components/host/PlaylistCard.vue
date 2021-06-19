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
      <div
        class="card-content overflow-scroll overflow-x-hidden max-h-128 divide-y divide-blackLight"
      >
        <div
          class="song w-full flex justify-start items-center py-2 "
          :class="
            item.track.uri == playbackState.item.uri ? 'bg-blackLight' : ''
          "
          v-for="item in tracks"
          :key="item.track.id"
        >
          <img
            class="rounded-lg mr-4"
            :src="item.track.album.images[2].url"
            alt=""
          />
          <div class="artist-title">
            <p class="mr-4 text-sm font-thin">
              {{ item.track.artists.map(artist => artist.name).join(", ") }}
            </p>
            <p class="mr-4 text-mg">{{ item.track.name }}</p>
          </div>
          <div class="buttons ml-auto flex justify-center items-center">
            <button class="bg-green mr-2 px-2  rounded-full shadow-2xl">
              >
            </button>
            <button class="bg-green px-2  rounded-full shadow-2xl">
              Q
            </button>
          </div>
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
      tracks: []
    };
  },
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    }
  },

  async fetch() {
    let state = this.playbackState;
    if (!state) {
      state = await spotify.getMyCurrentPlaybackState();
    }
    const { context } = state;
    if (context.uri) {
      const parts = context.uri.split(":");
      const id = parts[parts.length - 1];
      const playlistTracks = await spotify.getPlaylistTracks(id);
      console.log(state);
      this.tracks = [...playlistTracks.items];
    }
  }
};
</script>

<style></style>
