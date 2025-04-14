import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/UserRegister";
import useStore from "../store/store";
import {api} from "../utils/axiosInstance"; // Import Axios instance

const useLogout = () => {
  const { setSelected } = useStore();
  const { setSaveUser } = useContext(authContext);
  const navigate = useNavigate();

  const logouthandle = async () => {
    try {
      await api.post("/auth/logout"); // Using Axios instance

      // Clear user data
      localStorage.removeItem("userData");
      localStorage.removeItem("sessionExpiry");
      setSaveUser("");

      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });

      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Logout Failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      console.error("Logout Error:", error.response?.data || error.message);
    } finally {
      setSelected(null);
    }
  };

  return logouthandle;
};

export { useLogout };

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { authContext } from "../context/UserRegister";
// import useStore from "../store/store";

// const useLogout = () => {
//   const { setSelected } = useStore();
//   const { setSaveUser } = useContext(authContext);
//   const navigate = useNavigate();

//   const logouthandle = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
//         {
//           // const res = await fetch(`http://localhost:5121/auth/logout`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials:"include"
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error);
//       }
//       localStorage.removeItem("userData");
//       localStorage.removeItem("sessionExpiry");
//       setSaveUser("");
//       navigate("/login");
//     } catch (error) {
//       toast.dismiss();
//       toast.error(error.error || "Logout Failed", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "colored",
//       });
//     } finally {
//       setSelected(null);
//     }
//   };

//   return logouthandle;
// };
// export { useLogout };
