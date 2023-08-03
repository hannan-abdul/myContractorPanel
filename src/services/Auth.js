import axios from "axios";
import { baseUrl } from "../utils/urls";

export const postLogin = (mobile, password) => {
  const data = {
    mobile,
    password,
  };
  // debugger;
  console.log(data);
  return axios.post(`${baseUrl}user/login/admin`, data);
};
