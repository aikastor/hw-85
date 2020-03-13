import {GET_ALBUM_NAME_SUCCESS, GET_ALBUM_TRACKS_FAILURE, GET_ALBUM_TRACKS_SUCCESS} from "../actions/trackActions";

const initialState = {
  albumName: '',
  tracks: [],
  error: ''
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS_SUCCESS:
      return {...state, tracks: action.tracks};
    case GET_ALBUM_TRACKS_FAILURE:
      return {...state, error: action.error};
    case GET_ALBUM_NAME_SUCCESS:
      return {...state,albumName: action.name};
    default:
      return state;
  }
};

export default tracksReducer;