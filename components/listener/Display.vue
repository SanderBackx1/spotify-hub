<template>
  <div class="wrapper flex justify-center items-center relative">
    <div class="main-wrapper w-full mr-80">
      <div class="top-wrapper mt-8">
        <div class="title-wrapper flex justify-center items-center">
          <h3 class="text-4xl font-bold text-white">{{ name }}</h3>
        </div>
      </div>
      <div
        class="main-section flex xl:justify-evenly lg:justify-center items-center my-8 mx-16 flex-wrap"
      >
        <ListenerCurrentTrackDisplay />
      </div>
    </div>
    <div class="chat-wrapper fixed h-screen right-0 top-0 xl:w-80 lg:w-80">
      <div class="chat h-full w-full">
        <ChatDisplay />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
};
</script>

<style></style>
