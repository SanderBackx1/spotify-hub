<template>
  <div class="queue bg-black text-white rounded-2xl shadow-lg">
    <div class="card-content-wrapper px-8 py-4">
      <div class="card-top flex justify-between items.center">
        <div class="card-title">
          <h3 class="text-4xl font-bold">Queue</h3>
        </div>
        <div class="min-button">
          <button class="bg-blackLight rounded-full px-2">
            -
          </button>
        </div>
      </div>
      <div class="card-content divide-y divide-blackLight">
        <div
          class="song w-full flex justify-start items-center py-2 "
          v-for="i in 10"
          :key="i"
        >
          <img
            class="rounded-lg mr-4"
            src="http://placekitten.com/50/50"
            alt=""
          />
          <div class="artist-title">
            <p class="mr-4 text-sm font-thin">Lorem, ipsum.</p>
            <p class="mr-4 text-mg">Lorem, ipsum dolor.</p>
          </div>
          <div class="remove ml-auto">
            <button class="bg-red-600 px-2  rounded-full shadow-2xl">
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
