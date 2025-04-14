import React from "react";
import Searchbar from "./Searchbar";
import UsersList from "./UsersList";
import SenderDetail from "./SenderDetail";

const Sidebar = () => {
  return (
    <div className="sideBar_Wrapper">
      <SenderDetail />
      <Searchbar />
      <UsersList />
    </div>
  );
};

export default Sidebar;
