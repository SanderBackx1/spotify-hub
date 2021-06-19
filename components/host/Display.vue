<template>
  <div class="wrapper flex justify-center items-center relative">
    <div class="main-wrapper w-full mr-80">
      <div class="top-wrapper bg-green mt-8">
        <div class="title-wrapper flex justify-center items-center">
          <h3 class="text-4xl font-bold text-white">{{ name }}</h3>
        </div>
      </div>
      <div
        class="main-section flex xl:justify-between lg:justify-center items-center my-8 mx-16 flex-wrap"
      >
        <div class="queue xl:w-1/4 lg:w-3/4">
          <HostQueueCard />
        </div>
        <div class="playlistsongs bg-red-400 xl:w-2/4 lg:w-3/4">
          <HostPlaylistCard />
        </div>
        <div class="playlists bg-gray-400 xl:w-1/4 lg:w-3/4">
          playlists
        </div>
      </div>
    </div>
    <div class="chat-wrapper absolute h-screen right-0 top-0 xl:w-80 lg:w-80">
      <div class="chat h-full w-full  bg-blue-200">CHAT</div>
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
