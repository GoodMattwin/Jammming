import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {
      name: 'Marshmallow World',
      artist: 'Francesca Battistelli',
      album: 'Christmas'
      }, {
      name: 'New World',
      artist: 'Bjork',
      album: 'Selmasongs'
      }, {
      name: 'Come By Me',
      artist: 'Harry Connick, Jr.',
      album: 'Come By Me'
      }
    ]};
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
