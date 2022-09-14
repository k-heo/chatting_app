import { createSlice } from "@reduxjs/toolkit";
import { BaseUrl, loginUrl } from "../../apis/BaseUrl";
import { getCookie } from "cookies-next";
import { initialChatsType } from "@/store/type/ChatsType";

export const initialState: initialChatsType = {
  isChatsData: [],
};

/**
 * ログイン状態に関するSlice
 */
export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    isChatsDataReducer: (state, action) => {
      state.isChatsData = action.payload;
    },
  },
});

export const { isChatsDataReducer } = chatsSlice.actions;

export const chatsData = (room_id: any, user_id: any): any => {
  return async (dispatch: any) => {
    try {
      if (user_id) {
        const response = await (
          await fetch(`http://localhost:3000/api/room/${room_id}/chats`)
        ).json();
        dispatch(isChatsDataReducer(response));
      } else {
        console.log("false");
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export default chatsSlice.reducer;
