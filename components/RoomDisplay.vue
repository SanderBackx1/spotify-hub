<template>
  <div>
    <h3 class="text-5xl text-white font-bold mb-8 ">{{ title }}</h3>
    <div>
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rooms: Array
  }
};
</script>

<style></style>
