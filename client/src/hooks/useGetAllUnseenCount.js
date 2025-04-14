// import { useContext, useEffect } from "react";
// import { authContext } from "../context/UserRegister";
// import axios from "axios";
// import useStore from "../store/store";

// const useGetAllUnseenCount = () => {
//   const { setFormatDate, saveUser } = useContext(authContext);
//   // const {  setFormatDate } = useStore();

//   // console.log(unseenCount);
//   const getAllunseenCount = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BACKEND_URL}/messages/allUnseenCount/${saveUser._id}`,
//         // `http://localhost:5121/messages/allUnseenCount/${saveUser._id}`,
//         {
//           withCredentials: true,
//         }
//       );

//       // setUnseenCount(res.data.data);
//       setFormatDate(res.data.data);
//       // res.data.data.map((ele, ind) => {
//       //   // console.log(ele._id, ele.unreadCount);
//       //   setUnseenCount(ele._id, ele.unreadCount, ele.createdAt);
//       // });
//     } catch (error) {
//       console.error("Error fetching unseen messages count:", error);
//     }
//   };

//   useEffect(() => {
//     if (saveUser?._id) {
//       getAllunseenCount();
//     }
//   }, [saveUser?._id]);
// };

// export default useGetAllUnseenCount;

import { useContext, useEffect } from "react";
import { authContext } from "../context/UserRegister";
import { api } from "../utils/axiosInstance"; // Import the Axios instance

const useGetAllUnseenCount = () => {
  const { setFormatDate, saveUser } = useContext(authContext);

  const getAllunseenCount = async () => {
    try {
      const res = await api.get(`/messages/allUnseenCount/${saveUser._id}`);
      setFormatDate(res.data.data);
    } catch (error) {
      console.error("Error fetching unseen messages count:", error);
    }
  };

  useEffect(() => {
    if (saveUser?._id) {
      getAllunseenCount();
    }
  }, [saveUser?._id]);
};

export default useGetAllUnseenCount;
