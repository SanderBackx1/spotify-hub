<template>
  <div class="message-wrapper">
    <p>
      {{ item.from }}: <span>{{ item.msg }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style></style>
