<template>
  <div class="container ">
    <div class="top-wrapper flex justify-start items-center flex-wrap">
      <RoomDisplay
        :title="`You're invited to..`"
        :rooms="invitedRooms"
        class="py-8 xl:w-1/2 lg:w-screen"
      />
      <div class="py-8 wrapper xl:w-1/2 lg:w-screen">
        <CreateNewDisplay v-if="!hasRoom" />
      </div>
    </div>
    <RoomDisplay :title="`Open rooms`" :rooms="openRooms" class="py-8" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
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
    },
    hasRoom() {
      return this.$store.getters.hasMyRoom();
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
