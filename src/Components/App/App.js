import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
//import Test from '../../util/Test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    let isInPlaylist = playlist.find(is => is.id === track.id); // is track already in playlistTracks?
    if (!isInPlaylist) { // if not, add track and set new state of playlistTracks
      playlist.push(track);
      this.setState({playlistTracks: playlist});
    }
  }

  removeTrack(track) { //CAN THIS METHOD BE COMBINED WITH THE ONE ABOVE?
    let playlist = this.state.playlistTracks;
    let isInPlaylist = playlist.findIndex(is => is.id === track.id); // find track index in playlistTracks
    if (isInPlaylist >= 0) { // remove track and set new state of playlistTracks
      playlist.splice(isInPlaylist, 1);
      this.setState({playlistTracks: playlist});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let playlistName = this.state.playlistName;
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push('spotify:track:'+track.id);
    });
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: [],
      playlistTracks: []
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    })
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  render() { //<Test /> {/*DEBUG*/}
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
