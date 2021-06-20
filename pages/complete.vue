<template>
  <h1>Welcome back</h1>
</template>

<script>
import { setToken } from "../plugins/spotify";

export default {
  created() {
    setToken(this);
    this.$router.push("/");
  }
};
</script>

<style></style>
