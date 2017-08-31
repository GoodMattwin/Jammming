import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Marshmallow World',
        artist: 'Francesca Battistelli',
        album: 'Christmas',
        id: 101,
        }, {
        name: 'Come By Me',
        artist: 'Harry Connick, Jr.',
        album: 'Come By Me',
        id: 102,
        }, {
        name: 'New World',
        artist: 'Bjork',
        album: 'Selmasongs',
        id: 103,
      }],
      playlistName: 'Matt\'s Office Party Music',
      playlistTracks: [{
        name: 'Where It\'s At',
        artist: 'Beck',
        album: 'Odelay',
        id: 104,
        }, {
        name: 'Communication',
        artist: 'The Cardigans',
        album: 'Long Gone Before Daylight',
        id: 105,
        }, {
        name: 'Hey Pretty',
        artist: 'Poe',
        album: 'Haunted',
        id: 106,
        }, {
        name: 'Straight Lines',
        artist: 'Silverchair',
        album: 'Young Modern',
        id: 107,
      }],
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

  removeTrack(track) { //FIX THIS.  IT ELIMINATES WRONG TRACK
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
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push('spotify:track:'+track.id);
    });
  }

  search(term) {
    Spotify.search(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              plusMinus='plus' />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave = {this.savePlaylist}
              plusMinus='minus' />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
