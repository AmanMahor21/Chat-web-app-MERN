import { useContext } from "react";
import { api } from "../utils/axiosInstance";
import { authContext } from "../context/UserRegister";

const useReadUnseenMsg = () => {
  const { saveUser } = useContext(authContext);

  const tickUnreadMsg = async (user) => {
    try {
      await api.post(`/messages/markUnreadMsg/${user?._id}`, {
        recieverID: saveUser?._id,
      });
    } catch (error) {
      console.error("Failed to read unseen message:", error.response?.data || error.message);
    }
  };

  return tickUnreadMsg;
};

export default useReadUnseenMsg;
