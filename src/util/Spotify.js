const CLIENT_ID = '2935f548805a4bf6b245c2b0a6a2d397';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken ='';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) &&
               window.location.href.match(/expires_in=([^&]*)/)) {
                 accessToken = window.location.href.match(/access_token=([^&]*)/);
                 let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
                 window.setTimeout(() => accessToken = '', expiresIn * 1000);
                 window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },

  search(term) {
    fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }}).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }
          })
        } else return [];
      });
  },
};

export default Spotify;
