<template>
  <div class="wrapper create">
    <h1>Create page</h1>
    <div class="form bg-black text-white  rounded-lg shadow-lg">
      <div class="form-wrapper p-16">
        <div class="field-wrapper">
          <p class="info  xl:w-1/4 lg:w-2/4">Title</p>
          <div class="input-wrapper">
            <input
              class="w-full text-black p-1 rounded-md"
              type="text"
              v-model="name"
            />
          </div>
        </div>
        <div class="field-wrapper">
          <p class="info xl:w-1/4 lg:w-2/4">Type</p>
          <div class="input-wrapper">
            <div class="flex items-center ">
              <input
                id="radio_open"
                type="radio"
                name="type"
                class="hidden"
                value="open"
                v-model="type"
                checked
              />
              <label for="radio_open" class=" radio-label">
                <span class="radio-span"></span>
                Open</label
              >
            </div>

            <div class="flex items-center ">
              <input
                id="radio_invite"
                type="radio"
                name="type"
                value="invite"
                class="hidden"
                v-model="type"
              />
              <label for="radio_invite" class="radio-label">
                <span class="radio-span"></span>
                Invite only</label
              >
            </div>

            <div class="flex items-center ">
              <input
                id="radio_closed"
                type="radio"
                name="type"
                value="closed"
                class="hidden"
                v-model="type"
              />
              <label for="radio_closed" class="radio-label">
                <span class="radio-span"></span>
                Closed</label
              >
            </div>
          </div>
        </div>
        <div class="field-wrapper">
          <p class="info xl:w-1/4 lg:w-2/4">Tags</p>
          <div class="tag-wrapper">
            <div class="tag-head">
              <input
                class="w-1/4 text-black p-1 rounded-md"
                type="text"
                v-model="newTag"
              />
              <button
                @click="addTag"
                @keyup.tab="addTag"
                @keyup.enter="addTag"
                class="bg-green rounded-full ml-4 py-1 px-2"
              >
                Add
              </button>
            </div>
            <div class="tags">
              <a
                v-for="(tag, i) in tags"
                :key="i"
                class="mx-4 cursor-pointer text-blackLight  py-1 px-4 bg-gray-300 rounded-full"
                @click="() => removeTag(i)"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="create-button w-full flex-col flex justify-center items-center"
        >
          <button
            class="bg-green py-4 px-16 text-xl font-bold rounded-lg shadow-lg"
            @click="createRoom"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    {{ user }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      type: "open",
      newTag: "",
      tags: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser();
    }
  },
  methods: {
    addTag() {
      if (this.newTag?.length > 2) {
        this.tags.push(this.newTag);
        this.newTag = "";
      }
    },
    removeTag(index) {
      if (index < this.tags.length) {
        this.tags.splice(index, 1);
      }
    },
    createRoom() {
      if (!this.name?.length > 3) return;
      if (!this.tags?.length > 2) return;

      const room = {
        name: this.name,
        type: this.type,
        tags: { ...this.tags }
      };
      this.$store.dispatch("createRoom", room);
    }
  }
};
</script>

<style scoped>
.tag-wrapper {
  @apply flex justify-start items-center w-3/4 flex-wrap flex-col;
}
.tag-head {
  @apply mt-4 w-full flex items-center justify-start;
}
.tags {
  @apply w-full flex items-center justify-evenly mt-4 h-24;
}
.input-wrapper {
  @apply flex justify-between items-center w-3/4 flex-wrap;
}
.info {
  @apply text-5xl  font-medium;
}
.box {
  @apply flex justify-center items-center;
}
.field-wrapper {
  @apply flex  justify-between flex-wrap py-8;
}
.radio-label {
  @apply flex items-center cursor-pointer text-xl;
}
.radio-span {
  @apply w-8 h-8 inline-block mr-4 rounded-full border border-white flex-none;
}
input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}

input[type="radio"]:checked + label span {
  background-color: #1db954;
  box-shadow: 0px 0px 0px 2px white inset;
}

input[type="radio"]:checked + label {
  color: #1db954;
}
</style>
