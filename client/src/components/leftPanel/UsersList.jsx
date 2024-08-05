import React from "react";
import Conversation from "./Conversation";
import useStore from "../../store/store";
import useUsersList from "../../hooks/usersList";

const UsersList = () => {
  const allUser = useUsersList();
  // const { allUser } = useStore();
  // console.log(allUser);
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
