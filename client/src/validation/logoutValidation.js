import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/UserRegister";
import useStore from "../store/store";

const useLogout = () => {
  const { setSelected } = useStore();
  const { setSaveUser } = useContext(authContext);
  const navigate = useNavigate();

  const logouthandle = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {
          // const res = await fetch(`http://localhost:5121/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      localStorage.removeItem("userData");
      setSaveUser("");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.error || "Logout Failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setSelected(null);
    }
  };

  return logouthandle;
};
export { useLogout };
