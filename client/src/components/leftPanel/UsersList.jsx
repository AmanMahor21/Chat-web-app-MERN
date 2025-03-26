// import React, { useContext } from "react";
import Conversation from "./Conversation";
// import useStore from "../../store/store";
import useUsersList from "../../hooks/usersList";
import useGetAllUnseenCount from "../../hooks/useGetAllUnseenCount";
import useExtractDate from "../../utils/extractDate";
import { authContext } from "../../context/UserRegister";
import { useContext, useEffect, useState } from "react";
import Spinner from "../loader/Spinner";

const UsersList = () => {
  const allUser = useUsersList();
  useGetAllUnseenCount();

  // if (allUser.length == 0 || !allUser) return <Spinner />;

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
