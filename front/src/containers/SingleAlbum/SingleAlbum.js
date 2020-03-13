import React, {Component} from 'react';

import {connect} from "react-redux";
import {getAlbumName, getTracks} from "../../store/actions/trackActions";
import {getArtistName} from "../../store/actions/albumActions";

class SingleAlbum extends Component {
  componentDidMount() {
    this.props.getName(this.props.match.params.le);
    this.props.getAlbumName(this.props.match.params.id);
    this.props.getTracks(this.props.match.params.id)
  }

  render() {
    return (
      <>
        <h4>{this.props.artist} - {this.props.albumName}
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
  tracks: state.tracks.tracks,
  albumName: state.tracks.albumName
});

const mapDispatchToProps = dispatch => ({
  getTracks : (albumID) => dispatch(getTracks(albumID)),
  getName : (artistID) => dispatch(getArtistName(artistID)),
  getAlbumName: (albumID) => dispatch(getAlbumName(albumID)),

});
export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum);