<template>
  <div class="card bg-blackLight text-white w-128 rounded-lg shadow-lg">
    <div class="card-content-wrapper py-4 px-8">
      <div class="card-title flex justify-between items-center mb-4">
        <h1 class="title text-white font-bold text-2xl ">
          {{ room.name }}
        </h1>
        <div class="right flex justify-between items-center">
          <div class="host mr-5">
            <p class="font-light text-md">{{ room.host }}</p>
          </div>
        </div>
      </div>
      <div class="card-info flex justify-start">
        <img
          :src="room.now_playing_img"
          class="w-1/3  shadow-lg rounded-2xl"
          alt=""
        />
        <div class="card-info-content px-8 w-2/3 flex justify-between flex-col">
          <div class="card-text flex justify-between">
            <div class="host-playing-wrapper">
              <div class="playing">
                <p class="font-medium  text-md">Now playing</p>
                <p class="font-light text-md">{{ room.now_playing }}</p>
              </div>
            </div>
          </div>
          <div
            class="tags-wrapper truncate flex justify-start items-center flex-wrap"
          >
            <div
              class="tag bg-gray-300 shadow-lg  truncate text-blackLight m-2 p-1 rounded-2xl w-auto inline-block"
              v-for="tag in Object.values(room.tags)"
              :key="tag"
            >
              <span class="text-sm p-2">{{ tag }}</span>
            </div>
          </div>
          <div class="button-wrapper flex justify-center items-center ">
            <a
              class="button flex justify-center items-center bg-green w-2/4 rounded-lg shadow-lg"
            >
              Join
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["room"]
};
</script>

<style></style>
