import { spotify, refreshToken } from "../plugins/spotify";
import { db } from "../plugins/firebase";

export const state = () => ({
  user: {},
  window: typeof window,
  token: process.server ? "" : localStorage.getItem("userDetails") || "",
  refresh_token: ""
});
export const getters = {
  getUser: state => _ => {
    return state.user;
  },
  getToken: state => _ => {
    return state.token;
  }
};
export const actions = {
  setUser: ({ commit }, user) => {
    commit("SET_USER", user);
  },
  setToken: ({ commit, dispatch }, { token, context, expires_in }) => {
    spotify.setAccessToken(token);
    context.$cookies.set("spotify_access", token, `${expires_in}s`);
    commit("SET_TOKEN", token);
  },
  setRefresh: ({ commit, dispatch }, { token }) => {
    this.$cookies.set("spotify_refresh", token);
    commit("SET_REFRESH", token);
  },

  retrieveAndSetUser: async ({ commit }) => {
    try {
      const user = await spotify.getMe();

      commit("SET_USER", user);
    } catch (err) {
      //Token expired
      console.log(":(");
      commit("SET_TOKEN", "");
    }
  },

  userInit: async ({ commit, dispatch }, context) => {
    const refresh_token = context.$cookies.get("spotify_refresh");
    // const access_token = null;
    const access_token = context.$cookies.get("spotify_access");

    if (access_token) {
      console.log("active access_token");
      spotify.setAccessToken(access_token);
    } else if (refresh_token) {
      const data = await refreshToken(refresh_token);
      dispatch("setToken", {
        token: data.access_token,
        context,
        expires_in: data.expires_in
      });
      spotify.setAccessToken(data.access_token);
    }
    const user = await spotify.getMe();
    dispatch("setUser", user);

    const docRef = db.collection("users").doc(user.id);
    docRef.get().then(doc => {
      if (doc.exists) {
        console.log("exists");
        // docRef.update({
        //   ...user
        // });
      } else {
        db.collection("users")
          .doc(user.id)
          .set({
            ...user
          });
      }
    });
  }
};
export const mutations = {
  SET_USER: (state, user) => {
    state.user = user;
  },

  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_REFRESH: (state, token) => {
    state.refresh_token = token;
  }
};
