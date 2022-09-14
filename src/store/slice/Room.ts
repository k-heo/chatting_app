import { createSlice } from "@reduxjs/toolkit";
import { BaseUrl, loginUrl } from "../../apis/BaseUrl";
import { getCookie } from "cookies-next";
import { initialRoomType } from "@/store/type/RoomType";

export const initialState: initialRoomType = {
  isRoomData: [],
  isRoomUserNames: [],
};

/**
 * ログイン状態に関するSlice
 */
export const roomSlice = createSlice({
  name: "Room",
  initialState,
  reducers: {
    isRoomDataReducer: (state, action) => {
      state.isRoomData = action.payload;
    },
    isRoomUserNameReducer: (state, action) => {
      state.isRoomUserNames = action.payload;
    },
  },
});

export const { isRoomDataReducer, isRoomUserNameReducer } = roomSlice.actions;

export const roomData = (user_id: string, user_name: string): any => {
  return async (dispatch: any) => {
    try {
      if (user_id) {
        const { data } = await BaseUrl(loginUrl).get(`api/room`, {
          params: {
            user_id: user_id,
          },
        });
        let userNames: any = [];
        if (data) {
          data?.map((room: any, key: number) => {
            let addName: string = "";
            room.users?.map((user: any) => {
              if (user_name !== user.user.name) addName += user.user.name + ",";
            });
            userNames[key] = addName.slice(0, addName.length - 1);
          });
        }
        dispatch(isRoomDataReducer(data));
        dispatch(isRoomUserNameReducer(userNames));
      } else {
        console.log("false");
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const createRoom = async (user_id: string, other_id: string) => {
  if (user_id) {
    console.log("aja");
    const { data } = await BaseUrl(loginUrl).post(`api/room`, {
      params: {
        user_id: user_id,
        other_id: other_id,
      },
    });
    const res = data;
    if (res) {
      const { data } = await BaseUrl(loginUrl).post(`api/room/other`, {
        params: {
          room_id: res.room_id ? res.room_id : res.id,
          other_id: other_id,
        },
      });
      if (!data.room_id) {
        window.open(`/room/${data.id}`, "_blank");
      } else {
        window.open(`/room/${data.room_id}`, "_blank");
      }
    }

    return data;
  } else {
    console.log("false");
  }
};

export default roomSlice.reducer;
