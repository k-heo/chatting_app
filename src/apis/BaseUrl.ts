import axios, { Axios } from "axios";

// 接続URL
let loginUrl = "http://localhost:3000/";

//api
export { loginUrl };

export const BaseUrl = (apiUrl: string): Axios => {
  return axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
      "content-type": "application/json",
    },
  });
};
