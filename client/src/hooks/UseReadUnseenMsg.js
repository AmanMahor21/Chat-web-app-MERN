import axios from "axios";
import { useCallback, useContext } from "react";
// import useStore from "../store/store";
import { authContext } from "../context/UserRegister";

const useReadUnseenMsg = () => {
  const { saveUser } = useContext(authContext);
  // const { selected, chat } = useStore();

  const tickUnreadMsg = async (user) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages/markUnreadMsg/${user?._id}`,
        // `http://localhost:5121/messages/markUnreadMsg/${user?._id}`,
        { recieverID: saveUser?._id },
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log("Failed to read unseen message:", error);
    }
  };

  return tickUnreadMsg;
};

export default useReadUnseenMsg;
