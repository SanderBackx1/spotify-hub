<template>
  <h3 class="text-4xl font-bold">
    {{ name || "Playlist name" }}
  </h3>
</template>

<script>
import { spotify } from "@/plugins/spotify";
export default {
  props: ["uri"],
  data() {
    return { name: "" };
  },

  async fetch() {
    const uri = this.$props.uri;
    const parts = uri.split(":");
    const id = parts[parts.length - 1];
    const playlist = await spotify.getPlaylist(id);
    this.name = playlist.name;
  }
};
</script>

<style></style>
