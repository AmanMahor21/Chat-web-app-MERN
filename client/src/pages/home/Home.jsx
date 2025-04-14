import React from "react";
import Sidebar from "../../components/leftPanel/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { toast } from "react-toastify";

const Home = () => {
  toast.dismiss();
  return (
    // <div className="d-flex">
    <>
      <Sidebar />
      <MessageContainer />
    </>
    // </div>
  );
};

export default Home;
