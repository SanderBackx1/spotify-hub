<template>
  <div>
    <h3 class="text-5xl text-white font-bold mb-8 ">Your room</h3>
    <div v-if="!$fetchState.pending">
      <RoomCard :room="room" />
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  props: {
    title: String
  },
  data() {
    return {
      room: undefined
    };
  },
  computed: {
    roomId() {
      return this.$store.getters.getMyRoomId();
    }
  },
  async fetch() {
    console.log("getmyroom");
    console.log(this.roomId);
    const doc = await db
      .collection("rooms")
      .doc(this.roomId)
      .get();
    if (doc.exists) {
      const room = {
        id: doc.id,
        ...doc.data()
      };
      this.room = room;
    } else {
      this.room = undefined;
    }
  }
};
</script>

<style></style>
