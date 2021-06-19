//https://developer.spotify.com/documentation/web-playback-sdk/quick-start
import SpotifyWebApi from "spotify-web-api-js";
export const spotify = new SpotifyWebApi();
export const authEndpoint = "https://accounts.spotify.com/authorize";
export const apiEndpoint = "https://accounts.spotify.com/api";
// const redirectUri = "https://spotifyinterface.netlify.app/";
const redirectUri = "http://localhost:3000";
const clientId = process.env.SPOTIFY_CLIENT;
const clientSecret = process.env.SPOTIFY_SECRET;
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-library-modify",
  "user-library-read"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const setToken = async context => {
  console.log(":)");
  if (typeof window === "undefined") return;
  const hash = getTokenFromUrl();
  console.log(":D");
  console.log(hash);
  const { token, user } = context.state;
  window.location.hash = "";
  const _token = hash?.code;
  const _type = hash?.token_type;
  if (_token) {
    context.dispatch("setToken", _token);
    context.dispatch("setType", _type);
  }
  spotify.setAccessToken(_token || token);
  if (_token || token) {
    const activeToken = _token || token;
    return await convertToken(activeToken);
  }
};

export const convertToken = async token => {
  const result = await fetch(apiEndpoint + "/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret)
    },
    body: `grant_type=authorization_code&code=${token}&redirect_uri=${redirectUri}`
  });
  const data = await result.json();
  return data;
};

export const refreshToken = async refresh_token => {
  console.log(refresh_token);
  try {
    const result = await fetch(apiEndpoint + "/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret)
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};