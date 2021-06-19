<template>
  <div class="wrapper py-8">
    <div class="content flex flex-col items-center justify-center w-64">
      <div
        v-if="menuActive"
        :class="menuActive ? 'opacity-100' : 'opacity-0'"
        class="rounded-md bg-green p-2 transition w-32 divide-y divide-white"
      >
        <a
          v-for="i in 4"
          :key="i"
          href="#"
          class="text-white  
          block px-4 py-2 text-sm"
          >Setting {{ i }}</a
        >
      </div>

      <input class="volumeSlider" type="range" min="0" max="100" />

      <button
        class="bg-green w-32 px-8 py-2 rounded-full text-white text-lg font-bold cursor-pointer"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        @click="menuActive = !menuActive"
      >
        Device
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false
    };
  }
};
</script>

<style></style>
