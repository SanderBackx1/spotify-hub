import { spotify, refreshToken } from "../plugins/spotify";
import { db } from "../plugins/firebase";

export const state = () => ({
  user: {},
  window: typeof window,
  token: process.server ? "" : localStorage.getItem("userDetails") || "",
  refresh_token: "",
  openRooms: [],
  invitedRooms: []
});
export const getters = {
  getUser: state => _ => {
    return state.user;
  },
  getToken: state => _ => {
    return state.token;
  },

  getOpenRooms: state => _ => {
    return state.openRooms;
  },
  getInvitedRooms: state => _ => {
    return state.invitedRooms;
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
    console.log("showing user");
    return user;
  },
  roomsInit: async ({ commit, state }) => {
    const collectionRef = db.collection("rooms");

    if (state.user && state.user.id) {
      const invited = [];
      const invitedSnapshot = await collectionRef
        .where(`invites.${state.user.id}`, ">=", "")
        .get();
      invitedSnapshot.forEach(doc => {
        const room = {
          id: doc.id,
          ...doc.data()
        };
        invited.push(room);
      });
      commit("SET_INVITED_ROOMS", invited);
    }

    const querySnapshot = await collectionRef
      .where("type", "==", "open")
      .orderBy("heat")
      .get();

    const rooms = [];
    querySnapshot.forEach(doc => {
      const room = {
        id: doc.id,
        ...doc.data()
      };
      rooms.push(room);
    });

    commit("SET_OPEN_ROOMS", rooms);
    return rooms;
  },
  initStartup: async ({ dispatch }, context) => {
    dispatch("userInit", context).finally(_ => {
      dispatch("roomsInit");
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
  },
  SET_OPEN_ROOMS: (state, rooms) => {
    state.openRooms = rooms;
  },
  SET_INVITED_ROOMS: (state, rooms) => {
    state.invitedRooms = rooms;
  }
};
