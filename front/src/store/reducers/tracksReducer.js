import {
  ADD_TRACK_FAILURE,
  GET_ALBUM_NAME_SUCCESS,
  GET_ALBUM_TRACKS_FAILURE,
  GET_ALBUM_TRACKS_SUCCESS, GET_TRACK_HISTORY_FAILURE, GET_TRACK_HISTORY_SUCCESS
} from "../actions/trackActions";

const initialState = {
  albumName: '',
  tracks: [],
  error: '',
  trackHistory: [],
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS_SUCCESS:
      return {...state, tracks: action.tracks};
    case GET_ALBUM_TRACKS_FAILURE:
      return {...state, error: action.error};
    case GET_ALBUM_NAME_SUCCESS:
      return {...state, albumName: action.name};
    case ADD_TRACK_FAILURE:
      return {...state, error: action.error};
    case GET_TRACK_HISTORY_SUCCESS:
      return {...state, trackHistory: action.trackHistory};
    case GET_TRACK_HISTORY_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default tracksReducer;
