<template>
  <div>
    <h1>Login page</h1>
    <a :href="loginUrl" class="login">Log in with Spotify</a>
  </div>
</template>

<script>
import { loginUrl, setToken } from "../plugins/spotify";
export default {
  data() {
    return {
      loginUrl
    };
  }
};
</script>

<style></style>
