import { createSlice } from "@reduxjs/toolkit";
import { BaseUrl, loginUrl } from "../../apis/BaseUrl";
import { getCookie, setCookie } from "cookies-next";
import { hash } from "bcryptjs";

const initialState = {
  isLogin: false,
  isJoinResult: false,
  isLoginData: {
    id: "",
    userId: "",
    name: "",
  },
};

interface JoinForm {
  userId: string;
  username: string;
  password: string;
}
interface LoginForm {
  userId: string;
  password: string;
}

/**
 * ログイン状態に関するSlice
 */
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    isJoinReducer: (state, action) => {
      state.isJoinResult = action.payload;
    },
    isLoginReducer: (state, action) => {
      state.isLoginData = action.payload;
    },
    isLoginCheckReducer: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isJoinReducer, isLoginReducer, isLoginCheckReducer } =
  authSlice.actions;

export const isJoin = (joinData: JoinForm): any => {
  return async (dispatch: any) => {
    try {
      const { data } = await BaseUrl(loginUrl).post(`api/users`, {
        params: { joinData },
      });
      dispatch(isJoinReducer(data.ok));
    } catch (e) {
      dispatch(isJoinReducer(false));
    }
  };
};
export const isLoginCheck = (loginData: LoginForm): any => {
  return async (dispatch: any) => {
    try {
      const { data } = await BaseUrl(loginUrl).post(`api/users/login`, {
        params: { loginData },
      });
      if (data.ok) {
        setCookie("login", loginData.userId);
        setCookie("user", data.loginData.id);
        dispatch(isLoginReducer(data.loginData));
        dispatch(isLoginCheckReducer(data.ok));
      } else {
        dispatch(isLoginCheckReducer(false));
      }
    } catch (e) {
      dispatch(isLoginCheckReducer(false));
    }
  };
};

export const loginDataCheck = (): any => {
  return async (dispatch: any) => {
    try {
      if (getCookie("login")) {
        const { data } = await BaseUrl(loginUrl).post(`api/users/info`, {
          params: {
            userId: getCookie("login"),
          },
        });
        dispatch(isLoginReducer(data.profile));
        dispatch(isLoginCheckReducer(true));
      } else {
        dispatch(isLoginCheckReducer(false));
      }
    } catch (e) {
      dispatch(isLoginCheckReducer(false));
    }
  };
};

export default authSlice.reducer;
