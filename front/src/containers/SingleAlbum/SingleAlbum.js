import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Table} from "reactstrap";
import search from 'youtube-search';
import {addTrackToHistory, getAlbumName, getTracks} from "../../store/actions/trackActions";
import {getArtistName} from "../../store/actions/albumActions";
import YouTube from 'react-youtube';

class SingleAlbum extends Component {
  state = {
    trackToPlay: '',
  };
  componentDidMount() {
    this.props.getName(this.props.match.params.le);
    this.props.getAlbumName(this.props.match.params.id);
    this.props.getTracks(this.props.match.params.id)
  }

  addTrack(trackID) {
    this.props.addTrackToHistory(trackID)
  };
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  async playTrack  (trackName) {

    search(`${trackName}`, {maxResults: 1, key: 'AIzaSyBJDKnpvAOYJ0JP2fGKkW0BN0ComVrF12U'}, async (err, results) => {

      if(err)
        return console.log(err);
      else
        this.setState({trackToPlay: results});
    });
  };

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
                <td>
                  <Button color="danger" size="sm" onClick={()=>{this.playTrack(`${this.props.artist} - ${track.title}`)}}> &#9654; </Button>
                   {` ${track.title}` }
                </td>
                <td>  {track.length} </td>
                <td> <Button color="danger" size="sm" onClick={()=>{this.addTrack(track._id)}} > + </Button> </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.trackToPlay &&
        <YouTube
          videoId={this.state.trackToPlay[0].id}
          onReady={this._onReady}
        />}
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
