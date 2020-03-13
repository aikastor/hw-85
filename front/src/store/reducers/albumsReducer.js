import {
  GET_ARTIST_ALBUMS_FAILURE,
  GET_ARTIST_ALBUMS_SUCCESS,
  GET_ARTIST_NAME_FAILURE,
  GET_ARTIST_NAME_SUCCESS
} from "../actions/albumActions";

const initialState = {
  artist: '',
  albums: [],
  error: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_NAME_SUCCESS:
      return {...state, artist: action.artist};
    case GET_ARTIST_ALBUMS_SUCCESS:
      return {...state, albums: action.albums};
    case GET_ARTIST_NAME_FAILURE:
      return {...state, error: action.error};
    case GET_ARTIST_ALBUMS_FAILURE:
      return {...state, error: action.error};
    default:
      return state
  }
};

export default albumsReducer;