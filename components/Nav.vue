<template>
  <nav class="nav flex justify-start w-screen bg-black shadow-lg">
    <div class="user flex justify-start w-1/3">
      <img
        class="min-w-1/2 max-h-20 max-w-20"
        v-if="user.images"
        :src="user.images[0].url"
        alt=""
      />
      <h4
        class="w-1/2 text-center align-bottom flex items-center mx-8 text-white"
        v-if="user.display_name"
      >
        {{ user.display_name }}
      </h4>
    </div>
    <div
      class="text-white w-1/3  flex justify-center items-center"
      v-if="playbackState.item"
    >
      <div class="image ">
        <img
          class="rounded-lg"
          :src="playbackState.item.album.images[2].url"
          alt="ablum art"
        />
      </div>
      <div class="artist-title ml-2">
        <div class="artists">
          <p class="font-thin">
            {{
              playbackState.item.artists.map(artist => artist.name).join(", ")
            }}
          </p>
        </div>
        <div class="track">
          <p class="font-bold">
            {{ playbackState.item.name }}
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { fetchAndUpdatePlaybackState } from "@/plugins/spotify";

export default {
  computed: {
    user() {
      return this.$store.getters.getUser();
    },
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    }
  },
  data() {
    return {
      updateInterval: undefined
    };
  },
  async mounted() {
    this.$store.dispatch("initStartup", this);
    // await this.$store.dispatch("userInit", this);
    // this.$store.dispatch("roomsInit");
    if (!this.updateInterval) {
      setInterval(() => {
        this.updateInterval = fetchAndUpdatePlaybackState(this);
      }, 2000);
    }
  }
};
</script>

<style></style>
