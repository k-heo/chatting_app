import { createSlice } from "@reduxjs/toolkit";
import { BaseUrl, loginUrl } from "../../apis/BaseUrl";
import { getCookie } from "cookies-next";
import { initialPeopleType, People } from "@/store/type/PeopleType";

export const initialState: initialPeopleType = {
  isPeopleData: [],
};

/**
 * ログイン状態に関するSlice
 */
export const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    isPeopleDataReducer: (state, action) => {
      state.isPeopleData = action.payload;
    },
  },
});

export const { isPeopleDataReducer } = chatSlice.actions;

export const chatStart = (people: People): any => {
  return async (dispatch: any) => {
    try {
      const { data } = await BaseUrl(loginUrl).get(`api/chat/add`, {
        params: {
          userId: getCookie("login"),
          people,
        },
      });
      // dispatch(isPeopleDataReducer(data.profile));
      // dispatch(isLoginCheckReducer(true));
    } catch (e) {
      // dispatch(isLoginCheckReducer(false));
    }
  };
};

export default chatSlice.reducer;
