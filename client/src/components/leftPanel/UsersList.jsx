// import React, { useContext } from "react";
import Conversation from "./Conversation";
// import useStore from "../../store/store";
import useUsersList from "../../hooks/usersList";
import useGetAllUnseenCount from "../../hooks/useGetAllUnseenCount";
import useExtractDate from "../../utils/extractDate";
import { authContext } from "../../context/UserRegister";
import { useContext } from "react";

const UsersList = () => {
  const allUser = useUsersList();
  useGetAllUnseenCount();

  const {socketIo} = useContext(authContext)
  // useExtractDate();
  // console.log(allUser);
  // const getSelectedUser = JSON.parse(sessionStorage.getItem("selectedUser"));
  // console.log(getSelectedUser);
  // useEffect(() => {
  //   const initialSelectedUser = getSelectedUser ? null : getSelectedUser;
    // socketIo.emit("selectedUser", {
    //   sender: saveUser?._id,
    //   openUser: selected?._id,
    //   // selectedUser: getSelectedUser ? getSelectedUser : selected?._id,
    //   selectedUser: initialSelectedUser,
    // });
  //   socketIo.on("sendUser", (data) => {
  //     setIsSelected(data);
  //   });

  //   return () => {
  //     socketIo.off("sendUser");
  //     // setOpenUser(null);
  //   };
  // }, []);
  // }, [selected?._id, getSelectedUser]);

  return (
    <>
      {allUser?.length >= 1 &&
        allUser?.map((user, ind) => {
          return (
            <Conversation
              user={user}
              idx={ind === allUser.length - 1}
              ind={ind}
            />
          );
        })}
    </>
  );
};

export default UsersList;
