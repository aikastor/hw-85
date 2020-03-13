import axiosApi from "../../axiosApi";

export const GET_ARTIST_NAME_SUCCESS = 'GET_ARTIST_NAME_SUCCESS';
export const GET_ARTIST_NAME_FAILURE = 'GET_ARTIST_NAME_FAILURE';

export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';

export const getArtistNameSuccess = (artist) => ({type: GET_ARTIST_NAME_SUCCESS, artist});
export const getArtistNameFailure =(error) => ({type: GET_ARTIST_NAME_FAILURE, error});

export const getArtistAlbumsSuccess = (albums) => ({type :GET_ARTIST_ALBUMS_SUCCESS, albums});
export const getArtistAlbumsFailure = (error) => ({type: GET_ARTIST_ALBUMS_FAILURE, error});

export const getArtistName = (id) => {
  return async dispatch => {

    try {
      const response = await axiosApi.get(`artists/${id}`);
      dispatch(getArtistNameSuccess(response.data.name))
    } catch (error) {
      dispatch(getArtistNameFailure(error))
    }
  }
};

export const getArtistAlbums = (id) => {
  return async dispatch => {
    try {
      const response = await axiosApi.get(`/albums?artist=${id}`);
      dispatch(getArtistAlbumsSuccess(response.data))
    } catch (error) {
      dispatch(getArtistAlbumsFailure(error))
    }
  }
};