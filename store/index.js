import { spotify, refreshToken } from "../plugins/spotify";
import { db, rt } from "../plugins/firebase";

export const state = () => ({
  user: {},
  window: typeof window,
  token: process.server ? "" : localStorage.getItem("userDetails") || "",
  refresh_token: "",
  openRooms: [],
  invitedRooms: [],
  myRoom: "",
  initialLoadingDone: false,
  currentPlayback: {},
  currentPlaylist: "",
  selectedPlaylist: "",
  devices: [],
  selectedDevice: undefined
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
  },
  hasMyRoom: state => _ => {
    return !!state.myRoom;
  },
  getMyRoomId: state => _ => {
    return state.myRoom;
  },
  getLoadingDone: state => _ => {
    return state.initialLoadingDone;
  },
  getCurrentPlayback: state => _ => {
    return state.currentPlayback;
  },
  getCurrentPlaylist: state => _ => {
    return state.currentPlaylist;
  },
  getSelectedPlaylist: state => _ => {
    return state.selectedPlaylist;
  },
  getDevices: state => _ => {
    return state.devices;
  },
  getSelectedDevice: state => _ => {
    return state.selectedDevice;
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
    dispatch("initStartup", context);
  },
  setRefresh: ({ commit, dispatch }, { token }) => {
    this.$cookies.set("spotify_refresh", token);
    commit("SET_REFRESH", token);
  },
  setInitialLoadingDone: ({ commit }) => {
    commit("LOADING_DONE");
  },
  retrieveAndSetUser: async ({ commit }) => {
    try {
      const user = await spotify.getMe();

      commit("SET_USER", user);
    } catch (err) {
      //Token expired
      commit("SET_TOKEN", "");
    }
  },
  userInit: async ({ commit, dispatch }, context) => {
    const refresh_token = context.$cookies.get("spotify_refresh");
    // const access_token = null;
    const access_token = context.$cookies.get("spotify_access");
    if (access_token) {
      spotify.setAccessToken(access_token);
    } else if (refresh_token) {
      const data = await refreshToken(refresh_token);
      dispatch("setToken", {
        token: data.access_token,
        context,
        expires_in: data.expires_in
      });
      spotify.setAccessToken(data.access_token);
    } else {
      dispatch("setInitialLoadingDone");
    }

    const user = await spotify.getMe();
    dispatch("setUser", user);
    const docRef = db.collection("users").doc(user.id);
    docRef.get().then(doc => {
      if (doc.exists) {
        if (doc.data().my_room) dispatch("setMyRoom", doc.data().my_room);
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
    return user;
  },
  roomsInit: async ({ commit, dispatch, state }) => {
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
    dispatch("setInitialLoadingDone");
    return rooms;
  },
  initStartup: async ({ dispatch }, context) => {
    dispatch("userInit", context).finally(_ => {
      dispatch("roomsInit");
      dispatch("fetchAndSetDevices");
    });
  },
  setMyRoom: async ({ commit, state }, roomId) => {
    db.collection("users")
      .doc(state.user.id)
      .update({
        my_room: roomId
      });
    commit("SET_MY_ROOM", roomId);
  },
  createRoom: async ({ dispatch, state }, room) => {
    const collectionRef = db.collection("rooms");
    const newRoom = {
      ...room,
      heat: 0,
      connected: 0,
      host: state.user.id,
      now_playing: "",
      now_playing_img: ""
    };
    const docRef = await collectionRef.add(newRoom);
    dispatch("setMyRoom", docRef.id);
  },
  setCurrentPlayBackState: async ({ commit, dispatch, state }, playback) => {
    if (playback.context && playback.context.uri) {
      dispatch("setCurrentPlaylist", playback.context.uri);
    }
    if (!state.selectedDevice && playback.device) {
      commit("SET_SELECTED_DEVICE", playback.device);
    }
    if (state.myRoom) {
      dispatch("updateMyRoom", playback);
    }
    commit("SET_PLAYBACKSTATE", playback);
  },
  setCurrentPlaylist: ({ commit, state }, playlist) => {
    if (playlist !== state.currentPlaylist) {
      commit("SET_CURRENT_PLAYLIST", playlist);
    }
    if (!state.selectedPlaylist) {
      commit("SET_SELECTED_PLAYLIST", playlist);
    }
  },
  setSelectedPlaylist: ({ commit, state }, playlist) => {
    if (playlist !== state.selectedPlaylist) {
      commit("SET_SELECTED_PLAYLIST", playlist);
    }
  },
  fetchAndSetDevices: async ({ commit }) => {
    const data = await spotify.getMyDevices();
    commit("SET_DEVICES", data?.devices);
  },
  selectDevice: async ({ commit }, device) => {
    spotify.transferMyPlayback([device.id]).then(_ => {
      commit("SET_SELECTED_DEVICE", device);
    });
  },
  updateMyRoom: async ({ state }, playback) => {
    rt.ref(`room/${state.myRoom}/playback`).set({
      progress_ms: playback.progress_ms,
      item: playback.item
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
  },
  SET_MY_ROOM: (state, roomId) => {
    state.myRoom = roomId;
  },
  LOADING_DONE: state => {
    state.initialLoadingDone = true;
  },
  SET_PLAYBACKSTATE: (state, playback) => {
    state.currentPlayback = playback;
  },
  SET_CURRENT_PLAYLIST: (state, playlist) => {
    state.currentPlaylist = playlist;
  },
  SET_SELECTED_PLAYLIST: (state, playlist) => {
    state.selectedPlaylist = playlist;
  },
  SET_DEVICES: (state, devices) => {
    state.devices = [...devices];
  },
  SET_SELECTED_DEVICE: (state, device) => {
    state.selectedDevice = device;
  }
};
