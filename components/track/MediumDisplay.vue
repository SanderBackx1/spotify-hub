<template>
  <div class="">
    <div class="wrapper" v-if="playbackState.item">
      <div class="track-display w-full h-36 flex flex-row items-center ">
        <div class="image h-36 w-36 ">
          <img
            class="  rounded-lg shadow-2xl"
            :src="playbackState.item.album.images[1].url"
            alt=""
          />
        </div>
        <div
          class="track h-full  ml-4 flex flex-col justify-evenly items-center text-white"
        >
          <div class="artist-title h-36">
            <h3 class="text-xl font-thin w-36 h-1/2 overflow-ellipsis ">
              {{
                truncate(
                  playbackState.item.artists
                    .map(artist => artist.name)
                    .join(", ")
                )
              }}
            </h3>
            <h3 class="text-xl mt-4 font-bold overflow-ellipsis w-36 h-1/2">
              {{ truncate(playbackState.item.name) }}
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
  computed: {
    playbackState() {
      return this.$store.getters.getCurrentPlayback();
    }
  },
  methods: {
    truncate(str) {
      if (str.length > 25) {
        return str.substr(0, 25) + "...";
      }
      return str;
    }
  }
};
</script>

<style></style>
