import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLogout } from "../../validation/logoutValidation";
import useStore from "../../store/store";
import Swal from "sweetalert2";
import { ImCancelCircle } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { authContext } from "../../context/UserRegister";

const Conversation = () => {
  const {
    selected,
    setSearchText,
    searchText,
    setMoveChat,
    searchedMsg,
    moveChat,
    chat,
  } = useStore();
  const { onlineUser } = useContext(authContext);
  const logouthandle = useLogout();
  // console.log(onlineUser, "onlineUser onlineUser");
  // console.log(selected, " 454 65 4654 5 465 4");
  const isActive = onlineUser?.includes(selected?._id);
  // console.log(isActive, " i m active");
  const handleClick = () => {
    Swal.fire({
      title: "Search chat history",
      input: "text",
      inputPlaceholder: "Enter previous chat",
      showCancelButton: true,
      confirmButtonText: "Search",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setSearchText(result.value);
      }
    });
  };

  const upArrow = () => {
    setMoveChat(moveChat > 0 ? moveChat - 1 : moveChat);
  };
  const downArrow = () => {
    setMoveChat(moveChat < searchedMsg.length - 1 ? moveChat + 1 : moveChat);
  };

  return (
    <div className="d-flex pt-2 pb-2 ps-3 mess_Header flex">
      <div className="avatar-container">
        <img src={selected?.avatar} alt="User Avatar" className="avatar" />
      </div>
      <div className=" ps-3 flex-grow-1 d-flex justify-content-between ">
        <div>
          <div className="">{selected?.username}</div>
          <div className="receiverStatus">{isActive ? "Active Now" : ""}</div>
        </div>
        <div className="messHead_Icons">
          {searchedMsg.length > 0 ? (
            <div className="">
              <IoIosArrowUp className="upArrow" onClick={upArrow} />
              <IoIosArrowDown className="downArrow" onClick={downArrow} />
            </div>
          ) : (
            // {!searchText? <div>Not found</div>:""}
            // searchText && <div>Not found</div>
            // <div>Not found</div>
            ""
          )}
          <div
            onClick={handleClick}
            className={` position-relative ${
              searchText ? "cancelWrapper" : "msgSearch_Wrap"
            }`}
          >
            {searchText ? (
              <div className="flex justify-center items-center f-full">
                <ImCancelCircle
                  className=""
                  onClick={() => {
                    setSearchText(null);
                    setMoveChat(0);
                  }}
                />
              </div>
            ) : (
              <BsSearch />
            )}
          </div>
          <div className="dropdown">
            <button
              className=""
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsThreeDotsVertical className="" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <span className="dropdown-item" onClick={logouthandle}>
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
