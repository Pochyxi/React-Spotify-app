import { configureStore, combineReducers } from "@reduxjs/toolkit";
import musicReducer from "../reducers/musicReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import favoritesReducer from "../reducers/favoriteReducer";

const persistConfig = {
  // 3
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
    }),
  ],
  blacklist: ["music"],
};

const mergedReducers = combineReducers({
  music: musicReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, mergedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
