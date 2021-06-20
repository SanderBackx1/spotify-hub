<template>
  <div class="w-72">
    <div class="wrapper" v-if="playbackState.item">
      <div class="track-display w-full flex flex-row items-center h-36">
        <div class="image h-full ">
          <img
            class="h-full rounded-lg shadow-2xl"
            :src="playbackState.item.album.images[1].url"
            alt=""
          />
        </div>
        <div
          class="track h-full ml-4 flex flex-col justify-evenly items-center text-white"
        >
          <div class="artist-title">
            <h3 class="text-xl font-thin">
              {{
                playbackState.item.artists.map(artist => artist.name).join(", ")
              }}
            </h3>
            <h3 class="text-xl mt-4 font-bold">
              {{ playbackState.item.name }}
            </h3>
          </div>
        </div>
      </div>
      <div class="progress-wrapper mt-4">
        <TrackProgressbar
          :state="playbackState"
          :key="playbackState.progress_ms"
        />
      </div>
    </div>
    <div class="wrapper" v-else>
      <h3>Start playing tracks</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["track"],
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    }
  }
};
</script>

<style></style>
