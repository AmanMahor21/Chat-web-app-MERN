import { authContext } from "../context/UserRegister";
import { useContext } from "react";

const useSessionLogout = () => {
  const { setSaveUser } = useContext(authContext);

  return () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("sessionExpiry");
    setSaveUser("");
    // window.location.href = "/login";
  };
};
export default useSessionLogout;
