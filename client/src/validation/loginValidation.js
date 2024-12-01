import { useContext } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../context/UserRegister";

const loginValidation = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

// const useLogin = () =>{
const useLoginData = () => {
  const { setSaveUser } = useContext(authContext);

  const loginData = async (values) => {
    console.log(values);
    toast.loading("please Wait", {
      autoClose: 2000,
      position: "top-right",
      theme: "colored",
    });
    try {
      const response = await fetch(
        // `https://chatbackend-ij9m.onrender.com/auth/login`,
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          // const response = await fetch(`http://localhost:5121/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
          credentials: "include", // Important for sending cookies
        }
      );

      // console.log(response);
      const data = await response.json();
      // console.log(data);

      if (!response.ok || data.error) {
        throw new Error(data.error);
      }
      // console.log(data);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setSaveUser(data.user);

      toast.dismiss();
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Login Failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      console.log(error);
    }
  };
  return loginData;
};
// }

export { loginValidation, useLoginData };
