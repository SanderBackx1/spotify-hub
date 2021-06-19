<template>
  <div class="container"></div>
</template>

<script>
import { loginUrl } from "../plugins/spotify";
export default {
  data() {
    return {
      users: [],
      loginUrl
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken();
    },
    user() {
      return this.$store.getters.getUser();
    }
  },
  async mounted() {
    this.$store.dispatch("userInit", this);
  }
};
</script>

<style></style>
