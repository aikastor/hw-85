import React, {Component} from 'react';

import {connect} from "react-redux";
import {addTrackToHistory, getAlbumName, getTracks} from "../../store/actions/trackActions";
import {getArtistName} from "../../store/actions/albumActions";
import {Button, Table} from "reactstrap";


class SingleAlbum extends Component {
  componentDidMount() {
    this.props.getName(this.props.match.params.le);
    this.props.getAlbumName(this.props.match.params.id);
    this.props.getTracks(this.props.match.params.id)
  }

  addTrack(trackID) {
    this.props.addTrackToHistory(trackID)
  }
  render() {
    return (
      <>
        <h4>{this.props.artist} - {this.props.albumName}
        </h4>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Track name</th>
            <th>Duration</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {this.props.tracks.map(track => (
              <tr key={track._id}>
                <td> {track.number} </td>
                <td> {track.title} </td>
                <td> {track.length} </td>
                <td> <Button color="danger" size="sm" onClick={()=>this.addTrack(track._id)} > + </Button> </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </>
    );
  }
}
const mapStateToProps = state => ({
  albums: state.albums.albums,
  artist: state.albums.artist,
  tracks: state.tracks.tracks,
  albumName: state.tracks.albumName,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  getTracks : (albumID) => dispatch(getTracks(albumID)),
  getName : (artistID) => dispatch(getArtistName(artistID)),
  getAlbumName: (albumID) => dispatch(getAlbumName(albumID)),
  addTrackToHistory: (trackID) => dispatch(addTrackToHistory(trackID)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum);
