<template>
  <div class="wrapper">
    <div class="track" v-if="playbackState.item">
      <div class="track-wrapper flex flex-col justify-center items-center">
        <div class="image">
          <img
            class="  rounded-lg shadow-2xl xl:w-96"
            :src="playbackState.item.album.images[0].url"
            alt=""
          />
        </div>
        <div class="track-info xl:w-96">
          <div class="progress-wrapper w-full ">
            <TrackProgressbar
              :state="playbackState"
              :key="playbackState.progress_ms"
            />
          </div>
          <div class="artist text-2xl text-white">
            <p>
              {{
                playbackState.item.artists.map(artist => artist.name).join(", ")
              }}
            </p>
          </div>
          <div class="title text-2xl text-white font-bold">
            {{ playbackState.item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="notrack" v-else>
      :(
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
