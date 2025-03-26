import { useContext, useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { authContext } from "../context/UserRegister";
import {api} from "../utils/axiosInstance"; // Import Axios instance

const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const number = /\d/;
const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

const registerValidation = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be more than 3 letters")
    .required("Username is required"),
  email: yup.string().email("Email must be valid").required("Email is required"),
  password: yup
    .string()
    .matches(upperCase, "Must contain at least one uppercase letter")
    .matches(lowerCase, "Must contain at least one lowercase letter")
    .matches(number, "Must contain at least one digit")
    .matches(specialCharacter, "Must contain at least one special character")
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  gender: yup.string().required("Gender is required"),
});

const useSignup = () => {
  const { setSaveUser } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const signupApi = async (values) => {
    setLoading(true);
    toast.loading("Submitting...", {
      autoClose: 2000,
      position: "top-right",
      theme: "colored",
    });

    try {
      const response = await api.post("/auth/register", values); // Using Axios instance

      localStorage.setItem("userData", JSON.stringify(response.data.user));
      setSaveUser(response.data.user);

      // Set session expiry (15 days)
      const expiresIn = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
      localStorage.setItem("sessionExpiry", new Date().getTime() + expiresIn);

      toast.dismiss();
      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Registration Failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signupApi };
};

export { registerValidation, useSignup };

// import { useContext, useState } from "react";
// import * as yup from "yup";
// import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";
// import { authContext } from "../context/UserRegister";

// const upperCase = /[A-Z]/;
// const lowerCase = /[a-z]/;
// const number = /\d/;
// const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
// // const specialCharacter = /^[,.<>/?'";:{}|_+()*&^%$#@!-]+$/;
// const registerValidation = yup.object().shape({
//   username: yup
//     .string()
//     .min(3, "Username must be more than 3 letters")
//     .required("Username is required"),
//   email: yup
//     .string()
//     .email("Email must be vaild")
//     // .matches(/^[^\s@]+@[^\s@,:"'{}]+\.[a-zA-Z0-9]+$/, "Email must be vaild")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .matches(upperCase, "Must Contain at least one uppercase letter")
//     .matches(lowerCase, "Must Contain at least one lowercase letter")
//     .matches(number, "Must Contain at least one digit")
//     .matches(
//       specialCharacter,
//       "Must Contain at least one special character letter"
//     )
//     .min(8, "Password must be at least 8 characters long")
//     .required("Password is required"),

//   gender: yup.string().required("Gender is required"),
// });

// const useSignup = () => {
//   const { setSaveUser } = useContext(authContext);

//   // const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const signupApi = async (values) => {
//     setLoading(true);
//     toast.loading("Submitting...", {
//       autoClose: 2000,
//       position: "top-right",
//       theme: "colored",
//     });
//     try {
//       const signupResponse = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
//         // `http://localhost:5121/auth/register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ ...values }),
//           credentials: "include",
//         }
//       );

//       if (!signupResponse.ok) {
//         const signupError = await signupResponse.json();
//         throw new Error(signupError.message);
//       }
//       const data = await signupResponse.json();
//       // console.log(data, "login data ");
//       localStorage.setItem("userData", JSON.stringify(data.user));
//       setSaveUser(data.user);
//       const expiresIn = 15 * 24 * 60 * 60; // 15 days in seconds

//       // Calculate the expiration time in milliseconds
//       const expirationTime = new Date().getTime() + expiresIn * 1000;
//       localStorage.setItem("sessionExpiry", expirationTime);
//       toast.dismiss();
//       toast.success("Registration Successful", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//       setTimeout(() => {
//         // navigate("/login");
//       }, 2000);

//       // console.log(data, "I m from backend signup data");
//     } catch (error) {
//       console.log("Registration error", error);
//       toast.dismiss();
//       toast.error(error.message || "Registration Failed", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return { loading, signupApi };
// };

// export { registerValidation, useSignup };
