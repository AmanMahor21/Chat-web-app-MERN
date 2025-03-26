import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/UserRegister";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

const subInterceptor = (logout) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("erorrrrrrrrrrrr", error);
      if (error.response?.status === 403) {
        // ✅ Status should be a number
        logout();
      } else {
        toast.error(error.response?.data?.message || "An error occurred", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }

      return Promise.reject(error);
    }
  );
};
export { api, subInterceptor };
