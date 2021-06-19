<template>
  <div class="container ">
    <div class="top-wrapper flex justify-start items-center ">
      <RoomDisplay
        :title="`You're invited to..`"
        :rooms="invitedRooms"
        class="py-8 w-1/2"
      />
      <div class="wrapper w-1/2">
        <h1>Create wip</h1>
      </div>
    </div>
    <RoomDisplay :title="`Open rooms`" :rooms="openRooms" class="py-8" />
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
