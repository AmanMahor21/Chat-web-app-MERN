import { useEffect } from "react";
import { toast } from "react-toastify";
import useStore from "../store/store";

const useUsersList = () => {
  // const [allUsers, setAllUsers] = useState(null);
  const { setAllUser, allUser, setAllLast_MsgDay } = useStore();
  // console.log(allUser, "allUser");

  useEffect(() => {
    const chatUser = async () => {
      try {
        console.log(
          "Backend URL 5665 56 65:",
          process.env.REACT_APP_BACKEND_URL
        );

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
        // console.log(res);
        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error);
        }
        // console.log(data, "i m from api userlist");
        // setAllUsers(data);
        setAllUser(data);
      } catch (error) {
        // console.log(error);
        toast.error(error.message || "Failed to get users", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }
    };
    chatUser();
  }, [setAllLast_MsgDay, setAllUser]);
  // }, [setChat,setAllLast_MsgDay]);
  return allUser;
};

export default useUsersList;
