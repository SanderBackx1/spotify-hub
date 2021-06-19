<template>
  <div class="wrapper">
    <div v-if="!$fetchState.pending">
      <div v-if="user.id === room.host">
        IM HOST :)
      </div>
      <div v-else>
        not host :(
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";

export default {
  layout: "wide",

  data() {
    return {
      room: undefined
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser();
    }
  },
  async fetch() {
    const doc = await db
      .collection("rooms")
      .doc(this.$route.params.id)
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
