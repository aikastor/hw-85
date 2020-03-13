import axiosApi from '../../axiosApi';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const fetchArtistsSuccess = (artists) => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistsFailure = (error) => ({type: FETCH_ARTISTS_SUCCESS, error});

export const fetchArtists = () => {
  return async dispatch => {
    try {
      const response = await axiosApi.get('/artists');
      dispatch(fetchArtistsSuccess(response.data))
    } catch (error) {
      dispatch(fetchArtistsFailure(error))
    }
  }
};