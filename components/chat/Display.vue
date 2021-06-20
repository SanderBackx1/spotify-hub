<template>
  <div class="wrapper h-full flex flex-col bg-blackLight text-white">
    <div class="top-wrapper h-20 flex items-center justify-center">
      <h3>Chatroom</h3>
    </div>
    <div class="messages-wrapper p-4">
      <ChatMessage v-for="item in chat" :key="item.id" :item="item" />
    </div>
    <div class="mt-auto">
      <ChatInput />
    </div>
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
