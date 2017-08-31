import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks && this.props.tracks.map(track => (
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            plusMinus={this.props.plusMinus} />
        ))}
      </div>
    );
  }
}

export default TrackList;
