import axiosApi from "../../axiosApi";

export const GET_ALBUM_TRACKS_SUCCESS = 'GET_ARTIST_TRACKS_SUCCESS';
export const GET_ALBUM_TRACKS_FAILURE = 'GET_ALBUM_TRACKS_FAILURE';

export const getAlbumTracksSuccess = tracks => ({type: GET_ALBUM_TRACKS_SUCCESS, tracks});
export const getAlbumTracksFailure = error => ({type: GET_ALBUM_TRACKS_FAILURE, error});

export const getTracks = (albumID) => {
  return async dispatch => {
    try {
      const response = await axiosApi.get(`/tracks?album=${albumID}`);
      dispatch(getAlbumTracksSuccess(response.data))
    } catch (error) {
      dispatch(getAlbumTracksFailure(error))
    }
  }
};