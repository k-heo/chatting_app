/* eslint-disable react-hooks/rules-of-hooks */
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// ↓ 管理したいスライスをインポート
import authReducer from "./slice/Auth";
import peopleReducer from "./slice/People";
import roomReducer from "./slice/Room";
import chatsReducer from "./slice/Chats";
// ↑ 管理したいスライスをインポート

const rootReducer = combineReducers({
  Auth: authReducer,
  Room: roomReducer,
  Chats: chatsReducer,
  People: peopleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const userAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
