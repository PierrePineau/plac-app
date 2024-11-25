import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "user",
  storage: storage, // localStorage
  whitelist: [
    "user",
    "registration",
    "renewPassword",
    "retrieveLogin",
    "authFlowPages"
  ]
};

const rootReducer = combineReducers({});

export const placStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(placStore);

export type EpsStoreState = ReturnType<typeof placStore.getState>;
export type AppDispatch = typeof placStore.dispatch;
