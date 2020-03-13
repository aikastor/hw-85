import React, {Component} from 'react';

import {connect} from "react-redux";
import {getTracks} from "../../store/actions/trackActions";

class SingleAlbum extends Component {
  componentDidMount() {
    this.props.getTracks(this.props.match.params.id)
  }

  render() {
    return (
      <>
        <h4>{this.props.artist} - {this.props.albums.find(x=>x._id === this.props.match.params.id).title}
        </h4>
        <ul>
          {this.props.tracks.map(track => (
            <li key={track._id}>{track.number}. {track.title} - {track.length}</li>
          ))}
        </ul>
      </>
    );
  }
}
const mapStateToProps = state => ({
  albums: state.albums.albums,
  artist: state.albums.artist,
  tracks: state.tracks.tracks
});

const mapDispatchToProps = dispatch => ({
  getTracks : (albumID) => dispatch(getTracks(albumID)),

});
export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum);