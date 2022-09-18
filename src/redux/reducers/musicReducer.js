import {
  ADD_ARTIST,
  ADD_PLAYER,
  RESET_ARTIST,
  SET_ALBUM_SECTION,
  SET_ARTIST_SECTION,
  SET_TRACKS,
  SET_TRACKS2,
} from "../actions/actions";

const initialState = {
  content: [],
  musicPlayer: {},
  artist: [],
  album: [],
  tracks: [],
  tracks2: [],
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTIST:
      return {
        ...state,
        content: [action.payload],
      };
    case RESET_ARTIST:
      return {
        ...state,
        content: [],
      };
    case ADD_PLAYER:
      return {
        ...state,
        musicPlayer: action.payload,
      };
    case SET_ALBUM_SECTION:
      return {
        ...state,
        album: action.payload,
      };
    case SET_ARTIST_SECTION:
      return {
        ...state,
        artist: action.payload,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: [...action.payload],
      };
    case SET_TRACKS2:
      return {
        ...state,
        tracks: [...action.payload],
      };
    default:
      return state;
  }
};

export default musicReducer;
