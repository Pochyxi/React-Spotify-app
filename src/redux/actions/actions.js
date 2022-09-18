export const ADD_ARTIST = "ADD_ARTIST";
export const RESET_ARTIST = "RESET_ARTIST";
export const ADD_PLAYER = "ADD_PLAYER";
export const SET_ARTIST_SECTION = "SET_ARTIST_SECTION";
export const SET_ALBUM_SECTION = "SET_ALBUM_SECTION";
export const SET_TRACKS = "SET_TRACKS";
export const SET_TRACKS2 = "SET_TRACKS2";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const REMOVE_FAVORITES = "REMOVE_FAVORITES";

export const addArtist = (data) => {
  return {
    type: ADD_ARTIST,
    payload: data,
  };
};

export const resetArtist = () => {
  return {
    type: RESET_ARTIST,
  };
};

export const addPlayer = (data) => {
  return {
    type: ADD_PLAYER,
    payload: data,
  };
};
export const setArtistSection = (data) => {
  return {
    type: SET_ARTIST_SECTION,
    payload: data,
  };
};
export const setAlbumSection = (data) => {
  return {
    type: SET_ALBUM_SECTION,
    payload: data,
  };
};
export const setTracks = (data) => {
  return {
    type: SET_TRACKS,
    payload: data,
  };
};
export const setTracks2 = (data) => {
  return {
    type: SET_TRACKS2,
    payload: data,
  };
};
export const addFavourites = (data) => {
  return {
    type: ADD_FAVORITES,
    payload: data,
  };
};
export const removeFavourites = (data) => {
  return {
    type: REMOVE_FAVORITES,
    payload: data,
  };
};
