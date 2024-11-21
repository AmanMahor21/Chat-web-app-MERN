import React, { useContext, useEffect } from "react";
import Conversation from "./Conversation";
import useStore from "../../store/store";
import useUsersList from "../../hooks/usersList";
import useGetAllUnseenCount from "../../hooks/useGetAllUnseenCount";
import useExtractDate from "../../utils/extractDate";
import { authContext } from "../../context/UserRegister";

const UsersList = () => {
  const allUser = useUsersList();
  const { selected, setIsSelected, isSelected } = useStore();
  const { socketIo, saveUser } = useContext(authContext);
  useGetAllUnseenCount();
  useExtractDate();
  console.log(allUser);
  const getSelectedUser = JSON.parse(sessionStorage.getItem("selectedUser"));
  // console.log(getSelectedUser);
  useEffect(() => {
    const initialSelectedUser = getSelectedUser ? null : getSelectedUser;
    socketIo.emit("selectedUser", {
      sender: saveUser?._id,
      openUser: selected?._id,
      // selectedUser: getSelectedUser ? getSelectedUser : selected?._id,
      selectedUser: initialSelectedUser,
    });
    socketIo.on("sendUser", (data) => {
      setIsSelected(data);
    });

    return () => {
      socketIo.off("sendUser");
      // setOpenUser(null);
    };
  }, []);
  // }, [selected?._id, getSelectedUser]);

  return (
    <>
      {allUser?.length >= 1 &&
        allUser?.map((user, ind) => {
          // const isOnline =
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
