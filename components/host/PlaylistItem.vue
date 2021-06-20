<template>
  <div
    class="py-4 cursor-pointer w-full flex justify-start items-center py-2 "
    :class="playlist.uri == selectedPlaylist ? 'bg-blackLight' : ''"
    @click="() => selectPlaylist(playlist.uri)"
  >
    <img class="rounded-lg mr-4 w-10 h-10" :src="getImage(playlist)" alt="" />
    <p>{{ playlist.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  computed: {
    selectedPlaylist() {
      return this.$store.getters.getSelectedPlaylist();
    }
  },
  methods: {
    getImage(playlist) {
      const length = playlist.images.length;
      const image = playlist.images[length - 1];
      if (image) {
        return image.url;
      }
      return "";
    },
    selectPlaylist(uri) {
      this.$store.dispatch("setSelectedPlaylist", uri);
    }
  }
};
</script>

<style></style>
