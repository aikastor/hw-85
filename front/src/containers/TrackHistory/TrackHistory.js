import React, {Component} from 'react';
import {getTrackHistory} from "../../store/actions/trackActions";
import {connect} from "react-redux";
import moment from 'moment';
import {Badge} from "reactstrap";


class TrackHistory extends Component {

  componentDidMount () {
    if(!this.props.user)
      this.props.history.push('/login');
      else
        this.props.getTrackHistory();
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevState !== this.state) {
      this.props.getTrackHistory()
    }
  }
  render() {
        // noinspection JSAnnotator
    return (
            <>
              {
                this.props.tracks.length > 0 ?
                  <ol>
                    {this.props.tracks.map(track =>
                      (
                        <li key={track._id}>
                          {track.trackInfo} - <Badge color="secondary" pill>{moment(track.datetime).format('HH:MM (MMMM Do YYYY)')}</Badge>
                        </li>
                      )
                    )
                    }
                  </ol>
                  :
                  <p>No tracks in your history!</p>
              }
            </>
        );
    }
}
const mapStateToProps = state => ({
  user: state.users.user,
  tracks: state.tracks.trackHistory,
});

export const mapDispatchToProps = dispatch => ({
  getTrackHistory: () => dispatch(getTrackHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);
