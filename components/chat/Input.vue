<template>
  <div class="input-wrapper bg-black text-white">
    <div class="content-wrapper px-4 py-8 flex items-center">
      <button
        class="bg-green rounded-full px-4 py-2 text-sm mr-4"
        @click="writeMessage"
      >
        Send
      </button>
      <input
        class="bg-blackLight rounded-lg p-2 w-48"
        type="text"
        v-model="msg"
        @keypress.enter="writeMessage"
      />
    </div>
  </div>
</template>

<script>
import { rt } from "@/plugins/firebase";

export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    writeMessage() {
      rt.ref(`room/${this.$route.params.id}/chat`)
        .push()
        .set({
          msg: this.msg,
          from: this.$store.getters.getUser().display_name,
          fromId: this.$store.getters.getUser().id,
          sentAt: Date.now()
        });

      this.msg = "";
    }
  }
};
</script>

<style></style>
