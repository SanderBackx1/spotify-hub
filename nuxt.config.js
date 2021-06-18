export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "src",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyAyOds1XPdBsGl1xdyK1w4hINKY1mzA7ss",
          authDomain: "spotify-hub-a326a.firebaseapp.com",
          databaseURL:
            "https://spotify-hub-a326a-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "spotify-hub-a326a",
          storageBucket: "spotify-hub-a326a.appspot.com",
          messagingSenderId: "370263179806",
          appId: "1:370263179806:web:4685b160a6d56df5fe640f",
          measurementId: "G-M96N64YW3M"
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
