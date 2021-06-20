<template>
  <div class="input-wrapper">
    <button @click="writeMessage">Send</button>
    <input type="text" v-model="msg" />
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
          from: this.$store.getters.getUser().id,
          sentAt: Date.now()
        });

      this.msg = "";
    }
  }
};
</script>

<style></style>
