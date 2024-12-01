import { useEffect } from "react";
import { toast } from "react-toastify";
import useStore from "../store/store";
import extractDate from "../utils/extractDate";

const useUsersList = () => {
  // const [allUsers, setAllUsers] = useState(null);
  const { setAllUser, allUser, setAllLast_MsgDay } = useStore();
  // console.log(allUser, "allUser");

  useEffect(() => {
    // console.log("asd");
    const chatUser = async () => {
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
        console.log(data, "i m from api userlist");
        const updatedData = extractDate(data);

        if (updatedData) {
          console.log(updatedData, "mm561322222222222222222");
          setAllUser(updatedData);
        }

        // dayCreated && setAllUser(data);
        // console.log(dayCreated, "dayCreated");
        // setAllUser(data);
      } catch (error) {
        toast.error(error.message || "Failed to get users", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }
    };
    chatUser();
  }, []);
  // }, [setAllLast_MsgDay]);
  // }, [setChat,setAllLast_MsgDay]);
  return allUser;
};

export default useUsersList;
