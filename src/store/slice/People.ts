import { createSlice } from "@reduxjs/toolkit";
import { BaseUrl, loginUrl } from "../../apis/BaseUrl";
import { getCookie } from "cookies-next";
import { initialPeopleType } from "@/store/type/PeopleType";

export const initialState: initialPeopleType = {
  isPeopleData: [],
};

/**
 * ログイン状態に関するSlice
 */
export const peopleSlice = createSlice({
  name: "People",
  initialState,
  reducers: {
    isPeopleDataReducer: (state, action) => {
      state.isPeopleData = action.payload;
    },
  },
});

export const { isPeopleDataReducer } = peopleSlice.actions;

export const peopleData = (): any => {
  return async (dispatch: any) => {
    try {
      if (getCookie("login")) {
        const { data } = await BaseUrl(loginUrl).get(`api/users/people/`, {
          params: {
            userId: getCookie("login"),
          },
        });
        dispatch(isPeopleDataReducer(data.profile));
        // dispatch(isLoginCheckReducer(true));
      } else {
        // dispatch(isLoginCheckReducer(false));
      }
    } catch (e) {
      // dispatch(isLoginCheckReducer(false));
    }
  };
};

export default peopleSlice.reducer;
