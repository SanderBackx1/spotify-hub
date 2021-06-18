<template>
  <div class="container">
    <div v-if="!$fetchState.pending">
      <ul>
        <li v-for="user in users.results" :key="user.login.uuid">
          {{ user.name.first }} {{ user.name.last }}
        </li>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  async fetch() {
    const response = await fetch("https://randomuser.me/api/?results=5");
    this.users = await response.json();
  }
};
</script>

<style></style>
