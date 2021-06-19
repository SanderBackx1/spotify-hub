<template>
  <div class="container">
    {{ openRooms }}
    {{ invitedRooms }}
  </div>
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
    },
    openRooms() {
      return this.$store.getters.getOpenRooms();
    },
    invitedRooms() {
      return this.$store.getters.getInvitedRooms();
    }
  },
  async mounted() {
    this.$store.dispatch("initStartup", this);
    // await this.$store.dispatch("userInit", this);
    // this.$store.dispatch("roomsInit");
  }
};
</script>

<style></style>
