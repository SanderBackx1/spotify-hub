<template>
  <div class="wrapper">
    <ChatMessage v-for="item in chat" :key="item.id" :item="item" />
    <ChatInput />
  </div>
</template>

<script>
import { rt } from "@/plugins/firebase";

export default {
  data() {
    return {
      chat: {}
    };
  },
  created() {
    const chat = rt.ref(`room/${this.$route.params.id}/chat`);
    chat.on("value", snapshot => {
      const data = snapshot.val();
      const chat = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      this.chat = chat;
    });
  }
};
</script>

<style></style>
