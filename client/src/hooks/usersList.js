import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore from "../store/store";
import extractDate from "../utils/extractDate";
import { authContext } from "../context/UserRegister";

const useUsersList = () => {
  // const [allUsers, setAllUsers] = useState(null);
  const { setAllUser, allUser, chat, setAllLast_MsgDa } = useStore();
  const { formateDate, setLoader } = useContext(authContext);
  // console.log(allUser, "allUser");
  const [rawUser, setRarUser] = useState([]);
  useEffect(() => {
    // console.log("asd");
    const chatUser = async () => {
      // setLoader(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`,
          {
            // const res = await fetch(`http://localhost:5121/api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error);
        }
        setRarUser(data);
        const updatedData = extractDate(data);

        if (updatedData) {
          setAllUser(updatedData);
        }
      } catch (error) {
        toast.error(error.message || "Failed to get users", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      } finally {
        // setLoader(true);
        // setLoader(false);
      }
    };
    chatUser();
  }, [chat?.length, formateDate]);
  // }, [setAllLast_MsgDay]);
  // }, [setChat,setAllLast_MsgDay]);
  return allUser;
};

export default useUsersList;
