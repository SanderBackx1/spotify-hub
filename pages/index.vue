<template>
  <div class="container ">
    <div class="top-wrapper flex justify-start items-center flex-wrap">
      <div class="py-8 wrapper xl:w-screen lg:w-screen">
        <CreateNewDisplay v-if="!hasRoom" />
        <MyRoomDisplay v-else />
      </div>
      <RoomDisplay
        :title="`You're invited to..`"
        :rooms="invitedRooms"
        class="py-8 xl:w-1/2 lg:w-screen"
      />
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
    openRooms() {
      return this.$store.getters.getOpenRooms();
    },
    invitedRooms() {
      return this.$store.getters.getInvitedRooms();
    },
    hasRoom() {
      return this.$store.getters.hasMyRoom();
    }
  }
};
</script>

<style></style>
