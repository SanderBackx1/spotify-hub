<template>
  <div>
    <h3 class="text-4xl font-bold" v-if="!$fetchState.pending">
      {{ name || "Playlist name" }}
    </h3>
    <h3 v-else>
      <Spinner :color="'white'" />
    </h3>
  </div>
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
