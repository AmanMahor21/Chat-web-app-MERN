import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import useStore from "../store/store";
import extractDate from "../utils/extractDate";
import { authContext } from "../context/UserRegister";
import { api } from "../utils/axiosInstance";

const useUsersList = () => {
  const { setAllUser, allUser, chat } = useStore();
  const { formateDate, setLoader } = useContext(authContext);
  const [rawUser, setRarUser] = useState([]);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const chatUser = async () => {
      if (isFirstMount.current) {
        setLoader(true);
      }
      try {
        const response = await api.get("/api/users");
        const data = response.data;
        setRarUser(data);

        const updatedData = extractDate(data);
        if (updatedData) {
          setAllUser(updatedData);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to get users", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      } finally {
        setLoader(false);
        isFirstMount.current = false;
      }
    };

    chatUser();
  }, [chat?.length, formateDate]);

  return allUser;
};

export default useUsersList;
